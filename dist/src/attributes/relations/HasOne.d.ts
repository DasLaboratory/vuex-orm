import { Schema as NormalizrSchema } from 'normalizr';
import Schema from '../../schema/Schema';
import { Record, NormalizedData, Collection } from '../../data';
import Model from '../../model/Model';
import Query from '../../query/Query';
import Constraint from '../../query/contracts/RelationshipConstraint';
import Relation from './Relation';
export default class HasOne extends Relation {
    /**
     * The related model.
     */
    related: typeof Model;
    /**
     * The foreign key of the related model.
     */
    foreignKey: string;
    /**
     * The local key of the model.
     */
    localKey: string;
    /**
     * Create a new has one instance.
     */
    constructor(model: typeof Model, related: typeof Model | string, foreignKey: string, localKey: string);
    /**
     * Define the normalizr schema for the relationship.
     */
    define(schema: Schema): NormalizrSchema;
    /**
     * Attach the relational key to the related data. For example,
     * when User has one Phone, it will attach value to the
     * `user_id` field of Phone record.
     */
    attach(key: any, record: Record, data: NormalizedData): void;
    /**
     * Make value to be set to model property. This method is used when
     * instantiating a model or creating a plain object from a model.
     */
    make(value: any, _parent: Record, _key: string): Model | null;
    /**
     * Load the has one relationship for the collection.
     */
    load(query: Query, collection: Collection, name: string, constraints: Constraint[]): void;
    /**
     * Set the constraints for an eager load of the relation.
     */
    private addEagerConstraints;
    /**
     * Match the eagerly loaded results to their parents.
     */
    private match;
    /**
     * Build model dictionary keyed by the relation's foreign key.
     */
    private buildDictionary;
}
