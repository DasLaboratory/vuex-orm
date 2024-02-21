import Record from '../../data/Record';
import NormalizedData from '../../data/NormalizedData';
import Query from '../../query/Query';
export default class Normalizer {
    /**
     * Normalize the record.
     */
    static process(query: Query, record: Record | Record[]): NormalizedData;
}
