import { Store } from 'vuex';
import Record from '../data/Record';
import Records from '../data/Records';
import RootState from '../modules/contracts/RootState';
import State from '../modules/contracts/State';
export default class Connection {
    /**
     * The store instance.
     */
    store: Store<any>;
    /**
     * The connection name.
     */
    connection: string;
    /**
     * The entity name.
     */
    entity: string;
    /**
     * The root state.
     */
    rootState: RootState;
    /**
     * The entity state.
     */
    state: State;
    /**
     * Create a new connection instance.
     */
    constructor(store: Store<any>, connection: string, entity: string);
    /**
     * Insert the given record.
     */
    insert(record: Record): void;
    /**
     * Insert the given records.
     */
    insertRecords(records: Records): void;
    /**
     * Updates the given record.
     */
    update(newId: String, record: Record): void;
    /**
     * Delete records that matches the given id.
     */
    delete(id: string[]): void;
}
