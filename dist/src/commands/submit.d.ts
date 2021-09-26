import { Logger } from '../lib/logger';
declare type Optional<T> = T | undefined;
interface SubmitArgs {
    readonly label: Optional<string>;
    readonly report: readonly string[];
    readonly root: string;
    readonly sha: string;
    readonly token: string;
    readonly url: string;
}
interface Context {
    readonly logger: Logger;
}
/**
 * Submit report files to Check Run Reporter
 */
export declare function submit({ label, report, root, sha, token, url }: SubmitArgs, context: Context): Promise<void>;
export {};
