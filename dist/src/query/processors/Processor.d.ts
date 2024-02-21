import Record from '../../data/Record';
import NormalizedData from '../../data/NormalizedData';
import Query from '../Query';
export default class Processor {
    /**
     * Normalize the given data.
     */
    static normalize(query: Query, record: Record | Record[]): NormalizedData;
}
