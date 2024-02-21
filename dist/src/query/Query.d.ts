import { Store } from 'vuex';
import Database, { Models } from '../database/Database';
import * as Data from '../data';
import Model from '../model/Model';
import State from '../modules/contracts/State';
import RootState from '../modules/contracts/RootState';
import * as Contracts from './contracts';
import * as Options from './options';
export type UpdateClosure = (record: Data.Record) => void;
export type UpdateCondition = number | string | Contracts.Predicate | null;
export type Constraint = (query: Query) => void | boolean;
export type ConstraintCallback = (relationName: string) => Constraint | null;
export default class Query<T extends Model = Model> {
    /**
     * The global lifecycle hook registries.
     */
    static hooks: Contracts.GlobalHooks;
    /**
     * The counter to generate the UID for global hooks.
     */
    static lastHookId: number;
    /**
     * The store instance.
     */
    store: Store<any>;
    /**
     * The database instance.
     */
    database: Database;
    /**
     * The entity name being queried.
     */
    entity: string;
    /**
     * The entity name being queried.
     */
    baseEntity: string;
    /**
     * The entity state of the Vuex Store.
     */
    state: State;
    /**
     * The root state of the Vuex Store.
     */
    rootState: RootState;
    /**
     * The model being queried.
     */
    model: typeof Model;
    /**
     * The base model.
     */
    baseModel: typeof Model;
    /**
     * This flag lets us know if current Query instance applies to
     * a base class or not (in order to know when to filter out
     * some records).
     */
    appliedOnBase: boolean;
    /**
     * Primary key ids to filter records by. It is used for filtering records
     * direct key lookup when a user is trying to fetch records by its
     * primary key.
     *
     * It should not be used if there is a logic which prevents index usage, for
     * example, an "or" condition which already requires a full scan of records.
     */
    idFilter: Set<number | string> | null;
    /**
     * Whether to use `idFilter` key lookup. True if there is a logic which
     * prevents index usage, for example, an "or" condition which already
     * requires full scan.
     */
    cancelIdFilter: boolean;
    /**
     * Primary key ids to filter joined records. It is used for filtering
     * records direct key lookup. It should not be cancelled, because it
     * is free from the effects of normal where methods.
     */
    joinedIdFilter: Set<number | string> | null;
    /**
     * The where constraints for the query.
     */
    wheres: Options.Where[];
    /**
     * The has constraints for the query.
     */
    have: Options.Has[];
    /**
     * The orders of the query result.
     */
    orders: Options.Orders[];
    /**
     * Number of results to skip.
     */
    offsetNumber: number;
    /**
     * Maximum number of records to return.
     *
     * We use polyfill of `Number.MAX_SAFE_INTEGER` for IE11 here.
     */
    limitNumber: number;
    /**
     * The relationships that should be eager loaded with the result.
     */
    load: Options.Load;
    /**
     * Create a new Query instance.
     */
    constructor(store: Store<any>, entity: string);
    /**
     * Delete all records from the store.
     */
    static deleteAll(store: Store<any>): void;
    /**
     * Register a global hook. It will return ID for the hook that users may use
     * it to unregister hooks.
     */
    static on(on: string, callback: Contracts.HookableClosure): number;
    /**
     * Unregister global hook with the given id.
     */
    static off(id: number): boolean;
    /**
     * Get query class.
     */
    self(): typeof Query;
    /**
     * Create a new query instance.
     */
    newQuery(entity?: string): Query;
    /**
     * Get model of given name from the container.
     */
    getModel(name?: string): typeof Model;
    /**
     * Get all models from the container.
     */
    getModels(): Models;
    /**
     * Get base model of given name from the container.
     */
    getBaseModel(name: string): typeof Model;
    /**
     * Returns all record of the query chain result. This method is alias
     * of the `get` method.
     */
    all(): Data.Collection<T>;
    /**
     * Find the record by the given id.
     */
    find(value: Options.PrimaryKey): Data.Item<T>;
    /**
     * Get the record of the given array of ids.
     */
    findIn(values: Options.PrimaryKey[]): Data.Collection<T>;
    /**
     * Returns all record of the query chain result.
     */
    get(): Data.Collection<T>;
    /**
     * Returns the first record of the query chain result.
     */
    first(): Data.Item<T>;
    /**
     * Returns the last record of the query chain result.
     */
    last(): Data.Item<T>;
    /**
     * Checks whether a result of the query chain exists.
     */
    exists(): boolean;
    /**
     * Add a and where clause to the query.
     */
    where(field: any, value?: any): this;
    /**
     * Add a or where clause to the query.
     */
    orWhere(field: any, value?: any): this;
    /**
     * Filter records by their primary key.
     */
    whereId(value: Options.PrimaryKey): this;
    /**
     * Filter records by their primary keys.
     */
    whereIdIn(values: Options.PrimaryKey[]): this;
    /**
     * Fast comparison for foreign keys. If the foreign key is the primary key,
     * it uses object lookup, fallback normal where otherwise.
     *
     * Why separate `whereFk` instead of just `where`? Additional logic needed
     * for the distinction between where and orWhere in normal queries, but
     * Fk lookups are always "and" type.
     */
    whereFk(field: string, value: Options.PrimaryKey): this;
    /**
     * Convert value to string for composite primary keys as it expects an array.
     * Otherwise return as is.
     *
     * Throws an error when malformed value is given:
     * - Composite primary key defined on model, expects value to be array.
     * - Normal primary key defined on model, expects a primitive value.
     */
    private normalizeIndexId;
    /**
     * Check whether the given field is filterable through primary key
     * direct look up.
     */
    private isIdfilterable;
    /**
     * Set id filter for the given where condition.
     */
    private setIdFilter;
    /**
     * Set joined id filter for the given where condition.
     */
    private setJoinedIdFilter;
    /**
     * Add an order to the query.
     */
    orderBy(key: Options.OrderKey, direction?: Options.OrderDirection): this;
    /**
     * Add an offset to the query.
     */
    offset(offset: number): this;
    /**
     * Add limit to the query.
     */
    limit(limit: number): this;
    /**
     * Set the relationships that should be loaded.
     */
    with(name: string | string[], constraint?: Contracts.RelationshipConstraint | null): this;
    /**
     * Query all relations.
     */
    withAll(constraint?: Contracts.RelationshipConstraint | null): this;
    /**
     * Query all relations recursively.
     */
    withAllRecursive(depth?: number): this;
    /**
     * Set where constraint based on relationship existence.
     */
    has(relation: string, operator?: string | number, count?: number): this;
    /**
     * Set where constraint based on relationship absence.
     */
    hasNot(relation: string, operator?: string | number, count?: number): this;
    /**
     * Add where has condition.
     */
    whereHas(relation: string, constraint: Options.HasConstraint): this;
    /**
     * Add where has not condition.
     */
    whereHasNot(relation: string, constraint: Options.HasConstraint): this;
    /**
     * Get all records from the state and convert them into the array of
     * model instances.
     */
    records(): Data.Collection<T>;
    /**
     * Check whether if id filters should on select. If not, clear out id filter.
     */
    private finalizeIdFilter;
    /**
     * Get a list of id that should be used to lookup when fetching records
     * from the state.
     */
    private getIdsToLookup;
    /**
     * Process the query and filter data.
     */
    select(): Data.Collection<T>;
    /**
     * Filter the given data by registered where clause.
     */
    filterWhere(records: Data.Collection<T>): Data.Collection<T>;
    /**
     * Sort the given data by registered orders.
     */
    filterOrderBy(records: Data.Collection<T>): Data.Collection<T>;
    /**
     * Limit the given records by the limit and offset.
     */
    filterLimit(records: Data.Collection<T>): Data.Collection<T>;
    /**
     * Get the count of the retrieved data.
     */
    count(): number;
    /**
     * Get the max value of the specified filed.
     */
    max(field: string): number;
    /**
     * Get the min value of the specified filed.
     */
    min(field: string): number;
    /**
     * Get the sum value of the specified filed.
     */
    sum(field: string): number;
    /**
     * Create a item from given record.
     */
    item(item: Data.Instance<T>): Data.Item<T>;
    /**
     * Create a collection (array) from given records.
     */
    collect(collection: Data.Collection<T>): Data.Collection<T>;
    /**
     * Create new data with all fields filled by default values.
     */
    new(): T;
    /**
     * Save given data to the store by replacing all existing records in the
     * store. If you want to save data without replacing existing records,
     * use the `insert` method instead.
     */
    create(data: Data.Record | Data.Record[], options: Options.PersistOptions): Data.Collections;
    /**
     * Create records to the state.
     */
    createRecords(records: Data.Records): Data.Collection<T>;
    /**
     * Insert given data to the store. Unlike `create`, this method will not
     * remove existing data within the store, but it will update the data
     * with the same primary key.
     */
    insert(data: Data.Record | Data.Record[], options: Options.PersistOptions): Data.Collections;
    /**
     * Insert records to the store.
     */
    insertRecords(records: Data.Records): Data.Collection<T>;
    /**
     * Update data in the state.
     */
    update(data: Data.Record | Data.Record[] | UpdateClosure, condition: UpdateCondition, options: Options.PersistOptions): Data.Item<T> | Data.Collection<T> | Data.Collections;
    /**
     * Update all records.
     */
    updateRecords(records: Data.Records): Data.Collection<T>;
    /**
     * Update the state by id.
     */
    updateById(data: Data.Record | UpdateClosure, id: string | number): Data.Item<T>;
    /**
     * Update the state by condition.
     */
    updateByCondition(data: Data.Record | UpdateClosure, condition: Contracts.Predicate): Data.Collection<T>;
    /**
     * Update the given record with given data.
     */
    processUpdate(data: Data.Record | UpdateClosure, instance: Data.Instance<T>): Data.Instance<T>;
    /**
     * Commit `update` to the state.
     */
    private performUpdate;
    /**
     * Insert or update given data to the state. Unlike `insert`, this method
     * will not replace existing data within the state, but it will update only
     * the submitted data with the same primary key.
     */
    insertOrUpdate(data: Data.Record | Data.Record[], options: Options.PersistOptions): Data.Collections;
    /**
     * Insert or update the records.
     */
    insertOrUpdateRecords(records: Data.Records): Data.Collection<T>;
    /**
     * Persist data into the state while preserving it's original structure.
     */
    persist(method: Options.PersistMethods, data: Data.Record | Data.Record[], options: Options.PersistOptions): Data.Collections;
    /**
     * Persist given records to the store by the given method.
     */
    persistRecords(method: Options.PersistMethods, records: Data.Records): Data.Collection<T>;
    /**
     * Get persist method from given information.
     */
    private getPersistMethod;
    /**
     * Delete matching records with the given condition from the store.
     */
    delete(condition: string | number | (number | string)[]): Data.Item;
    delete(condition: Contracts.Predicate): Data.Collection;
    /**
     * Delete all records from the store. Even when deleting all records, we'll
     * iterate over all records to ensure that before and after hook will be
     * called for each existing records.
     */
    deleteAll(): Data.Collection;
    /**
     * Delete a record from the store by given id.
     */
    private deleteById;
    /**
     * Perform the actual delete query to the store.
     */
    private deleteByCondition;
    /**
     * Commit mutation.
     */
    private commit;
    /**
     * Commit insert mutation.
     */
    private commitInsert;
    /**
     * Commit update mutation.
     */
    private commitUpdate;
    /**
     * Commit insert records mutation.
     */
    private commitInsertRecords;
    /**
     * Commit delete mutation.
     */
    private commitDelete;
    /**
     * Normalize the given data.
     */
    normalize(data: Data.Record | Data.Record[]): Data.NormalizedData;
    /**
     * Convert given record to the model instance.
     */
    hydrate(record: Data.Record, forceModel?: typeof Model): Data.Instance<T>;
    /**
     * Convert given records to instances by merging existing record. If there's
     * no existing record, that record will not be included in the result.
     */
    hydrateRecordsByMerging(records: Data.Records): Data.Instances<T>;
    /**
     * Convert all given records and return it as a collection.
     */
    private mapHydrateRecords;
    /**
     * Convert all given records and return it as a collection.
     */
    private mapHydrateAndFilterRecords;
    /**
     * Convert given collection to records by using index id as a key.
     */
    private convertCollectionToRecords;
    /**
     * Clears the current state from any data related to current model.
     *
     * - Everything if not in a inheritance scheme.
     * - Only derived instances if applied to a derived entity.
     */
    private emptyState;
    /**
     * Build executable hook collection for the given hook.
     */
    private buildHooks;
    /**
     * Get global hook of the given name as array by stripping id key and keep
     * only hook functions.
     */
    private getGlobalHookAsArray;
    /**
     * Execute mutation hooks to the given collection.
     */
    private executeMutationHooks;
    /**
     * Execute retrieve hook for the given method.
     */
    private executeSelectHook;
}
