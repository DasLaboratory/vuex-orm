import Record from '../../data/Record';
import Model from '../../model/Model';
import Mutator from '../contracts/Mutator';
import Type from './Type';
export default class Boolean extends Type {
    /**
     * Create a new number instance.
     */
    constructor(model: typeof Model, value: boolean, mutator?: Mutator<boolean | null>);
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value: any, _parent: Record, key: string): boolean | null;
    /**
     * Transform given data to the boolean.
     */
    fix(value: any): boolean | null;
}
