import { BasicMap, UtilityMap, GuardedMap } from './index';

/**
 * @class Map<E>
 * @type UtilityMap<E>
 * @implements UtilityMap<E>, BasicMap<E>
 * @description
 * Type parameter E is the type of elements.
 * All keys are type of string.
 * It`s generic collection class for key: value objects
 * with some utils which make working with it easy as
 * working with arrays.
 * 
 * Because it implements BasicMap<E> interface, you can
 * use it everywhere you use standard key: value objects.
 * 
 * You can create Map<E> by Maps factory methods or
 * new Map<E>, by Maps factory method is a recommended way.
 * 
 * 
 * @author Adam Filipek
 * @version 0.2.0
 * 
 */
export class Map<E> implements UtilityMap<E>, BasicMap<E> {

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
     * Get(key)
     * 
     * @param key string
     * @returns E
     * @description Get value of element for given key
     * @throws Error -when the element doesn`t exists or when the element is function
     */
    public get(key: string): E {
        if (!this[key]) throw new Error(`Property '${key}' is not set, use add(key, value) to add new element`);
        if (typeof this[key] == 'function') throw new Error(`Property '${key}' is a function`);
        return <E> this[key];
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
     * const map = Maps.mapFromBasicMap<string>(basicMap);
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
     * @param otherMap UtilityMap<E>
     * @param replace boolean = false
     * @returns void
     * @description Adding other map elements to current map.
     * By default, if the other map key exists in current map
     * it will not change. When replace param is set to true,
     * then the current map element will be replaced be other
     * map element
     */
    public concat(otherMap: UtilityMap<E>, replace: boolean = false): void {
        otherMap.forEach((value, key) => {
            this[key] = replace ? value : this[key]; 
        });
    }

    /**
     * Equals(otherMap)
     *
     * @function equals()
     * @param otherMap UtilityMap<E>
     * @returns boolean
     * @description Checking if other map is equal to current map.
     * Other map could be both GuardedMap<E> or Map<E>
     */
    public equals(otherMap: UtilityMap<E>): boolean {
        // compare size
        if (this.size() !== otherMap.size()) return false;
        otherMap.forEach((value, key) => {
            // compare key
            if (!this[key]) return false;
            // compare value
            if (this[key] !== value) return false;
        });
        return true;
    }

    /**
     * To JSON()
     * 
     * @function toJSON()
     * @returns string
     * @description Converting map to JSON string
     */
    public toJSON(): string {
        return JSON.stringify(this.toBasicMap());
    }

    /**
     * To Basic Map()
     * 
     * @function toBasicMap()
     * @returns BasicMap<E>
     * @description Converting map to standard key: value object
     */
    public toBasicMap(): BasicMap<E> {
        let basic: BasicMap<E> = {};
        if (this.size() === 0) {
            return basic;
        }
        this.forEach((value, key) => {
            basic[key] = value;
        });
        return basic;
    }

    /**
     * To Guarded Map()
     * 
     * @function toGuardedMap()
     * @returns GuardedMap<E>
     * @description Converting map to GuardedMap
     */
    public toGuardedMap(): GuardedMap<E> {
        let guarded: GuardedMap<E> = new GuardedMap<E>();
        if (this.size() === 0) {
            return guarded;
        }
        this.forEach((value, key) => {
            guarded.add(key, value);
        });
        return guarded;
    }
}
