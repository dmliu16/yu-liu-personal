import { rename, readFile, readdir, access, writeFile } from 'node:fs/promises';
import path from 'node:path';

// GitHub supplies the repository prefix in the URL, so the artifact itself
// must start at the site root rather than contain another repository folder.
const prefix = process.env.NEXT_PUBLIC_SITE_PREFIX;
if (prefix !== '/yu-liu-personal') throw new Error('Unexpected GitHub Pages prefix');
const root = path.resolve('dist/client');
await rename(path.join(root, prefix.slice(1), '_next'), path.join(root, '_next'));
await writeFile(path.join(root, '.nojekyll'), '');
for (const file of (await readdir(root)).filter(name => name.endsWith('.html'))) {
  const html = await readFile(path.join(root, file), 'utf8');
  for (const [, value] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (!value.startsWith('/') || value.startsWith('//')) continue;
    if (!value.startsWith(prefix + '/')) throw new Error(`${file}: unprefixed URL ${value}`);
    const relative = new URL(value, 'https://example.org').pathname.slice(prefix.length + 1);
    await access(path.join(root, relative || 'index.html'));
  }
}
console.log('GitHub Pages: all exported page links and assets verified.');
