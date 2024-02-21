import Model from '../../model/Model';
import Collection from '../../data/Collection';
import Query from '../Query';
export default class Filter {
    /**
     * Filter the given data by registered where clause.
     */
    static where<T extends Model = Model>(query: Query, records: Collection<T>): Collection<T>;
    /**
     * Sort the given data by registered orders.
     */
    static orderBy<T extends Model = Model>(query: Query, records: Collection<T>): Collection<T>;
    /**
     * Limit the given records by the lmilt and offset.
     */
    static limit<T extends Model = Model>(query: Query, records: Collection<T>): Collection<T>;
}
