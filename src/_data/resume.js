const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

module.exports = function() {
  const resumePath = path.join(__dirname, 'resume.yaml');
  const resumeData = yaml.load(fs.readFileSync(resumePath, 'utf8'));

  // Add a helper to format dates from YYYY-MM to "Mon YYYY"
  function formatDate(dateStr) {
    if (!dateStr || dateStr === 'present') return 'Present';
    const [year, month] = dateStr.split('-');
    const date = new Date(year, parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
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

  return resumeData;
};
