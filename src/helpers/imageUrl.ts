export const formatUrl = (url: string): string => {
  return url.replace(/^{"|"}$/g, '');
}