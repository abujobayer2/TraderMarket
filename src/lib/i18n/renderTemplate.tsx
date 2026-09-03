import type { ReactNode } from "react";

// Splits `template` on {key} placeholders and substitutes each with the
// matching React node from `replacements`. Lets a translated sentence put
// its inline links wherever that language's word order naturally puts them,
// instead of forcing a fixed English prefix/link/suffix sequence.
export function renderTemplate(template: string, replacements: Record<string, ReactNode>): ReactNode[] {
  const pattern = /\{(\w+)\}/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(template)) !== null) {
    if (match.index > lastIndex) {
      parts.push(template.slice(lastIndex, match.index));
    }
    const replacement = replacements[match[1]];
    parts.push(replacement !== undefined ? <span key={key++}>{replacement}</span> : match[0]);
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < template.length) {
    parts.push(template.slice(lastIndex));
  }
  return parts;
}
