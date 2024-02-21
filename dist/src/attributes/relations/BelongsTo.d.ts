import { Schema as NormalizrSchema } from 'normalizr';
import Schema from '../../schema/Schema';
import { Record, NormalizedData, Collection } from '../../data';
import Model from '../../model/Model';
import Query from '../../query/Query';
import Constraint from '../../query/contracts/RelationshipConstraint';
import Relation from './Relation';
export default class BelongsTo extends Relation {
    /**
     * The parent model.
     */
    parent: typeof Model;
    /**
     * The foreign key of the model.
     */
    foreignKey: string;
    /**
     * The associated key on the parent model.
     */
    ownerKey: string;
    /**
     * Create a new belongs to instance.
     */
    constructor(model: typeof Model, parent: typeof Model | string, foreignKey: string, ownerKey: string);
    /**
     * Define the normalizr schema for the relationship.
     */
    define(schema: Schema): NormalizrSchema;
    /**
     * Attach the relational key to the given data. For example, when Post
     * belongs to User, it will attach value to the `user_id` field of
     * Post record.
     */
    attach(key: any, record: Record, data: NormalizedData): void;
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value: any, _parent: Record, _key: string): Model | null;
    /**
     * Load the belongs to relationship for the collection.
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
