import Model from '../../model/Model';
import Mutator from '../contracts/Mutator';
import Attribute from '../Attribute';
export default abstract class Type extends Attribute {
    /**
     * Whether if the attribute can accept `null` as a value.
     */
    isNullable: boolean;
    /**
     * The mutator for the field.
     */
    mutator?: Mutator<any>;
    /**
     * Create a new type instance.
     */
    constructor(model: typeof Model, value: any, mutator?: (value: any) => any);
    /**
     * Set `isNullable` to be `true`.
     */
    nullable(): this;
    /**
     * Mutate the given value by mutator.
     */
    mutate(value: any, key: string): any;
}
