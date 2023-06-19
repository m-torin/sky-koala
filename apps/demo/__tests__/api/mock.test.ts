import {getResponseData} from '../../app/api/mock/getResponseData';
import mockData from '../../public/mock_application.json';

/**
 * Unit tests for apiMock getResponseData function.
 */
describe('getResponseData function', () => {
  /**
   * Test that verifies the function returns the objects data when
   * the filter is "objects".
   */
  it('returns the objects data if filter is "objects"', () => {
    const expected = mockData.versions[0].objects;
    const result = getResponseData(JSON.stringify(mockData), 'objects');
    expect(result).toEqual(expected);
  });

  /**
   * Test that verifies the function returns the scenes data when
   * the filter is "scenes".
   */
  it('returns the scenes data if filter is "scenes"', () => {
    const expected = mockData.versions[0].scenes;
    const result = getResponseData(JSON.stringify(mockData), 'scenes');
    expect(result).toEqual(expected);
  });

  /**
   * Test that verifies the function returns the complete mock data when
   * the filter is not provided or doesn't match any case.
   */
  it("returns the complete mock data if filter is not provided or doesn't match any case", () => {
    const result = getResponseData(JSON.stringify(mockData));
    expect(result).toEqual(mockData);

    const resultWithInvalidFilter = getResponseData(
      JSON.stringify(mockData),
      'invalidFilter'
    );
    expect(resultWithInvalidFilter).toEqual(mockData);
  });
});
