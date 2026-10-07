/** True for absolute http(s) URLs, which open in a new tab; internal routes
 *  and mailto: links do not. */
export const isExternalUrl = (url: string): boolean => /^https?:\/\//.test(url);
