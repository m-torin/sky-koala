import {NextRequest, NextResponse} from 'next/server';

import handleRequest from './handleRequest';

/**
 * Handles HTTP GET requests.
 * @param {NextRequest} request - The incoming HTTP request.
 * @returns {Promise<NextResponse>} The HTTP response.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const {searchParams} = new URL(request.url);
  const filter = searchParams.get('filter');

  return await handleRequest(filter);
}

/**
 * Handles HTTP POST requests.
 * @param {NextRequest} _request - The incoming HTTP request.
 * @returns {Promise<NextResponse>} The HTTP response.
 */
export async function POST(_request: NextRequest): Promise<NextResponse> {
  return await handleRequest();
}
