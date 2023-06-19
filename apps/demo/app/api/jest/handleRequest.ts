import {runCLI} from 'jest';
import {NextResponse} from 'next/server';

interface JestConfig {
  passWithNoTests: boolean;
  silent: boolean;
  json: boolean;
  testMatch: string[];
}

/**
 * Handles the request by running a Jest test.
 * @returns {Promise<NextResponse>} The HTTP response.
 */
const handleRequest = async (): Promise<NextResponse> => {
  // Intentionally does not use `jest.config.js` because of time constraints.
  const jestConfig: JestConfig = {
    passWithNoTests: true,
    silent: true,
    json: true,
    testMatch: ['<rootDir>/**/*.test.(ts|tsx|js|jsx)'],
  };

  const {results} = await runCLI(jestConfig as any, ['.']);

  return results.success
    ? NextResponse.json({message: 'All tests passed', results})
    : NextResponse.json({message: 'Tests failed', results, status: 500});
};

export default handleRequest;
