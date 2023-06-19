import {deduplicateViews} from '../../utils/deduplicateViews';
import {removeDuplicates} from '../../utils/removeDuplicates';

jest.mock('../../utils/removeDuplicates');

describe('deduplicateViews', () => {
  it('should return original object and an empty array if no views', () => {
    const object = {
      key: 'Test',
      otherKey: 'Other',
    };
    const expected = {
      appData: object,
      removed: [],
    };
    expect(deduplicateViews(object)).toEqual(expected);
  });

  it('should return original object and an empty array if views but no duplicates', () => {
    const object = {
      key: 'Test',
      views: [
        {key: 'view1', id: 1, name: 'View 1'},
        {key: 'view2', id: 2, name: 'View 2'},
      ],
    };
    // Mock removeDuplicates function to return no duplicates.
    (removeDuplicates as jest.Mock).mockReturnValue({
      appData: object.views,
      removed: [],
    });
    const expected = {
      appData: object,
      removed: [],
    };
    expect(deduplicateViews(object)).toEqual(expected);
  });

  it('should return object with deduplicated views and array of removed views if duplicates exist', () => {
    const object = {
      key: 'Test',
      views: [
        {key: 'key1', id: 1, name: 'View 1'}, // added 'key' property
        {key: 'key2', id: 1, name: 'View 1'}, // added 'key' property
      ],
    };
    const deduplicatedViews = [{key: 'key1', id: 1, name: 'View 1'}]; // added 'key' property
    const removedViews = [{key: 'key2', id: 1, name: 'View 1'}]; // added 'key' property
    // Mock removeDuplicates function to return deduplicated views and removed views.
    (removeDuplicates as jest.Mock).mockReturnValue({
      appData: deduplicatedViews,
      removed: removedViews,
    });
    const expected = {
      appData: {
        key: 'Test',
        views: deduplicatedViews,
      },
      removed: removedViews,
    };
    expect(deduplicateViews(object)).toEqual(expected);
  });
});
