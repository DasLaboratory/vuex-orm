import Model from '../model/Model';
import Instance from './Instance';
export type Collection<M extends Model = Model> = Instance<M>[];
export default Collection;
