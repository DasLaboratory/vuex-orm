import * as Vuex from 'vuex';
import Database from '../database/Database';
import Record from '../data/Record';
import InstanceOf from '../data/InstanceOf';
import Item from '../data/Item';
import Collection from '../data/Collection';
import Collections from '../data/Collections';
import State from '../modules/contracts/State';
import * as Attributes from '../attributes';
import Mutator from '../attributes/contracts/Mutator';
import Mutators from '../attributes/contracts/Mutators';
import Predicate from '../query/contracts/Predicate';
import Query from '../query/Query';
import * as Payloads from '../modules/payloads/Actions';
import Fields from './contracts/Fields';
import FieldCache from './contracts/FieldCache';
import ModelState from './contracts/State';
import InheritanceTypes from './contracts/InheritanceTypes';
export default class Model {
    /**
     * The name that is going be used as module name in Vuex Store.
     */
    static entity: string;
    /**
     * The reference to the base entity name if the class extends a base entity.
     */
    static baseEntity: string;
    /**
     * The primary key to be used for the model.
     */
    static primaryKey: string | string[];
    /**
     * The discriminator key to be used for the model when inheritance is used
     */
    static typeKey: string;
    /**
     * Vuex Store state definition.
     */
    static state: ModelState | (() => ModelState);
    /**
     * The cached attribute fields of the model.
     */
    static cachedFields: FieldCache;
    /**
     * The index ID for the model.
     */
    $id: string | null;
    /**
     * Create a new model instance.
     */
    constructor(record?: Record);
    /**
     * The definition of the fields of the model and its relations.
     */
    static fields(): Fields;
    /**
     * Create an attr attribute.
     */
    static attr(value: any, mutator?: Mutator<any>): Attributes.Attr;
    /**
     * Create a string attribute.
     */
    static string(value: any, mutator?: Mutator<string | null>): Attributes.String;
    /**
     * Create a number attribute.
     */
    static number(value: any, mutator?: Mutator<number | null>): Attributes.Number;
    /**
     * Create a boolean attribute.
     */
    static boolean(value: any, mutator?: Mutator<boolean | null>): Attributes.Boolean;
    /**
     * Create an uid attribute.
     */
    static uid(value?: () => string | number): Attributes.Uid;
    /**
     * @deprecated Use `uid` attribute instead.
     */
    static increment(): Attributes.Uid;
    /**
     * Create a has one relationship.
     */
    static hasOne(related: typeof Model | string, foreignKey: string, localKey?: string): Attributes.HasOne;
    /**
     * Create a belongs to relationship.
     */
    static belongsTo(parent: typeof Model | string, foreignKey: string, ownerKey?: string): Attributes.BelongsTo;
    /**
     * Create a has many relationship.
     */
    static hasMany(related: typeof Model | string, foreignKey: string, localKey?: string): Attributes.HasMany;
    /**
     * Create a has many by relationship.
     */
    static hasManyBy(parent: typeof Model | string, foreignKey: string, ownerKey?: string): Attributes.HasManyBy;
    /**
     * Create a has many through relationship.
     */
    static hasManyThrough(related: typeof Model | string, through: typeof Model | string, firstKey: string, secondKey: string, localKey?: string, secondLocalKey?: string): Attributes.HasManyThrough;
    /**
     * Create a belongs to many relationship.
     */
    static belongsToMany(related: typeof Model | string, pivot: typeof Model | string, foreignPivotKey: string, relatedPivotKey: string, parentKey?: string, relatedKey?: string): Attributes.BelongsToMany;
    /**
     * Create a morph to relationship.
     */
    static morphTo(id: string, type: string): Attributes.MorphTo;
    /**
     * Create a morph one relationship.
     */
    static morphOne(related: typeof Model | string, id: string, type: string, localKey?: string): Attributes.MorphOne;
    /**
     * Create a morph many relationship.
     */
    static morphMany(related: typeof Model | string, id: string, type: string, localKey?: string): Attributes.MorphMany;
    /**
     * Create a morph to many relationship.
     */
    static morphToMany(related: typeof Model | string, pivot: typeof Model | string, relatedId: string, id: string, type: string, parentKey?: string, relatedKey?: string): Attributes.MorphToMany;
    /**
     * Create a morphed by many relationship.
     */
    static morphedByMany(related: typeof Model | string, pivot: typeof Model | string, relatedId: string, id: string, type: string, parentKey?: string, relatedKey?: string): Attributes.MorphedByMany;
    /**
     * Mutators to mutate matching fields when instantiating the model.
     */
    static mutators(): Mutators;
    /**
     * Types mapping used to dispatch entities based on their discriminator field
     */
    static types(): InheritanceTypes;
    /**
     * Get the store instance from the container.
     */
    static store(): Vuex.Store<any>;
    /**
     * Get the database instance from store.
     */
    static database(): Database;
    /**
     * Create a namespaced method name for Vuex Module from the given
     * method name.
     */
    static namespace(method: string): string;
    /**
     * Call Vuex Getters.
     */
    static getters(method: string): any;
    /**
     * Dispatch Vuex Action.
     */
    static dispatch(method: string, payload?: any): Promise<any>;
    /**
     * Commit Vuex Mutation.
     */
    static commit(callback: (state: State) => void): void;
    /**
     * Get the Model schema definition from the cache.
     */
    static getFields(): Fields;
    /**
     * Get all records.
     */
    static all<T extends typeof Model>(this: T): Collection<InstanceOf<T>>;
    /**
     * Find a record.
     */
    static find<T extends typeof Model>(this: T, id: string | number | (number | string)[]): Item<InstanceOf<T>>;
    /**
     * Get the record of the given array of ids.
     */
    static findIn<T extends typeof Model>(this: T, idList: (number | string | (number | string)[])[]): Collection<InstanceOf<T>>;
    /**
     * Get query instance.
     */
    static query<T extends typeof Model>(this: T): Query<InstanceOf<T>>;
    /**
     * Check wether the associated database contains data.
     */
    static exists<T extends typeof Model>(this: T): boolean;
    /**
     * Create new data with all fields filled by default values.
     */
    static new(): Promise<Model>;
    /**
     * Save given data to the store by replacing all existing records in the
     * store. If you want to save data without replacing existing records,
     * use the `insert` method instead.
     */
    static create<T extends typeof Model>(this: T, payload: Payloads.Create): Promise<Collections>;
    /**
     * Insert records.
     */
    static insert<T extends typeof Model>(this: T, payload: Payloads.Insert): Promise<Collections>;
    /**
     * Update records.
     */
    static update<T extends typeof Model>(this: T, payload: Payloads.Update): Promise<Collections>;
    /**
     * Insert or update records.
     */
    static insertOrUpdate<T extends typeof Model>(this: T, payload: Payloads.InsertOrUpdate): Promise<Collections>;
    /**
     * Delete records that matches the given condition.
     */
    static delete<M extends typeof Model>(this: M, id: string | number | (number | string)[]): Promise<Item<InstanceOf<M>>>;
    static delete<M extends typeof Model>(this: M, condition: Predicate<InstanceOf<M>>): Promise<Collection<InstanceOf<M>>>;
    /**
     * Delete all records from the store.
     */
    static deleteAll<M extends typeof Model>(this: M): Promise<Collection<InstanceOf<M>>>;
    /**
     * Check if the given key is the primary key. If the model has composite
     * primary key, this method is going to check if the given key is included
     * in the composite key.
     */
    static isPrimaryKey(key: string): boolean;
    /**
     * Check if the primary key is a composite key.
     */
    static isCompositePrimaryKey(): boolean;
    /**
     * Get the id (value of primary key) from teh given record. If primary key is
     * not present, or it is invalid primary key value, which is other than
     * `string` or `number`, it's going to return `null`.
     *
     * If the model has composite key, it's going to return array of ids. If any
     * composite key missing, it will return `null`.
     */
    static getIdFromRecord(record: Record): string | number | (string | number)[] | null;
    /**
     * Get correct index id, which is `string` | `number`, from the given value.
     */
    static getIdFromValue(value: any): string | number | null;
    /**
     * Get the index ID value from the given record. An index ID is a value that
     * used as a key for records within the Vuex Store.
     *
     * Most of the time, it's same as the value for the Model's primary key but
     * it's always `string`, even if the primary key value is `number`.
     *
     * If the Model has a composite primary key, each value corresponding to
     * those primary key will be stringified and become a single string value
     * such as `'[1,2]'`.
     *
     * If the primary key is not present at the given record, it returns `null`.
     * For the composite primary key, every key must exist at a given record,
     * or it will return `null`.
     */
    static getIndexIdFromRecord(record: Record): string | null;
    /**
     * Get local key to pass to the attributes.
     */
    static localKey(key?: string): string;
    /**
     * Get the model object that matches the given record type. The method is for
     * getting the correct model object when the model has any inheritance
     * children model.
     *
     * For example, if a User Model have `static types()` declared, and if you
     * pass record with `{ type: 'admin' }`, then the method will likely to
     * return SuperUser class.
     */
    static getModelFromRecord(record: Record | Model): typeof Model | null;
    /**
     * Get a model from the container.
     */
    static relation(model: typeof Model | string): typeof Model;
    /**
     * Get all `belongsToMany` fields from the schema.
     */
    static pivotFields(): {
        [key: string]: Attributes.BelongsToMany | Attributes.MorphToMany | Attributes.MorphedByMany;
    }[];
    /**
     * Check if fields contains the `belongsToMany` field type.
     */
    static hasPivotFields(): boolean;
    /**
     * Check if the current model has a type definition
     */
    static hasTypes(): boolean;
    /**
     * Get the model corresponding to the given type name. If it can't be found,
     * it'll return `null`.
     */
    static getTypeModel(name: string): typeof Model | null;
    /**
     * Given a Model, this returns the corresponding key in the InheritanceTypes mapping
     */
    static getTypeKeyValueFromModel(model?: typeof Model): string | null;
    /**
     * Tries to find a Relation field in all types defined in the InheritanceTypes mapping
     */
    static findRelationInSubTypes(relationName: string): Attributes.Relation | null;
    /**
     * Fill any missing fields in the given record with the default value defined
     * in the model schema.
     */
    static hydrate(record?: Record): Record;
    /**
     * Get the constructor of this model.
     */
    $self(): typeof Model;
    /**
     * Get the primary key for the model.
     */
    $primaryKey(): string | string[];
    /**
     * The definition of the fields of the model and its relations.
     */
    $fields(): Fields;
    /**
     * Set index id.
     */
    $setIndexId(id: string | null): this;
    /**
     * Get the store instance from the container.
     */
    $store(): Vuex.Store<any>;
    /**
     * Create a namespaced method name for Vuex Module from the given
     * method name.
     */
    $namespace(method: string): string;
    /**
     * Call Vuex Getetrs.
     */
    $getters(method: string): any;
    /**
     * Dispatch Vuex Action.
     */
    $dispatch(method: string, payload?: any): Promise<any>;
    /**
     * Get all records.
     */
    $all<T extends Model>(this: T): Collection<T>;
    /**
     * Find a record.
     */
    $find<T extends Model>(this: T, id: string | number | (number | string)[]): Item<T>;
    /**
     * Find record of the given array of ids.
     */
    $findIn<T extends Model>(this: T, idList: (number | string | (number | string)[])[]): Collection<T>;
    /**
     * Get query instance.
     */
    $query(): Query;
    /**
     * Create records.
     */
    $create(payload: Payloads.Create): Promise<Collections>;
    /**
     * Create records.
     */
    $insert(payload: Payloads.Insert): Promise<Collections>;
    /**
     * Update records.
     */
    $update(payload: Payloads.Update): Promise<Collections>;
    /**
     * Insert or update records.
     */
    $insertOrUpdate(payload: Payloads.InsertOrUpdate): Promise<Collections>;
    /**
     * Save record.
     */
    $save<T extends Model>(this: T): Promise<Item<T>>;
    /**
     * Delete records that matches the given condition.
     */
    $delete(): Promise<Item<this>>;
    /**
     * Delete all records.
     */
    $deleteAll(): Promise<Collection<this>>;
    /**
     * Fill the model instance with the given record. If no record were passed,
     * or if the record has any missing fields, each value of the fields will
     * be filled with its default value defined at model fields definition.
     */
    $fill(record?: Record): void;
    /**
     * Generate missing primary ids and index id.
     */
    $generateId(): this;
    /**
     * Generate any missing primary ids.
     */
    $generatePrimaryId(): this;
    /**
     * Generate index id from current model attributes.
     */
    $generateIndexId(): this;
    /**
     * Get index id based on current model attributes.
     */
    $getIndexIdFromAttributes(): string | null;
    /**
     * Get all of the current attributes on the model. It includes index id
     * value as well. This method is mainly used when saving a model to
     * the store.
     */
    $getAttributes(): Record;
    /**
     * Serialize field values into json.
     */
    $toJson(): Record;
}
