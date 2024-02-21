import Model from '../../model/Model';
import Type from './Type';
export default class Uid extends Type {
    /**
     * Create a new uid instance.
     */
    constructor(model: typeof Model, value?: () => string | number);
    /**
     * Convert given value to the appropriate value for the attribute.
     */
    make(value?: any): string | number | null;
}
