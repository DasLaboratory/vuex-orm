import Model from '../../model/Model';
import Instance from '../../data/Instance';
import Collection from '../../data/Collection';
import * as Options from '../options';
import Query from '../Query';
export default class WhereFilter {
    /**
     * Filter the given data by registered where clause.
     */
    static filter<T extends Model>(query: Query, records: Collection<T>): Collection<T>;
    /**
     * Checks if given Record matches the registered where clause.
     */
    static check(query: Query, record: Instance): boolean;
    /**
     * Get comparator for the where clause.
     */
    static getComparator(query: Query, record: Instance): (where: Options.Where) => boolean;
    /**
     * Execute where closure.
     */
    static executeWhereClosure(query: Query, record: Instance, closure: Options.WherePrimaryClosure): boolean | void;
}
