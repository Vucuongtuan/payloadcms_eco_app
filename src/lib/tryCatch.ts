import payloadConfig from "@/payload.config";
import { ResponseDocs } from "@/types";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

export type SafeResult<T> = [T, null] | [null, Error];
export type AsyncSafeResult<T> = Promise<SafeResult<T>>;

export function safe<T>(fn: () => T): SafeResult<T> {
  try {
    const result = fn();
    return [result, null];
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    return [null, err];
  }
}

export async function safeAsync<T>(fn: () => Promise<T>): AsyncSafeResult<T> {
  try {
    const result = await fn();
    return [result, null];
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    return [null, err];
  }
}

export type Result<T> = [T, null] | [null, Error];

export let payloadInstance: any = null;

export async function getPayloadInstance() {
  if (!payloadInstance) {
    payloadInstance = await getPayload({ config: payloadConfig });
  }
  return payloadInstance;
}

export async function query<T>(
  fn: (payload: any) => Promise<T>,
): Promise<Result<T>> {
  try {
    const payload = await getPayloadInstance();
    const result = await fn(payload);
    return [result, null];
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    return [null, err];
  }
}

export interface CacheOptions {
  keyParts: string[];
  tags?: string[];
  revalidate?: number | false;
}
export function queryCache<T>(
  fn: (payload: any) => Promise<T>,
  cacheOptions: CacheOptions,
): () => Promise<Result<T>> {
  return unstable_cache(
    async (): Promise<Result<T>> => {
      try {
        const payload = await getPayloadInstance();
        const result = await fn(payload);
        return [result, null];
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        return [null, err];
      }
    },
    cacheOptions.keyParts,
    {
      tags: cacheOptions.tags,
      revalidate: cacheOptions.revalidate,
    },
  );
}
