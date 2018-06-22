# ts-utils
OOP Utils for TypeScript
##### version 0.3.1
## Maps
### Map<E>
Generic collection class for key: value objects in TypeScript.
It contains set of usefull methods like forEach() or includes() which makes work with key: value objects
as easy as work with arrays
### GuardedMap<E>
Generic collection class for key: value objects, based on the same UtilityMap<E> interface as Map<E>.
Main difference is that in GuardedMap<E>, you have access to values only with get(key) and set(key, value) methods.
It prevents accidental overwriting of values in map.
### Maps
Class with static factory methods to create Map<E> or GuardedMap<E> without values or from arrays or objects
  
###### Documentation will be published soon
