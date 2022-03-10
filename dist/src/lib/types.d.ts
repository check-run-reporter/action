import { Logger } from './logger';
export interface Context {
    readonly logger: Logger;
}
export declare type Optional<T> = T | undefined;
