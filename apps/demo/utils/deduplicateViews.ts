import type {ObjectWithKey} from '#/types/utils';

import {removeDuplicates} from './removeDuplicates';

/**
 * Defines the return type of deduplicateViews function.
 * @interface DeduplicatedViewsResult
 */
export interface DeduplicatedViewsResult<T> {
  appData: T;
  removed: ObjectWithKey[];
}

/**
 * Applies the `removeDuplicates` function to the `views` array of an object, if it exists.
 * @function deduplicateViews
 * @template T
 * @param {T} object - The input object.
 * @returns {DeduplicatedViewsResult<T>} - The input object with the `views` array deduplicated, if it exists, and the removed views.
 */
export const deduplicateViews = <
  T extends ObjectWithKey & {views?: ObjectWithKey[]}
>(
  object: T
): DeduplicatedViewsResult<T> => {
  let removed: ObjectWithKey[] = [];

  if (object.views) {
    const {appData: deduplicatedViews, removed: removedViews} = removeDuplicates(
      object.views
    );

    // If views were removed, add them to the 'removed' array.
    if (removedViews.length > 0) {
      removed = [...removedViews];
    }

    object.views = deduplicatedViews; // Deduplicated views are in the final object
  }

  return {
    appData: object,
    removed,
  };
};
