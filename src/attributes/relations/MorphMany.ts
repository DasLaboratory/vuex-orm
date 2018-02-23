import { Record, PlainCollection } from '../../data/Contract'
import Model from '../../model/Model'
import Repo, { Relation as Load } from '../../repo/Repo'
import { Fields } from '../contracts/Contract'
import Relation from './Relation'

export type Entity = typeof Model | string

export default class MorphMany extends Relation {
  /**
   * The related model.
   */
  related: typeof Model

  /**
   * The field name that contains id of the parent model.
   */
  id: string

  /**
   * The field name fthat contains type of the parent model.
   */
  type: string

  /**
   * The local key of the model.
   */
  localKey: string

  /**
   * The related record.
   */
  records: PlainCollection = []

  /**
   * Create a new belongs to instance.
   */
  constructor (model: typeof Model, related: Entity, id: string, type: string, localKey: string) {
    super(model)

    this.related = this.model.relation(related)
    this.id = id
    this.type = type
    this.localKey = localKey
  }

  /**
   * Set given value to the value field. This method is used when
   * instantiating model to fill the attribute value.
   */
  set (value: any): void {
    this.records = value
  }

  /**
   * Return empty array if the value is not present.
   */
  fill (value: any): any {
    return value || []
  }

  /**
   * Load the morph many relationship for the record.
   */
  load (repo: Repo, record: Record, relation: Load): PlainCollection {
    const query = new Repo(repo.state, this.related.entity, false)

    query.where(this.id, record[this.localKey]).where(this.type, repo.name)

    this.addConstraint(query, relation)

    return query.get()
  }

  /**
   * Make model instances of the relation.
   */
  make (_parent: Fields, _key: string): Model[] {
    if (this.records.length === 0) {
      return []
    }

    return this.records.map(record => new this.related(record))
  }
}
