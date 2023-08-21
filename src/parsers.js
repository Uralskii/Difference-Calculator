import yaml from 'js-yaml';
import path from 'path';

const parseFile = (file, pathToFile) => {
  const extFile = path.extname(pathToFile);
  switch (extFile) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
      return yaml.load(file);
    case '.yaml':
      return yaml.load(file);
    default:
      throw new Error(`Unknown extension '${extFile}'!`);
  }
};

export default parseFile;
