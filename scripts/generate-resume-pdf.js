const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { execSync } = require('child_process');

// Paths
const rootDir = path.join(__dirname, '..');
const dataPath = path.join(rootDir, 'src/_data/resume.yaml');
const socialPath = path.join(rootDir, 'src/_data/social.yaml');
const templatePath = path.join(rootDir, 'templates/resume.typ');
const outputDir = path.join(rootDir, 'src/assets');
const outputPath = path.join(outputDir, 'olivia-buzek-resume.pdf');

// Load resume data
const resumeData = yaml.load(fs.readFileSync(dataPath, 'utf8'));
const socialData = yaml.load(fs.readFileSync(socialPath, 'utf8'));

// Extract social links
const socialLinks = {};
for (const social of socialData) {
  socialLinks[social.icon] = social.url;
}

// Format date from YYYY-MM to "Mon YYYY"
function formatDate(dateStr) {
  if (!dateStr || dateStr === 'present') return 'Present';
  const [year, month] = dateStr.split('-');
  const date = new Date(year, parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

// Generate competencies as inline text
function generateCompetencies(competencies) {
  return competencies.join('  |  ');
}

// Generate experience section
function generateExperience(experience) {
  return experience.map(job => {
    const dates = `${formatDate(job.start)} - ${formatDate(job.end)}`;
    const highlights = job.highlights.map(h => `- ${h}`).join('\n');
    return `#experience-entry[${job.title}][${job.company}][${dates}]
${highlights}
`;
  }).join('\n');
}

// Generate education section (institution first)
function generateEducation(education) {
  return education.map(edu => {
    const dates = `${formatDate(edu.start)} - ${formatDate(edu.end)}`;
    let entry = `#education-entry[${edu.institution}][${edu.degree}][${edu.location}][${dates}]`;
    if (edu.note) {
      entry += `\n${edu.note}`;
    }
    return entry;
  }).join('\n\n');
}

// Generate skills section
function generateSkills(skills) {
  const lines = [];
  if (skills.languages) {
    lines.push(`*Languages:* ${skills.languages.join(', ')}`);
  }
  if (skills.ml_ai) {
    lines.push(`*ML/AI:* ${skills.ml_ai.join(', ')}`);
  }
  if (skills.infrastructure) {
    lines.push(`*Infrastructure:* ${skills.infrastructure.join(', ')}`);
  }
  if (skills.practices) {
    lines.push(`*Practices:* ${skills.practices.join(', ')}`);
  }
  return lines.join('\n\n');
}

// Generate awards section
function generateAwards(awards) {
  return awards.map(a => `- ${a.name}, ${a.year}`).join('\n');
}

// Read template and replace placeholders
let template = fs.readFileSync(templatePath, 'utf8');

const replacements = {
  '{{NAME}}': resumeData.name,
  '{{HEADLINE}}': resumeData.headline,
  '{{EMAIL}}': resumeData.email,
  '{{LOCATION}}': resumeData.location,
  '{{WEBSITE}}': resumeData.website,
  '{{LINKEDIN}}': socialLinks.linkedin || resumeData.linkedin,
  '{{GITHUB}}': socialLinks.github || '',
  '{{YOUTUBE}}': socialLinks.youtube || '',
  '{{SUMMARY}}': resumeData.summary.trim(),
  '{{COMPETENCIES}}': generateCompetencies(resumeData.competencies),
  '{{EXPERIENCE}}': generateExperience(resumeData.experience),
  '{{EDUCATION}}': generateEducation(resumeData.education),
  '{{SKILLS}}': generateSkills(resumeData.skills),
  '{{AWARDS}}': generateAwards(resumeData.awards),
};

for (const [placeholder, value] of Object.entries(replacements)) {
  template = template.replaceAll(placeholder, value);
}

// Write temporary .typ file
const tempTypPath = path.join(rootDir, 'templates/resume-generated.typ');
fs.writeFileSync(tempTypPath, template);

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Compile with Typst
try {
  execSync(`typst compile "${tempTypPath}" "${outputPath}"`, { stdio: 'inherit' });
  console.log(`\nResume PDF generated: ${outputPath}`);
} catch (error) {
  console.error('Failed to generate PDF:', error.message);
  process.exit(1);
} finally {
  // Clean up temp file
  if (fs.existsSync(tempTypPath)) {
    fs.unlinkSync(tempTypPath);
  }
}
