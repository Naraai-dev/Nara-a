import * as fs from 'fs';
import * as path from 'path';

console.log('Listing /app/control-plane-api:');
try {
  const files = fs.readdirSync('/app/control-plane-api');
  console.log(files);
} catch (err: any) {
  console.error(err.message);
}
