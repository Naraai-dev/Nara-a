import * as fs from 'fs';
import * as path from 'path';

function findFiles(dir: string, target: string, visited = new Set<string>()): string[] {
  if (visited.has(dir)) return [];
  visited.add(dir);

  let results: string[] = [];
  try {
    const stats = fs.statSync(dir);
    if (!stats.isDirectory()) return [];

    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file === 'node_modules' || file === '.git' || file === 'proc' || file === 'sys' || file === 'dev') continue;
      const fullPath = path.join(dir, file);
      try {
        const s = fs.statSync(fullPath);
        if (s.isDirectory()) {
          results = results.concat(findFiles(fullPath, target, visited));
        } else if (file === target) {
          results.push(fullPath);
        }
      } catch (e) {}
    }
  } catch (err) {}
  return results;
}

console.log('Searching for App.tsx...');
console.log(findFiles('/', 'App.tsx'));

console.log('Searching for server.ts...');
console.log(findFiles('/', 'server.ts'));
