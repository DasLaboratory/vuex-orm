import NormalizedData from '../../data/NormalizedData';
import Query from '../../query/Query';
export default class Attacher {
    /**
     * Attach missing relational key to the records.
     */
    static process(query: Query, data: NormalizedData): NormalizedData;
}
