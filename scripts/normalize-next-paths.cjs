const fs = require('node:fs');
const path = require('node:path');

// Next.js 14 can emit Windows separators in external module requests.
// Normalize only next/dist imports so the server bundle also runs on Linux.
function normalize(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory() && !['node_modules', 'cache'].includes(entry.name)) normalize(file);
    else if (entry.name.endsWith('.js')) {
      const original = fs.readFileSync(file, 'utf8');
      const updated = original.replace(/require\("(next\/dist[^"\r\n]*)"\)/g, (match, request) => {
        return `require("${request.replace(/\\\\/g, '/')}")`;
      });
      if (updated !== original) fs.writeFileSync(file, updated);
    }
  }
}
normalize(path.join(process.cwd(), '.next'));

