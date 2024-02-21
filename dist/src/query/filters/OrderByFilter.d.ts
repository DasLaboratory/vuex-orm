import Model from '../../model/Model';
import Collection from '../../data/Collection';
import Query from '../Query';
export default class OrderByFilter {
    /**
     * Sort the given data by registered orders.
     */
    static filter<T extends Model = Model>(query: Query, records: Collection<T>): Collection<T>;
}
