import yaml from 'js-yaml';

const parsedFile = (file, extFile) => {
  if (extFile === '.json') {
    return JSON.parse(file);
  }
  return yaml.load(file);
};

export default parsedFile;
