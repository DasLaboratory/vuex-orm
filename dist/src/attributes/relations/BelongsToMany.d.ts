import { Schema as NormalizrSchema } from 'normalizr';
import Schema from '../../schema/Schema';
import { Record, Records, NormalizedData, Collection } from '../../data';
import Model from '../../model/Model';
import Query from '../../query/Query';
import Constraint from '../../query/contracts/RelationshipConstraint';
import Relation from './Relation';
export type Entity = typeof Model | string;
export interface PivotRecord {
    [entity: string]: {
        [id: string]: {
            $id: string;
            [pivotKey: string]: any;
        };
    };
}
export default class BelongsToMany extends Relation {
    /**
     * The related model.
     */
    related: typeof Model;
    /**
     * The pivot model.
     */
    pivot: typeof Model;
    /**
     * The foreign key of the parent model.
     */
    foreignPivotKey: string;
    /**
     * The associated key of the relation.
     */
    relatedPivotKey: string;
    /**
     * The key name of the parent model.
     */
    parentKey: string;
    /**
     * The key name of the related model.
     */
    relatedKey: string;
    /**
     * The key name of the pivot data.
     */
    pivotKey: string;
    /**
     * Create a new belongs to instance.
     */
    constructor(model: typeof Model, related: Entity, pivot: Entity, foreignPivotKey: string, relatedPivotKey: string, parentKey: string, relatedKey: string);
    /**
     * Specify the custom pivot accessor to use for the relationship.
     */
    as(accessor: string): this;
    /**
     * Define the normalizr schema for the relationship.
     */
    define(schema: Schema): NormalizrSchema;
    /**
     * Attach the relational key to the given data. Since belongs to many
     * relationship doesn't have any foreign key, it would do nothing.
     */
    attach(_key: any, _record: Record, _data: NormalizedData): void;
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value: any, _parent: Record, _key: string): Model[];
    /**
     * Load the belongs to relationship for the record.
     */
    load(query: Query, collection: Collection, name: string, constraints: Constraint[]): void;
    /**
     * Set the constraints for the pivot relation.
     */
    addEagerConstraintForPivot(query: Query, collection: Collection): void;
    /**
     * Set the constraints for the related relation.
     */
    addEagerConstraintForRelated(query: Query, collection: Collection): void;
    /**
     * Create a new indexed map for the pivot relation.
     */
    mapPivotRelations(pivots: Collection, relatedQuery: Query): Records;
    /**
     * Create pivot records for the given records if needed.
     */
    createPivots(parent: typeof Model, data: NormalizedData, key: string): NormalizedData;
    /**
     * Create a pivot record.
     */
    createPivotRecord(data: NormalizedData, record: Record, related: any[]): void;
}
