/**
 * Detmerins the value to send as "root".
 */
export declare function determineRoot(): string;
/**
 * Determines the SHA according the the action that triggered this workflow
 */
export declare function determineSha(): string;
/**
 * Finds all reports according to the workflow-specified glob.
 */
export declare function findReports(): Promise<string[]>;
