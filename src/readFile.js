import path from 'path';
import fs from 'fs';

const readFile = (pathToFile) => {
  const fullPath = path.resolve(process.cwd(), pathToFile);
  const data = fs.readFileSync(fullPath, 'utf-8');
  return data;
};

export default readFile;
