/**
 * Returns the relevant data from the mock JSON file based on the provided filter.
 *
 * @function
 * @name getResponseData
 * @param {string|null} [filter] - The filter to select the data to be returned. Accepted values: "objects", "scenes". If not provided or doesn't match any case, the complete mock data will be returned.
 * @returns {Object} The relevant data from the mock JSON file based on the filter.
 * @example
 * // Returns the objects data from the mock JSON file
 * getResponseData("objects");
 * @example
 * // Returns the scenes data from the mock JSON file
 * getResponseData("scenes");
 * @example
 * // Returns the complete mock data
 * getResponseData();
 */
export const getResponseData = (mockData: any, filter?: string | null): object => {
  const parsedData = JSON.parse(mockData);

  // Depending on the filter, select the relevant data to be returned
  switch (filter) {
    case 'objects': {
      // If the filter is "objects", return the objects data
      return parsedData.versions[0].objects;
    }
    case 'scenes': {
      // If the filter is "scenes", return the scenes data
      return parsedData.versions[0].scenes;
    }
    default: {
      // If there is no filter or the filter doesn't match any case, return the complete mock data
      return parsedData;
    }
  }
};
