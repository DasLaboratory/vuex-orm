import { Schema as NormalizrSchema } from 'normalizr';
import Schema from '../../schema/Schema';
import { Record, NormalizedData, Collection } from '../../data';
import Model from '../../model/Model';
import Query from '../../query/Query';
import Constraint from '../../query/contracts/RelationshipConstraint';
import Relation from './Relation';
export default class HasManyBy extends Relation {
    /**
     * The related model.
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
     * Create a new has many by instance.
     */
    constructor(model: typeof Model, parent: typeof Model | string, foreignKey: string, ownerKey: string);
    /**
     * Define the normalizr schema for the relationship.
     */
    define(schema: Schema): NormalizrSchema;
    /**
     * Attach the relational key to the given data.
     */
    attach(key: any, record: Record, _data: NormalizedData): void;
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value: any, _parent: Record, _key: string): Model[];
    /**
     * Load the has many by relationship for the collection.
     */
    load(query: Query, collection: Collection, name: string, constraints: Constraint[]): void;
    /**
     * Set the constraints for an eager load of the relation.
     */
    addConstraintForHasManyBy(query: Query, collection: Collection): void;
    /**
     * Get related records.
     */
    getRelatedRecords(relations: Map<string, Record>, keys: string[]): Record[];
}
