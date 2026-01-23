const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

module.exports = function() {
  const resumePath = path.join(__dirname, '_resume.yaml');
  const writingPath = path.join(__dirname, 'writing.yaml');
  const speakingPath = path.join(__dirname, 'speaking.yaml');

  const resumeData = yaml.load(fs.readFileSync(resumePath, 'utf8'));
  const writingData = yaml.load(fs.readFileSync(writingPath, 'utf8'));
  const speakingData = yaml.load(fs.readFileSync(speakingPath, 'utf8'));

  // Add a helper to format dates from YYYY-MM or YYYY-MM-DD to "Mon YYYY"
  // Handles both string dates and JavaScript Date objects (YAML parser converts dates)
  function formatDate(dateStr) {
    if (!dateStr || dateStr === 'present') return 'Present';

    // Handle Date objects (YAML parser converts YYYY-MM-DD to Date)
    if (dateStr instanceof Date) {
      return dateStr.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }

    const parts = dateStr.toString().split('-');
    const year = parts[0];
    const month = parts[1] ? parseInt(parts[1]) - 1 : 0;
    const date = new Date(year, month);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }

  // Extract year from a date (handles Date objects and strings)
  function getYear(date) {
    if (date instanceof Date) {
      return date.getFullYear().toString();
    }
    return date.toString().split('-')[0];
  }

  // Format dates in experience entries
  resumeData.experience = resumeData.experience.map(job => ({
    ...job,
    startFormatted: formatDate(job.start),
    endFormatted: formatDate(job.end),
    dateRange: `${formatDate(job.start)} - ${formatDate(job.end)}`
  }));

  // Format dates in education entries
  resumeData.education = resumeData.education.map(edu => ({
    ...edu,
    startFormatted: formatDate(edu.start),
    endFormatted: formatDate(edu.end),
    dateRange: `${formatDate(edu.start)} - ${formatDate(edu.end)}`
  }));

  // Get highlighted publications from writing.yaml
  const highlightedPublications = writingData
    .filter(item => item.highlighted)
    .map(item => ({
      ...item,
      dateFormatted: formatDate(item.date),
      year: getYear(item.date)
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Get highlighted talks from speaking.yaml
  const highlightedTalks = speakingData
    .filter(item => item.highlighted)
    .map(item => ({
      ...item,
      dateFormatted: formatDate(item.date),
      year: getYear(item.date)
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  resumeData.highlightedPublications = highlightedPublications;
  resumeData.highlightedTalks = highlightedTalks;

  return resumeData;
};
