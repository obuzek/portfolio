// Fetch pinned repositories from GitHub and cache to YAML
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const GITHUB_USERNAME = 'obuzek';

async function fetchGitHubData() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.error('GITHUB_TOKEN not set. Please set it in .env file.');
    process.exit(1);
  }

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              url
              description
              primaryLanguage {
                name
              }
              repositoryTopics(first: 10) {
                nodes {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      console.error(`GitHub GraphQL API returned ${response.status}`);
      process.exit(1);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GitHub GraphQL errors:', data.errors);
      process.exit(1);
    }

    const pinnedRepos = data.data.user.pinnedItems.nodes.map(repo => ({
      title: repo.name,
      url: repo.url,
      description: repo.description || 'No description provided',
      language: repo.primaryLanguage?.name || null,
      topics: repo.repositoryTopics.nodes.map(t => t.topic.name),
    }));

    // Write to YAML file
    const outputPath = path.join(__dirname, '../src/_data/_github.yaml');
    const yamlContent = yaml.dump({ repos: pinnedRepos }, { lineWidth: -1 });
    fs.writeFileSync(outputPath, yamlContent);

    console.log(`GitHub data cached to ${outputPath}`);
    console.log(`Fetched ${pinnedRepos.length} pinned repositories`);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    process.exit(1);
  }
}

fetchGitHubData();
