import {NextRequest, NextResponse} from 'next/server';

import handleRequest from './handleRequest';

/**
 * Handles HTTP GET requests.
 * @param {NextRequest} request - The incoming HTTP request.
 * @returns {Promise<NextResponse>} The HTTP response.
 */
export async function GET(_request: NextRequest): Promise<NextResponse> {
  return await handleRequest();
}

/**
 * Handles HTTP POST requests.
 * @param {NextRequest} _request - The incoming HTTP request.
 * @returns {Promise<NextResponse>} The HTTP response.
 */
export async function POST(_request: NextRequest): Promise<NextResponse> {
  return await handleRequest();
}
