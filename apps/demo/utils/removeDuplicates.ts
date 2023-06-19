import type {ObjectWithKey} from '#/types/utils';

/**
 * Defines the return type of removeDuplicates function.
 * @interface RemovedDuplicatesResult
 */
export interface RemovedDuplicatesResult<T> {
  appData: T[];
  removed: T[];
}

/**
 * Removes objects with duplicate `key` values from an array, except for the first occurrence of each `key` value.
 * @function removeDuplicates
 * @template T
 * @param {T[]} inputArray - The input array of objects.
 * @returns {RemovedDuplicatesResult<T>} - An object with the deduplicated array and the removed duplicates.
 */
export const removeDuplicates = <T extends ObjectWithKey>(
  inputArray: T[]
): RemovedDuplicatesResult<T> => {
  const seenKeys: Set<string> = new Set<string>();
  let removed: T[] = [];

  // Filter the input array, keeping only the first occurrence of each key.
  const appData = inputArray.filter((obj) => {
    // Check if the object has a `key` property.
    if (!Object.prototype.hasOwnProperty.call(obj, 'key')) {
      throw new Error('All objects in the input array must have a `key` property.');
    }

    // If the key has already been seen, add the object to the removed array.
    if (seenKeys.has(obj.key)) {
      removed.push(obj);
      return false;
    }

    // If the key hasn't been seen, add it to the seenKeys set.
    seenKeys.add(obj.key);
    return true;
  });

  return {
    appData,
    removed,
  };
};
