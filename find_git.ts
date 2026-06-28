import * as fs from 'fs';
import * as path from 'path';

function findGit(dir: string, visited = new Set<string>()): string[] {
  if (visited.has(dir)) return [];
  visited.add(dir);

  let results: string[] = [];
  try {
    const stats = fs.statSync(dir);
    if (!stats.isDirectory()) return [];

    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file === 'proc' || file === 'sys' || file === 'dev') continue;
      const fullPath = path.join(dir, file);
      try {
        const s = fs.statSync(fullPath);
        if (s.isDirectory()) {
          if (file === '.git') {
            results.push(fullPath);
          } else {
            results = results.concat(findGit(fullPath, visited));
          }
        }
      } catch (e) {}
    }
  } catch (err) {}
  return results;
}

console.log('Searching for any .git directory...');
console.log(findGit('/'));
