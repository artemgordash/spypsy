export function removeURLParams(url: string) {
  const urlObject = new URL(url);

  urlObject.search = '';

  return urlObject.toString();
}
