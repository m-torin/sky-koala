import fs from 'node:fs';
import path from 'node:path';

import {NextResponse} from 'next/server';

import {fetchFromApi} from '#/utils/index';

const handleRequest = async (filter?: string | null): Promise<NextResponse> => {
  try {
    // Start measuring the execution time
    const startTime = process.hrtime.bigint();

    // We could have called the mock json directly, but that would defeat the point of this excerise.
    const [mockData, dedupData] = await Promise.all([
      fetchFromApi('mock'),
      fetchFromApi('deduplicate'),
    ]);

    // Using destructuring to extract necessary data
    const {objects: appObjects, scenes: appScenes} = dedupData.data;

    // Assigning new values
    let appData = mockData.data;
    appData.versions[0].objects = appObjects.appData;
    appData.versions[0].scenes = appScenes.appData;

    let responseData;
    switch (filter) {
      case 'objects': {
        responseData = appObjects;
        break;
      }
      case 'scenes': {
        responseData = appScenes;
        break;
      }
      default: {
        responseData = appData;
        break;
      }
    }

    // Save appData to the /public folder per skyKoala's request
    // This method is only here for demo purposes
    const filePath = path.join(process.cwd(), 'public', 'clean_application.json');
    fs.writeFileSync(filePath, JSON.stringify(responseData, null, 2));

    const elapsedTime = (process.hrtime.bigint() - startTime) / BigInt(1_000_000);

    return NextResponse.json({
      elapsedTime: Number(elapsedTime) / 1000,
      data: responseData,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
};

export default handleRequest;
