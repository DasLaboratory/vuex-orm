import Collection from '../../data/Collection';
import Constraint from '../contracts/RelationshipConstraint';
import Query from '../Query';
export default class Loader {
    /**
     * Set the relationships that should be eager loaded with the query.
     */
    static with(query: Query, name: string | string[], constraint: Constraint | null): void;
    /**
     * Set all relationships to be eager loaded with the query.
     */
    static withAll(query: Query, constraint: Constraint | null): void;
    /**
     * Set relationships to be recursively eager loaded with the query.
     */
    static withAllRecursive(query: Query, depth: number): void;
    /**
     * Set eager load relation and constraint.
     */
    private static setEagerLoad;
    /**
     * Parse a list of relations into individuals.
     */
    private static parseWithRelations;
    /**
     * Parse the nested relationships in a relation.
     */
    private static addNestedWiths;
    /**
     * Eager load the relationships for the given collection.
     */
    static eagerLoadRelations(query: Query, collection: Collection): void;
}
