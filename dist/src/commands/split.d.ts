import { Context } from '../lib/types';
interface SplitArgs {
    /** list of filenames or globs that match all available test files */
    readonly tests: readonly string[];
    readonly label: string;
    readonly nodeCount: number;
    readonly nodeIndex: number;
    readonly token: string;
}
/**
 * Send the full list of available test files and get back the filees
 * appropriate to this node.
 */
export declare function split({ tests, label, nodeCount, nodeIndex, token }: SplitArgs, context: Context): Promise<any>;
export {};
