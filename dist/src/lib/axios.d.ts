import { AxiosResponse } from 'axios';
export declare const client: import("axios").AxiosInstance;
/**
 * extract the request id from the response object
 */
export declare function getRequestId(response: AxiosResponse): string;
