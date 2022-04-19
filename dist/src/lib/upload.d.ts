import { Context, Optional } from './types';
interface UploadArgs {
    readonly label: Optional<string>;
    readonly report: readonly string[];
    readonly root: string;
    readonly sha: string;
    readonly token: string;
}
declare type URLs = Record<string, string>;
/**
 * Uploads directly to Check Run Reporter. This is a legacy solution that no
 * longer works for large submissions thanks to new backend architecture. It
 * remains for compatibility reasons during the transition period, but multstep
 * is the preferred method going forward.
 * @deprecated use multiStepUpload instead
 */
export declare function singleStepUpload({ label, report, root, sha, token }: UploadArgs, context: Context): Promise<import("axios").AxiosResponse<any, any>>;
/**
 * Orchestrates the multi-step upload process.
 * @param args
 * @param context
 */
export declare function multiStepUpload(args: UploadArgs, context: Context): Promise<void>;
/** Fetches signed URLs */
export declare function getSignedUploadUrls(args: UploadArgs, filenames: readonly string[], { client }: Context): Promise<{
    keys: string[];
    signature: string;
    urls: Record<string, string>;
}>;
/** Uploads directly to S3. */
export declare function uploadToSignedUrls(filenames: readonly string[], urls: URLs, { client }: Context): Promise<void>;
/**
 * Informs Check Run Reporter that all files have been uploaded and that
 * processing may begin.
 */
export declare function finishMultistepUpload(args: UploadArgs, keys: readonly string[], signature: string, { client }: Context): Promise<import("axios").AxiosResponse<any, any>>;
export {};
