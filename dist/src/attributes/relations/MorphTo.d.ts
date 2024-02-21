import { Schema as NormalizrSchema } from 'normalizr';
import Schema from '../../schema/Schema';
import { Record, NormalizedData, Collection } from '../../data';
import Model from '../../model/Model';
import Query from '../../query/Query';
import Constraint from '../../query/contracts/RelationshipConstraint';
import Relation from './Relation';
export type Entity = typeof Model | string;
export default class MorphTo extends Relation {
    /**
     * The field name that contains id of the parent model.
     */
    id: string;
    /**
     * The field name that contains type of the parent model.
     */
    type: string;
    /**
     * Create a new morph to instance.
     */
    constructor(model: typeof Model, id: string, type: string);
    /**
     * Define the normalizr schema for the relationship.
     */
    define(schema: Schema): NormalizrSchema;
    /**
     * Attach the relational key to the given record. Since morph to
     * relationship doesn't have any foreign key, it would do nothing.
     */
    attach(_key: any, _record: Record, _data: NormalizedData): void;
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value: any, parent: Record, _key: string): Model | null;
    /**
     * Load the morph to relationship for the collection.
     */
    load(query: Query, collection: Collection, name: string, constraints: Constraint[]): void;
    /**
     * Get all types from the collection.
     */
    getTypes(collection: Collection): string[];
}
