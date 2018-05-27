import { Map, GuardedMap, BasicMap } from './index';


/**
 * @class Maps
 * @description
 * Class with static generic factory methods to create Map<E> objects
 * 
 * @author Adam Filipek
 * @version 0.2.0
 */
export class Maps {

    /**
     * CreateMap<E>()
     * 
     * @function createMap<E>()
     * @returns Map<E>
     * @description Creating new empty Map
     */
    public static createMap<E>(): Map<E> {
        return new Map<E>();
    }

    /**
     * CreateGuardedMap<E>()
     * 
     * @function createGuardedMap<E>()
     * @returns GuardedMap<E>
     * @description Creating new empty GuardedMap (Map only accessible by methods)
     */
    public static createGuardedMap<E>(): GuardedMap<E> {
        return new GuardedMap<E>();
    }

    /**
     * Map From Array<E> (array, keyPrefix)
     * 
     * @function mapFromArray<E>()
     * @param array Array<E>
     * @param keyPrefix(optional) string
     * @returns Map<E>
     * @description Creating new Map with values from given array.
     * Second param is optional and it`s a prefix for keys.
     * By default keys are array indexes converted to strings.
     */
    public static mapFromArray<E>(array: Array<E>, keyPrefix?: string): Map<E> {
        const map = new Map<E>();
        array.forEach((el: E, i: number) => {
            map.add(keyPrefix ? i.toString() + keyPrefix : i.toString(), el);
        });
        return map;
    }

    /**
     * Guarded Map From Array<E> (array, keyPrefix)
     * 
     * @function guardedMapFromArray<E>()
     * @param array Array<E>
     * @param keyPrefix(optional) string
     * @returns GuardedMap<E>
     * @description Creating new GuardedMap with values from given array.
     * Second param is optional and it`s a prefix for keys.
     * By default keys are array indexes converted to strings.
     */
    public static guardedMapFromArray<E>(array: Array<E>, keyPrefix?: string): GuardedMap<E> {
        const map = new GuardedMap<E>();
        array.forEach((el: E, i: number) => {
            map.add(keyPrefix ? i.toString() + keyPrefix : i.toString(), el);
        });
        return map;
    }


    /**
     * Map From Basic Map<E>(object)
     * 
     * @function mapFromBasicMap<E>()
     * @param object BasicMap<E>
     * @returns Map<E>
     * @description Creating new Map object from standard key: value object
     * which is described by BasicMap<E> interface. Use it to take advantage
     * from useful UtilityMap<E> methods.
     */
    public static mapFromBasicMap<E>(object: BasicMap<E>): Map<E> {
        const map = new Map<E>();
        for (let key in object) {
            map.add(key, <E> object[key]);
        }
        return map;
    }

    /**
     * Guarded Map From Basic Map<E>(object)
     * 
     * @function guardedMapFromBasicMap<E>()
     * @param object BasicMap<E>
     * @returns GuardedMap<E>
     * @description Creating new GuardedMap object from standard key: value object
     * which is described by BasicMap<E> interface. Use it to take advantage
     * from private elements and useful UtilityMap<E> methods.
     */
    public static guardedMapFromBasicMap<E>(object: BasicMap<E>): GuardedMap<E> {
        const map = new GuardedMap<E>();
        for (let key in object) {
            map.add(key, <E> object[key]);
        }
        return map;
    }
}