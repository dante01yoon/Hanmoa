const UNSAFE_CHARS_REGEXP = /["&<]/g;

const ESCAPED_CHARS: { [key: string]: string} = {
  '"': "&quot;",
  "&": "&amp;",
  "<": "&lt;",
};

function escapeUnsafeChar(unsafeChar: string): string{
  return ESCAPED_CHARS[unsafeChar];
}

export default function escapeForHtmlAttribute(string: string): string {
  return string.replace(UNSAFE_CHARS_REGEXP, escapeUnsafeChar);
}