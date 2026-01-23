const yaml = require('js-yaml');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Generate QR code once at startup (outside the config function)
const qrPath = path.join(__dirname, 'src/assets/images/qr-code.svg');
if (!fs.existsSync(qrPath)) {
  const scriptPath = path.join(__dirname, 'scripts/generate-qr.js');
  execSync(`node "${scriptPath}"`, { stdio: 'inherit' });
}

module.exports = function(eleventyConfig) {

  // Add YAML support for data files
  eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents));

  // Pass through static assets
  eleventyConfig.addPassthroughCopy('src/assets');

  // Create a collection for blog posts sorted by date
  eleventyConfig.addCollection('blog', function(collectionApi) {
    return collectionApi.getFilteredByGlob('src/blog/*.md').sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Create collections for coding, writing, and speaking from YAML files
  eleventyConfig.addCollection('coding', function(collectionApi) {
    const codingData = collectionApi.getAll()[0]?.data?.coding || [];
    return codingData;
  });

  eleventyConfig.addCollection('writing', function(collectionApi) {
    const writingData = collectionApi.getAll()[0]?.data?.writing || [];
    return writingData;
  });

  eleventyConfig.addCollection('speaking', function(collectionApi) {
    const speakingData = collectionApi.getAll()[0]?.data?.speaking || [];
    return speakingData;
  });

  // Add limit filter for arrays
  eleventyConfig.addFilter('limit', function(arr, limit) {
    return arr.slice(0, limit);
  });

  // Add startsWith filter for nav highlighting
  eleventyConfig.addFilter('startsWith', function(str, prefix) {
    return str && str.startsWith(prefix);
  });

  // Add date formatting filter
  eleventyConfig.addFilter('dateFormat', function(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    });
  });

  // Add previous/next post navigation
  eleventyConfig.addFilter('getPreviousPost', function(collection, page) {
    const index = collection.findIndex(p => p.inputPath === page.inputPath);
    return index < collection.length - 1 ? collection[index + 1] : null;
  });

  eleventyConfig.addFilter('getNextPost', function(collection, page) {
    const index = collection.findIndex(p => p.inputPath === page.inputPath);
    return index > 0 ? collection[index - 1] : null;
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data'
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  };
};
