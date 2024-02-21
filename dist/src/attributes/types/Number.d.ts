import Record from '../../data/Record';
import Model from '../../model/Model';
import Mutator from '../contracts/Mutator';
import Type from './Type';
export default class Number extends Type {
    /**
     * Create a new number instance.
     */
    constructor(model: typeof Model, value: number | null, mutator?: Mutator<number | null>);
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value: any, _parent: Record, key: string): number | null;
    /**
     * Transform given data to the number.
     */
    fix(value: any): number | null;
}
