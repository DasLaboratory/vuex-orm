import Record from '../../data/Record';
import Model from '../../model/Model';
import Mutator from '../contracts/Mutator';
import Type from './Type';
export default class String extends Type {
    /**
     * Create a new string instance.
     */
    constructor(model: typeof Model, value: string | null, mutator?: Mutator<string | null>);
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value: any, _parent: Record, key: string): string | null;
    /**
     * Convert given value to the string.
     */
    fix(value: any): string | null;
}
