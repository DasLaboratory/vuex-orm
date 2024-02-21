import NormalizedData from '../../data/NormalizedData';
import Query from '../../query/Query';
export default class PivotCreator {
    /**
     * Create an intermediate entity if the data contains any entities that
     * require it for example `belongsTo` or `morphMany`.
     */
    static process(query: Query, data: NormalizedData): NormalizedData;
}
