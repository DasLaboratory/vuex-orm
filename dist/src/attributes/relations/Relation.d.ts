import { Schema as NormalizrSchema } from 'normalizr';
import Schema from '../../schema/Schema';
import { Record, Records, NormalizedData, Collection } from '../../data';
import Model from '../../model/Model';
import Query from '../../query/Query';
import Constraint from '../../query/contracts/RelationshipConstraint';
import Attribute from '../Attribute';
export default abstract class Relation extends Attribute {
    /**
     * Define the normalizr schema for the relationship.
     */
    abstract define(schema: Schema): NormalizrSchema;
    /**
     * Attach the relational key to the given data. Basically, this method
     * should attach any missing foreign keys to the normalized data.
     */
    abstract attach(key: any, record: Record, data: NormalizedData): void;
    /**
     * Load relationship records.
     */
    abstract load(query: Query, collection: Collection, name: string, constraints: Constraint[]): void;
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    abstract make(value: any, parent: Record, key: string): Model | Model[] | null;
    /**
     * Get relation query instance with constraint attached.
     */
    protected getRelation(query: Query, name: string, constraints: Constraint[]): Query;
    /**
     * Get specified keys from the given collection.
     */
    protected getKeys(collection: Collection, key: string): string[];
    /**
     * Create a new indexed map for the single relation by specified key.
     */
    mapSingleRelations(collection: Record[], key: string): Map<string, Record>;
    /**
     * Create a new indexed map for the many relation by specified key.
     */
    mapManyRelations(collection: Record[], key: string): Map<string, Record>;
    /**
     * Create a new indexed map for relations with order constraints.
     */
    mapRelationsByOrders(collection: Collection, relations: Map<string, Record>, ownerKey: string, relationKey: string): Records;
    /**
     * Check if the given record is a single relation, which is an object.
     */
    isOneRelation(record: any): boolean;
    /**
     * Check if the given records is a many relation, which is an array
     * of object.
     */
    isManyRelation(records: any): boolean;
    /**
     * Wrap the given object into a model instance.
     */
    makeOneRelation(record: any, model: typeof Model): Model | null;
    /**
     * Wrap the given records into a collection of model instances.
     */
    makeManyRelation(records: any, model: typeof Model): Collection;
}
