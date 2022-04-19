import { AxiosInstance } from 'axios';
import { Logger } from './logger';
export interface Context {
    readonly logger: Logger;
    readonly client: AxiosInstance;
}
export declare type Optional<T> = T | undefined;
