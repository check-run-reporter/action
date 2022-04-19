declare type LogLevel = 'debug' | 'info' | 'warn' | 'error';
/**
 * Some CI services incldue utility syntax for doing novel things with log
 * output. The Logger interfaces lets us do "the right thing" for those
 * services.
 */
export declare type Logger = Pick<Console, LogLevel | 'group' | 'groupEnd'>;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 * @see https://github.com/actions/toolkit/blob/ea81280a4d48fb0308d40f8f12ae00d117f8acb9/packages/core/src/utils.ts#L11-L18
 */
export declare function toCommandValue(input: unknown): string;
export declare const logger: Logger;
export declare const silentLogger: Logger;
export {};
