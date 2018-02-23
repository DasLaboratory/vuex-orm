import { Record, PlainCollection } from '../../data/Contract'
import Model from '../../model/Model'
import { Fields } from '../contracts/Contract'
import Repo, { Relation as Load } from '../../repo/Repo'
import Relation from './Relation'

export default class HasMany extends Relation {
  /**
   * The related model.
   */
  related: typeof Model

  /**
   * The foregin key of the related model.
   */
  foreignKey: string

  /**
   * The local key of the model.
   */
  localKey: string

  /**
   * The related records.
   */
  records: PlainCollection = []

  /**
   * Create a new has many instance.
   */
  constructor (model: typeof Model, related: typeof Model | string, foreignKey: string, localKey: string) {
    super(model)

    this.related = this.model.relation(related)
    this.foreignKey = foreignKey
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
   * Load the has many relationship for the record.
   */
  load (repo: Repo, record: Record, relation: Load): PlainCollection {
    const query = new Repo(repo.state, this.related.entity, false)

    query.where(this.foreignKey, record[this.localKey])

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

    if (typeof (this.records[0] as any) !== 'object') {
      return []
    }

    return this.records.map(record => new this.related(record))
  }
}
