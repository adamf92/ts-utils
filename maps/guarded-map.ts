import { UtilityMap, GuardedMapElement, BasicMap, Map } from './index';

/**
 * @class GuardedMap<E>
 * @type UtilityMap<E>
 * @implements UtilityMap<E>
 * @description
 * GuardedMap<E> haven`t got standard public properties,
 * so its elements are only available by methods.
 * Thanks for that it cannot be change by mistake,
 * like Map<E> objects or standard key: value objects.
 * 
 * Beacause it implements UtilityMap<E> interface, work
 * with it is as easy as with Map<E> or even arrays.
 * 
 * Type parameter E is the type of elements.
 * All keys are type of string.
 * 
 * @author Adam Filipek
 * @version 0.2.0
 * 
 */
export class GuardedMap<E> implements UtilityMap<E> {

    private _elements: Array<GuardedMapElement<E>> = [];

    /**
     * Add(key, value)
     * 
     * @function add()
     * @param key string
     * @param value E
     * @returns void
     * @description Adds new element to GuardedMap<E>
     * @throws Error - when the key exists
     */
    public add(key: string, value: E): void {
        if (this._elements.findIndex(e => e.key === key) !== -1) {
            throw new Error(`Property '${key}' is set, use set() instead`);
        }
        this._elements.push({ key: key, value: value });
    }

    /**
     * Get(key)
     * 
     * @param key string
     * @returns E
     * @description Get value of element for given key
     * @throws Error -when the element doesn`t exists
     */
    public get(key: string): E {
        if (this._elements.findIndex(e => e.key == key) === -1) {
            throw new Error(`Property '${key}' is not set, use add(key, value) to add new element`);
        }
        return this._elements.find(e => e.key === key).value;
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
        if (this._elements.findIndex(e => e.key == key) === -1) {
            throw new Error(`Property '${key}' is not set, so cannot remove it`);
        }
        this._elements = this._elements.filter(e => e.key !== key);
    }

    /**
     * Size()
     * 
     * @function size()
     * @returns number
     * @description Returns number of elements in map (without methods)
     */
    public size(): number {
        return this._elements.length;
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
        if (this._elements.findIndex(e => e.key == key) === -1) {
            throw new Error(`Property '${key}' is not set, use add() instead`);
        }
        this._elements = this._elements.map(e => {
            if (e.key === key) {
                e.value = value;
            }
            return e;
        });
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
        for (let el of this._elements) {
            each(el.value, el.key);
        }
    }

    /**
     * To Objects Array()
     * 
     * @function toObjectsArray()
     * @returns Array<{key: string, value: E}>
     * @description Returns new Array of objects with key: string and value: E properties
     */
    public toObjectsArray(): { key: string; value: E; }[] {
        return this._elements;
    }

    /**
     * Keys To Array()
     * 
     * @function keysToArray()
     * @returns Array<string>
     * @description Returns new Array of elements keys
     */
    public keysToArray(): string[] {
        return this._elements.map(e => e.key);
    }

    /**
     * Values To Array()
     * 
     * @function valuesToArray()
     * @returns Array<E>
     * @description Returns new Array of elements values
     */
    public valuesToArray(): E[] {
        return this._elements.map(e => e.value);
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
        if (this._elements.findIndex(e => e.key === key) !== -1) {
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
     * const map = Maps.guardedMapFromBasicMap<string>(basicMap);
     * map.includes('something', (a, b) => a === b); // TRUE (=== comparation is default)
     */
    public includes(value: E, compare?: (mapEl: E, searchEl: E) => boolean): boolean {
        if (compare) {
            if (this._elements.findIndex(e => compare(e.value, value)) !== -1) {
                return true;
            }
        } else {
            if (this._elements.findIndex(e => e.value == value) !== -1) {
                return true;
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
     * const map = Maps.guardedMapFromBasicMap<string>(basicMap);
     * map.keyOf('something', (a, b) => a === b); // 'label' (=== comparation is default)
     */
    public keyOf(value: E, compare?: (mapEl: E, searchEl: E) => boolean): string {
        if (compare) {
            if (this._elements.findIndex(e => compare(e.value, value)) !== -1) {
                return this._elements.find(e => compare(e.value, value)).key;
            }
        } else {
            if (this._elements.findIndex(e => e.value == value) !== -1) {
                return this._elements.find(e => e.value == value).key;
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
            if (this.includesKey(key)) {
                if (replace) {
                    this.set(key, value);
                }
            } else {
                this.add(key, value);
            }
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
            if (!this.includesKey(key)) return false;
            // compare value
            if (this.get(key) !== value) return false;
        });
        return true;
    }

    /**
     * To JSON()
     * 
     * @function toJSON()
     * @returns string
     * @description Converting guarded map to JSON string
     */
    public toJSON(): string {
        return JSON.stringify(this.toBasicMap());
    }

    /**
     * To Basic Map()
     * 
     * @function toBasicMap()
     * @returns BasicMap<E>
     * @description Converting guarded map to standard key: value object
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
     * To Map()
     * 
     * @function toMap()
     * @returns Map<E>
     * @description converting guarded map to Map
     */
    public toMap(): Map<E> {
        let map: Map<E> = new Map<E>();
        if (this.size() === 0) {
            return map;
        }
        this.forEach((value, key) => {
            map.add(key, value);
        });
        return map;
    }
}
