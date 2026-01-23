// Load GitHub data from cached YAML file
// Run `npm run fetch-github` to update the cache
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

module.exports = function() {
  const cachePath = path.join(__dirname, '_github.yaml');

  if (fs.existsSync(cachePath)) {
    const data = yaml.load(fs.readFileSync(cachePath, 'utf8'));
    return data;
  }

  console.warn('github.yaml not found. Run `npm run fetch-github` to generate it.');
  return { repos: [] };
};
