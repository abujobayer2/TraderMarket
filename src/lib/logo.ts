export function faviconUrlFor(websiteUrl: string): string {
  const hostname = new URL(websiteUrl).hostname.replace(/^www\./, "");
  return `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
}
