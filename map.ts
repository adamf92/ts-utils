/**
 * @class Map<E>
 * @type IMap<E>
 * @implements interface IMap<E>
 * @description
 * Type parameter E is the type of elements.
 * All keys are type of string.
 * It`s generic collection class for key: value objects
 * with some utils which make working with it easy as
 * working with arrays.
 * 
 * @author Adam Filipek
 * @version 0.1.0
 * 
 */
export class Map<E> implements IMap<E> {

    /**
     * @property [key]
     * @description Definition of Map elements
     * In definition type Function too,
     * but it`s declared only to allow
     * methods declaration. In methods like add()
     * or remove() there`s only E type available.
     * @type E
     */
    [key: string]: E | Function;

    /**
     * Add(key, value)
     * 
     * @function add()
     * @param key string
     * @param value E
     * @returns void
     * @description Adds new element to Map<E>
     * @throws Error - when the key exists
     */
    public add(key: string, value: E): void {
        if (this[key]) throw new Error(`Property '${key}' is set, use set() instead`);
        this[key] = value;
    }

    /**
     * Remove(key)
     * 
     * @function remove()
     * @param key string
     * @returns void
     * @description Removes element with specified key from map
     * @throws Error - when the key doesn`t exists
     */
    public remove(key: string): void {
        if (!this[key]) throw new Error(`Property '${key}' is not set, so cannot remove it`);
        delete this[key];
    }

    /**
     * Size()
     * 
     * @function size()
     * @returns number
     * @description Returns number of elements in map (without methods)
     */
    public size(): number {
        let count: number = 0;
        for(let key in this) {
            if (typeof this[key] !== 'function') {
                count++;
            }
        }
        return count;
    }

    /**
     * Set(key, value)
     *
     * @function set()
     * @param key string
     * @param value E
     * @returns void
     * @description Changes the value of element with given key
     * @throws Error - when the key doesn`t exists
     */
    public set(key: string, value: E): void {
        if (!this[key]) throw new Error(`Property '${key}' is not set, use add() instead`);
        this[key] = value;
    }

    /**
     * For Each(each)
     * 
     * @function forEach()
     * @param each (element: E, key?: string) => void
     * @returns void
     * @description Executing given function for every element in map
     */
    public forEach(each: (element: E, key?: string) => void): void {
        for(let key in this) {
            if (typeof this[key] !== 'function') {
                each(<E> this[key], <string> key);
            }
        }
    }

    /**
     * To Objects Array()
     * 
     * @function toObjectsArray()
     * @returns Array<{key: string, value: E}>
     * @description Returns new Array of objects with key: string and value: E properties
     */
    public toObjectsArray(): Array<{key: string, value: E}> {
        let result: Array<{key: string, value: E}> = [];
        for(let key in this) {
            if (typeof this[key] !== 'function') {
                result.push({key: key, value: <E> this[key]});
            }
        }
        return result;
    }

    /**
     * Keys To Array()
     * 
     * @function keysToArray()
     * @returns Array<string>
     * @description Returns new Array of elements keys
     */
    public keysToArray(): Array<string> {
        let result: Array<string> = [];
        for(let key in this) {
            if (typeof this[key] !== 'function') {
                result.push(key);
            }
        }
        return result;
    }

    /**
     * Values To Array()
     * 
     * @function valuesToArray()
     * @returns Array<E>
     * @description Returns new Array of elements values
     */
    public valuesToArray(): Array<E> {
        let result: Array<E> = [];
        for(let key in this) {
            if (typeof this[key] !== 'function') {
                result.push(<E> this[key]);
            }
        }
        return result;
    }

    /**
     * Includes Key (key)
     * 
     * @function includesKey()
     * @param key string
     * @returns boolean
     * @description Returns true if map has given key
     */
    public includesKey(key: string): boolean {
        if (this[key]) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Includes(value, compare?)
     * 
     * @function includes()
     * @param value E
     * @param compare(optional) (mapEl: E, searchEl: E) => boolean
     * @returns boolean
     * @description Returns true if map has given value.
     * Second param is optional and it`s a compare function
     * which takes map element value and search element value
     * as params and returns true if they are equal.
     * Default compare method is === operator.
     * @example
     * basicMap = { label: 'something', ll: 'something2' }
     * const map = Maps.fromMapLikeObject<string>(basicMap);
     * map.includes('something', (a, b) => a === b); // TRUE (=== comparation is default)
     */
    public includes(value: E, compare?: (mapEl: E, searchEl: E) => boolean): boolean {
        for (let key in this) {
            if (typeof this[key] !== 'function') {
                if (compare && compare(<E> this[key], value)) {
                    return true;
                } else if (<E> this[key] === value) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Key Of (value, compare?)
     *
     * @function keyOf()
     * @param value E
     * @param compare(optional) (mapEl: E, searchEl: E) => boolean
     * @returns string | null
     * @description Returns key of element for given value.
     * Second param is optional and it`s a compare function
     * which takes map element value and search element value
     * as params and returns true if they are equal.
     * Default compare method is === operator.
     * @example
     * basicMap = { label: 'something', ll: 'something2' }
     * const map = Maps.fromMapLikeObject<string>(basicMap);
     * map.keyOf('something', (a, b) => a === b); // 'label' (=== comparation is default)
     */
    public keyOf(value: E, compare?: (mapEl: E, searchEl: E) => boolean): string {
        for (let key in this) {
            if (typeof this[key] !== 'function') {
                if (compare && compare(<E> this[key], value)) {
                    return key;
                } else if (<E> this[key] === value) {
                    return key;
                }
            }
        }
        return null;
    }

    /**
     * Concat(otherMap, replace?)
     * 
     * @function concat()
     * @param otherMap BasicMap<E>
     * @param replace boolean = false
     * @returns void
     * @description Adding other map elements to current map.
     * By default, if the other map key exists in current map
     * it will not change. When replace param is set to true,
     * then the current map element will be replaced be other
     * map element
     */
    public concat(otherMap: BasicMap<E>, replace: boolean = false): void {
        for (let key in otherMap) {
            this[key] = replace ? otherMap[key] : this[key];
        }
    }
}

/**
 * @class Maps
 * @description
 * Class with static generic factory methods to create Map<E> objects
 * 
 * @author Adam Filipek
 * @version 0.1.0
 */
export class Maps {

    /**
     * Create<E>()
     * 
     * @function create<E>()
     * @returns Map<E>
     * @description Creating new empty Map
     */
    public static create<E>(): Map<E> {
        return new Map<E>();
    }

    /**
     * From Array<E> (array, keyPrefix)
     * 
     * @function fromArray<E>()
     * @param array Array<E>
     * @param keyPrefix(optional) string
     * @returns Map<E>
     * @description Creating new Map with values from given array.
     * Second param is optional and it`s a prefix for keys.
     * By default keys are array indexes converted to strings.
     */
    public static fromArray<E>(array: Array<E>, keyPrefix?: string): Map<E> {
        const map = new Map<E>();
        array.forEach((el: E, i: number) => {
            map.add(keyPrefix ? i.toString() + keyPrefix : i.toString(), el);
        });
        return map;
    }

    /**
     * From Map Like Object<E>(object)
     * 
     * @function fromMapLikeObject()
     * @param object BasicMap<E>
     * @returns Map<E>
     * @description Creating new Map object from standard key: value object
     * which is described by BasicMap<E> interface. Use it to take advantage
     * from useful Map<E> methods.
     */
    public static fromMapLikeObject<E>(object: BasicMap<E>): Map<E> {
        const map = new Map<E>();
        for (let key in object) {
            map.add(key, <E> object[key]);
        }
        return map;
    }
}

/**
 * Interface BasicMap<E>
 *
 * Type parameter E is the type of elements.
 * All keys are type of string.
 *
 * It`s shorthand interface for map like objects.
 */
export interface BasicMap<E> {
    [key: string]: E | Function;
}

/**
 * Interface IMap<E>
 * 
 * Type parameter E is the type of elements.
 * All keys are type of string.
 * 
 * It`s declaration of Map<E> methods.
 * 
 * @extends BasicMap<E>
 * 
 */
export interface IMap<E> extends BasicMap<E> {
    add(key: string, value: E): void;
    remove(key: string): void;
    size(): number;
    set(key: string, value: E): void;
    forEach(each: (element: E, key?: string) => void): void;
    toObjectsArray(): Array<{key: string, value: E}>;
    keysToArray(): Array<string>;
    valuesToArray(): Array<E>
    includesKey(key: string): boolean;
    includes(value: E, compare?: (mapEl: E, searchEl: E) => boolean): boolean;
    keyOf(value: E, compare?: (mapEl: E, searchEl: E) => boolean): string;
    concat(otherMap: BasicMap<E>): void;
}
