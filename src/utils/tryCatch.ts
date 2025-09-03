import payloadConfig from "@/payload.config";
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

export async function query<T>(fn: (payload: any) => Promise<T>): Promise<Result<T>> {
  try {
    const payload = await getPayloadInstance();
    const result = await fn(payload);
    return [result, null];
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    return [null, err];
  }
}