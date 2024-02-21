import { Store, Module } from 'vuex';
import Schemas from '../schema/Schemas';
import Model from '../model/Model';
import RootState from '../modules/contracts/RootState';
import State from '../modules/contracts/State';
export interface Entity {
    name: string;
    base: string;
    model: typeof Model;
    module: Module<any, any>;
}
export type Models = Record<string, typeof Model>;
export type Modules = Record<string, Module<State, any>>;
export default class Database {
    /**
     * The Vuex Store instance.
     */
    store: Store<any>;
    /**
     * The namespace for the Vuex Module. Vuex ORM will create Vuex Modules from the
     * registered models and modules and define them under this namespace.
     */
    namespace: string;
    /**
     * The list of entities. It contains models and modules with its name.
     * The name is going to be the namespace for the Vuex Modules.
     */
    entities: Entity[];
    /**
     * The normalizr schema.
     */
    schemas: Schemas;
    /**
     * Whether the database has already been installed to Vuex or not.
     * Model registration steps depend on its value.
     */
    isStarted: boolean;
    /**
     * Initialize the database before a user can start using it.
     */
    start(store: Store<any>, namespace: string): void;
    /**
     * Register a model and a module to Database.
     */
    register(model: typeof Model, module?: Module<any, any>): void;
    /**
     * Get the model of the given name from the entities list.
     */
    model<T extends typeof Model>(model: T): T;
    model(model: string): typeof Model;
    /**
     * Get the base model of the given name from the entities list.
     */
    baseModel<T extends typeof Model>(model: T): T;
    baseModel(model: string): typeof Model;
    /**
     * Get all models from the entities list.
     */
    models(): Models;
    /**
     * Get all base models from the entities list.
     */
    baseModels(): Models;
    /**
     * Get the module of the given name from the entities list.
     */
    module(name: string): Module<any, any>;
    /**
     * Get all modules from the entities list.
     */
    modules(): Modules;
    /**
     * Get the root state from the store.
     */
    getState(): RootState;
    /**
     * Create a new model that binds the database.
     *
     * Transpiled classes cannot extend native classes. Implemented a workaround
     * until Babel releases a fix (https://github.com/babel/babel/issues/9367).
     */
    private createBindingModel;
    /**
     * Create Vuex Module from the registered entities, and register to
     * the store.
     */
    private registerModules;
    /**
     * Generate module from the given entity, and register to the store.
     */
    private registerModule;
    /**
     * Create Vuex Module from the registered entities.
     */
    private createModule;
    /**
     * Create root module.
     */
    private createRootModule;
    /**
     * Create root state.
     */
    private createRootState;
    /**
     * Create root getters. For the getters, we bind the store instance to each
     * function to retrieve database instances within getters. We only need this
     * for the getter since actions and mutations are already bound to store.
     */
    private createRootGetters;
    /**
     * Create root actions.
     */
    private createRootActions;
    /**
     * Create root mutations.
     */
    private createRootMutations;
    /**
     * Create sub module.
     */
    private createSubModule;
    /**
     * Create sub state.
     */
    private createSubState;
    /**
     * Create sub getters.
     */
    private createSubGetters;
    /**
     * Create sub actions.
     */
    private createSubActions;
    /**
     * Create sub mutations.
     */
    private createSubMutations;
    /**
     * Create the schema definition from registered entities list and set it to
     * the `schema` property. This schema will be used by the normalizer
     * to normalize data before persisting them to the Vuex Store.
     */
    private createSchema;
    /**
     * Generate schema from the given entity.
     */
    private registerSchema;
    /**
     * Inject database to the store instance.
     */
    private connect;
    /**
     * Warn user if the given model is a type of an inherited model that is being
     * defined without overwriting `Model.types()` because the user will not be
     * able to use the type mapping feature in this case.
     */
    private checkModelTypeMappingCapability;
}
