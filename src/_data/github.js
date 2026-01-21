// Fetch pinned repositories from GitHub using GraphQL API
require('dotenv').config();

const GITHUB_USERNAME = 'obuzek';

module.exports = async function() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn('GITHUB_TOKEN not set, skipping GitHub fetch');
    return { repos: [] };
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
      console.warn(`GitHub GraphQL API returned ${response.status}, falling back to empty list`);
      return { repos: [] };
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GitHub GraphQL errors:', data.errors);
      return { repos: [] };
    }

    const pinnedRepos = data.data.user.pinnedItems.nodes.map(repo => ({
      title: repo.name,
      url: repo.url,
      description: repo.description || 'No description provided',
      language: repo.primaryLanguage?.name || null,
      topics: repo.repositoryTopics.nodes.map(t => t.topic.name),
    }));

    return { repos: pinnedRepos };
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return { repos: [] };
  }
};
