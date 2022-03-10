import { Context, Optional } from '../lib/types';
interface SubmitArgs {
    readonly label: Optional<string>;
    readonly report: readonly string[];
    readonly root: string;
    readonly sha: string;
    readonly token: string;
    readonly url: string;
}
/**
 * Submit report files to Check Run Reporter
 */
export declare function submit(input: SubmitArgs, context: Context): Promise<void>;
export {};
