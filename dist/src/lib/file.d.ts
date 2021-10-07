import { Context } from './types';
/**
 * Wrapper around glob.sync mostly inspired by grunt.file.expand
 *
 * @param patterns - array of globs. In order to support CI systems that make
 * array inputs difficult, each pattern will be split into separate pattern if
 * it contains a semicolon.
 * @returns
 */
export declare function multiGlob(patterns: readonly string[], { logger }: Context): readonly string[];
