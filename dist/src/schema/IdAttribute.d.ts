import { schema } from 'normalizr';
import Model from '../model/Model';
export default class IdAttribute {
    /**
     * Creates a closure that generates the required id's for an entity.
     */
    static create(model: typeof Model): schema.StrategyFunction<string>;
    /**
     * Generate a field that is defined as primary keys. For keys with a proper
     * value set, it will do nothing. If a key is missing, it will generate
     * UID for it.
     */
    private static generateIds;
    /**
     * Generate index id field (which is `$id`) and attach to the given record.
     */
    private static generateIndexId;
}
