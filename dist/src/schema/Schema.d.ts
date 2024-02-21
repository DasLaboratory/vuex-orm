import { schema as Normalizr, Schema as NormalizrSchema } from 'normalizr';
import Model from '../model/Model';
import Schemas from './Schemas';
export default class Schema {
    /**
     * List of generated schemas.
     */
    schemas: Schemas;
    /**
     * The model class.
     */
    model: typeof Model;
    /**
     * Create a new schema instance.
     */
    constructor(model: typeof Model);
    /**
     * Create a schema for the given model.
     */
    static create(model: typeof Model): Normalizr.Entity;
    /**
     * Create a single schema for the given model.
     */
    one(model?: typeof Model): Normalizr.Entity;
    /**
     * Create an array schema for the given model.
     */
    many(model: typeof Model): Normalizr.Array;
    /**
     * Create an union schema for the given model.
     */
    union(callback: Normalizr.SchemaFunction): Normalizr.Union;
    /**
     * Create a dfinition for the given model.
     */
    definition(model: typeof Model): NormalizrSchema;
}
