import {NextResponse} from 'next/server';

import {deduplicateViews, fetchFromApi, removeDuplicates} from '#/utils/index';

/**
 * @async
 * @function handleRequest
 * @description This asynchronous function is responsible for handling a request, deduplicating
 * certain array entries, and returning a JSON response with the result and elapsed time.
 * It fetches data from an API and uses provided utilities to remove duplicates.
 * The removed duplicates and the source data are both included in the response.
 *
 * @returns {Promise<NextResponse>} Returns a Next.js server response that includes the deduplicated data and execution time.
 */
const handleRequest = async (): Promise<NextResponse> => {
  try {
    // Starting the timer to calculate the time taken to process the request.
    const startTime = process.hrtime.bigint();

    // Fetching data from the API.
    // Objects and scenes data are fetched concurrently to improve performance.
    const [objectsJson, scenesJson] = await Promise.all([
      fetchFromApi('mock?filter=objects'),
      fetchFromApi('mock?filter=scenes'),
    ]);

    // Deduplicating the objects data.
    const dedupedObjects = removeDuplicates(objectsJson.data);

    // Iterating through each scene and deduplicating the 'views' field.
    // The result of each deduplication and the removed items are tracked in an accumulator.
    const dedupedScenes = scenesJson.data.reduce(
      (accumulator: {data: any; count: number; removed: any}, element: any) => {
        const {appData, removed} = deduplicateViews(element);

        return {
          data: [
            ...accumulator.data,
            removed.length > 0 ? {...element, views: appData} : element,
          ],
          count: accumulator.count + removed.length,
          removed: [...accumulator.removed, ...removed],
        };
      },
      {
        data: [],
        count: 0,
        removed: [],
      }
    );

    // Formatting the response data.
    // It includes deduplication counts, source data, deduplicated data, and removed items.
    const responseData = {
      objects: {
        dedupCount: dedupedObjects.removed.length,
        source: objectsJson.data,
        ...dedupedObjects,
      },
      scenes: {
        dedupCount: dedupedScenes.count,
        source: scenesJson.data,
        appData: dedupedScenes.data,
        removedViews: dedupedScenes.removed,
      },
    };

    // Calculating the elapsed time in milliseconds.
    const elapsedTime = (process.hrtime.bigint() - startTime) / BigInt(1_000_000);

    // Returning the Next.js server response with the deduplicated data and the execution time.
    return NextResponse.json({
      elapsedTime: Number(elapsedTime) / 1000,
      data: responseData,
    });
  } catch (error: any) {
    // In case of any error, the error message is returned in the response.
    return NextResponse.json({error: error.message});
  }
};

export default handleRequest;
