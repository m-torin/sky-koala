import {NextResponse} from 'next/server';

import mockData from '#/base/public/mock_application.json';

import {getResponseData} from './getResponseData';

/**
 * Handles the request and returns the response data from the mock JSON file based on the provided filter.
 * The response also includes the execution time.
 *
 * @async
 * @function
 * @name handleRequest
 * @param {string} [filter] - The filter to select the data to be returned. Accepted values: "objects", "scenes". If not provided or doesn't match any case, the complete mock data will be returned.
 * @returns {Promise<NextResponse>} A promise that resolves to a Next.js server response containing the filtered data and the execution time, or an error message if an error occurs.
 * @example
 * // Returns a Next.js server response with the objects data and the execution time
 * handleRequest("objects");
 * @example
 * // Returns a Next.js server response with the scenes data and the execution time
 * handleRequest("scenes");
 * @example
 * // Returns a Next.js server response with the complete mock data and the execution time
 * handleRequest();
 */
const handleRequest = async (filter?: string | null): Promise<NextResponse> => {
  try {
    // Start measuring the execution time
    const startTime = process.hrtime.bigint();

    // Get the response data based on the filter
    const responseData = getResponseData(JSON.stringify(mockData), filter);

    // Calculate the elapsed time in milliseconds
    const elapsedTime = (process.hrtime.bigint() - startTime) / BigInt(1_000_000);

    // Return the Next.js server response with the filtered data and the execution time
    return NextResponse.json({
      elapsedTime: Number(elapsedTime) / 1000,
      data: responseData,
    });
  } catch (error: any) {
    // In case of any error during the execution, return the error message in the response
    return NextResponse.json({
      error: error.message,
    });
  }
};

export default handleRequest;
