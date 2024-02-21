import { Schema as NormalizrSchema } from 'normalizr';
import Schema from '../../schema/Schema';
import { Record, NormalizedData, Collection } from '../../data';
import Model from '../../model/Model';
import Query from '../../query/Query';
import Constraint from '../../query/contracts/RelationshipConstraint';
import Relation from './Relation';
export type Entity = typeof Model | string;
export default class MorphMany extends Relation {
    /**
     * The related model.
     */
    related: typeof Model;
    /**
     * The field name that contains id of the parent model.
     */
    id: string;
    /**
     * The field name that contains type of the parent model.
     */
    type: string;
    /**
     * The local key of the model.
     */
    localKey: string;
    /**
     * Create a new belongs to instance.
     */
    constructor(model: typeof Model, related: Entity, id: string, type: string, localKey: string);
    /**
     * Define the normalizr schema for the relationship.
     */
    define(schema: Schema): NormalizrSchema;
    /**
     * Attach the relational key to the given data.
     */
    attach(key: any, record: Record, data: NormalizedData): void;
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value: any, _parent: Record, _key: string): Model[];
    /**
     * Load the morph many relationship for the record.
     */
    load(query: Query, collection: Collection, name: string, constraints: Constraint[]): void;
    /**
     * Set the constraints for an eager load of the relation.
     */
    addEagerConstraintForMorphMany(query: Query, collection: Collection, type: string): void;
}
