import * as fs from 'fs';
try {
  const content = fs.readFileSync('/app/.dev.env.json', 'utf-8');
  console.log(content);
} catch (err: any) {
  console.error(err.message);
}
