// JSON.stringify does not escape "<", ">", or "&" — a firm name or
// description containing "</script><script>…" would otherwise break out of
// the JSON-LD <script> tag and execute as HTML/JS in every visitor's
// browser. Escaping those to their \uXXXX forms keeps the JSON semantically
// identical while making it impossible to close the surrounding tag.
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
