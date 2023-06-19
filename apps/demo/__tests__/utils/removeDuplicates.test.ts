import {removeDuplicates} from '../../utils/removeDuplicates';

describe('removeDuplicates', () => {
  const inputArray = [
    {key: '1', value: 'one'},
    {key: '2', value: 'two'},
    {key: '1', value: 'one-duplicate'},
    {key: '3', value: 'three'},
    {key: '2', value: 'two-duplicate'},
  ];

  const expectedAppData = [
    {key: '1', value: 'one'},
    {key: '2', value: 'two'},
    {key: '3', value: 'three'},
  ];

  const expectedRemoved = [
    {key: '1', value: 'one-duplicate'},
    {key: '2', value: 'two-duplicate'},
  ];

  it('should remove duplicates and leave the first occurrence', () => {
    const {appData} = removeDuplicates(inputArray);
    expect(appData).toEqual(expectedAppData);
  });

  it('should return the removed duplicates', () => {
    const {removed} = removeDuplicates(inputArray);
    expect(removed).toEqual(expectedRemoved);
  });

  it('should throw an error if an object in the array does not have a key property', () => {
    const arrayWithMissingKey = [...inputArray, {value: 'missing-key'}];
    // TS error is expected bc that is what we are testing.
    // @ts-ignore
    expect(() => removeDuplicates(arrayWithMissingKey)).toThrowError(
      'All objects in the input array must have a `key` property.'
    );
  });

  it('should handle empty input array', () => {
    const {appData, removed} = removeDuplicates([]);
    expect(appData).toEqual([]);
    expect(removed).toEqual([]);
  });

  it('should handle array with no duplicates', () => {
    const uniqueArray = [
      {key: '1', value: 'one'},
      {key: '2', value: 'two'},
    ];
    const {appData, removed} = removeDuplicates(uniqueArray);
    expect(appData).toEqual(uniqueArray);
    expect(removed).toEqual([]);
  });

  it('should handle array with all duplicates', () => {
    const allDuplicatesArray = [
      {key: '1', value: 'one'},
      {key: '1', value: 'one'},
      {key: '1', value: 'one'},
    ];
    const {appData, removed} = removeDuplicates(allDuplicatesArray);
    expect(appData).toEqual([{key: '1', value: 'one'}]);
    expect(removed).toEqual([
      {key: '1', value: 'one'},
      {key: '1', value: 'one'},
    ]);
  });

  it('should throw correct error message', () => {
    const arrayWithMissingKey = [{key: '1', value: 'one'}, {value: 'missing-key'}];
    try {
      // TS error is expected bc that is what we are testing.
      // @ts-ignore
      removeDuplicates(arrayWithMissingKey);
    } catch (error: any) {
      expect(error.message).toEqual(
        'All objects in the input array must have a `key` property.'
      );
    }
  });
});
