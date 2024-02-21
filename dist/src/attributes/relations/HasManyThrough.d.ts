import { Schema as NormalizrSchema } from 'normalizr';
import Schema from '../../schema/Schema';
import { Record, Records, NormalizedData, Collection } from '../../data';
import Model from '../../model/Model';
import Query from '../../query/Query';
import Constraint from '../../query/contracts/RelationshipConstraint';
import Relation from './Relation';
export type Entity = typeof Model | string;
export default class HasManyThrough extends Relation {
    /**
     * The related model.
     */
    related: typeof Model;
    /**
     * The "through" parent model.
     */
    through: typeof Model;
    /**
     * The near key on the relationship.
     */
    firstKey: string;
    /**
     * The far key on the relationship.
     */
    secondKey: string;
    /**
     * The local key on the relationship.
     */
    localKey: string;
    /**
     * The local key on the intermediary model.
     */
    secondLocalKey: string;
    /**
     * Create a new has many through instance.
     */
    constructor(model: typeof Model, related: Entity, through: Entity, firstKey: string, secondKey: string, localKey: string, secondLocalKey: string);
    /**
     * Define the normalizr schema for the relationship.
     */
    define(schema: Schema): NormalizrSchema;
    /**
     * Attach the relational key to the given data. Since has many through
     * relationship doesn't have any foreign key, it would do nothing.
     */
    attach(_key: any, _record: Record, _data: NormalizedData): void;
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value: any, _parent: Record, _key: string): Model[];
    /**
     * Load the has many through relationship for the collection.
     */
    load(query: Query, collection: Collection, name: string, constraints: Constraint[]): void;
    /**
     * Set the constraints for the through relation.
     */
    addEagerConstraintForThrough(query: Query, collection: Collection): void;
    /**
     * Set the constraints for the related relation.
     */
    addEagerConstraintForRelated(query: Query, collection: Collection): void;
    /**
     * Create a new indexed map for the through relation.
     */
    mapThroughRelations(throughs: Collection, relatedQuery: Query): Records;
}
