import { GuardedMap, Map } from './index';

/**
 * @interface BasicMap<E>
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
 * @interface UtilityMap<E>
 * 
 * Type parameter E is the type of elements.
 * All keys are type of string.
 * 
 * It`s declaration of Map<E> methods.
 * 
 */
export interface UtilityMap<E> {
    add(key: string, value: E): void;
    get(key: string): E;
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
    concat(otherMap: UtilityMap<E>, replace: boolean): void;
    equals(otherMap: UtilityMap<E>): boolean;
    every(test: (element: E, key?: string, thisMap?: UtilityMap<E>) => boolean): boolean;
    some(test: (element: E, key?: string, thisMap?: UtilityMap<E>) => boolean): boolean;
    toJSON(): string; 
    toBasicMap?(): BasicMap<E>;
    toGuardedMap?(): GuardedMap<E>;
    toMap?(): Map<E>;
}

/**
 * @interface GuardedMapElement<E>
 * 
 * Element of guarded map
 */
export interface GuardedMapElement<E> {
    key: string;
    value: E;
}

