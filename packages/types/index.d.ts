/// <reference types="@types/node" />
/// <reference types="@types/react" />
/// <reference types="@types/react-dom" />

declare module '@next/bundle-analyzer';
declare module 'next-optimized-images';

declare module '*.css';
declare module '*.svg';
declare module '*.svg?include';

/**
 * Cannot find name 'StaticImageData'. #29788
 * Workaround: https://github.com/vercel/next.js/issues/29788#issuecomment-976195723
 */
export type StaticImageData = {
  src: string;
  height: number;
  width: number;
  placeholder?: string;
};

/**
 * Infer the promise value type from a PromiseLike object
 */
export type ThenType<T> = T extends PromiseLike<infer U> ? U : T;
