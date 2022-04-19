import 'axios-debug-log';
import { AxiosInstance, AxiosResponse } from 'axios';
/**
 * Creates a new http client with configuration
 */
export declare function makeClient({ hostname }: {
    hostname?: string;
}): AxiosInstance;
/**
 * extract the request id from the response object
 */
export declare function getRequestId(response: AxiosResponse): string;
