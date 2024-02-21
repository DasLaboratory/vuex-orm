import HasConstraint from '../options/HasConstraint';
import Query from '../Query';
export default class Rollcaller {
    /**
     * Set where constraint based on relationship existence.
     */
    static has(query: Query, relation: string, operator?: string | number, count?: number): void;
    /**
     * Set where constraint based on relationship absence.
     */
    static hasNot(query: Query, relation: string, operator?: string | number, count?: number): void;
    /**
     * Add where has condition.
     */
    static whereHas(query: Query, relation: string, constraint: HasConstraint): void;
    /**
     * Add where has not condition.
     */
    static whereHasNot(query: Query, relation: string, constraint: HasConstraint): void;
    /**
     * Set `has` condition.
     */
    private static setHas;
    /**
     * Convert `has` conditions to where clause. It will check any relationship
     * existence, or absence for the records then set ids of the records that
     * matched the condition to `where` clause.
     *
     * This way, when the query gets executed, only those records that matched
     * the `has` condition get retrieved. In the future, once relationship index
     * mapping is implemented, we can simply do all checks inside the where
     * filter since we can treat `has` condition as usual `where` condition.
     *
     * For now, since we must fetch any relationship by eager loading them, due
     * to performance concern, we'll apply `has` conditions this way to gain
     * maximum performance.
     */
    static applyConstraints(query: Query): void;
    /**
     * Add has constraints to the given query. It's going to set all relationship
     * as `with` alongside with its closure constraints.
     */
    private static addHasWhereConstraints;
    /**
     * Add has constraints as where clause.
     */
    private static addHasConstraints;
    /**
     * Get comparators for the has clause.
     */
    private static getComparators;
    /**
     * Get a comparator for the has clause.
     */
    private static getComparator;
    /**
     * Get count of the relationship.
     */
    private static getRelationshipCount;
    /**
     * Get comparator function for the `has` clause.
     */
    private static getCountComparator;
}
