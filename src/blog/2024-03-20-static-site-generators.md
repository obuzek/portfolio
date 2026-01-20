---
title: Why I Chose a Static Site Generator
date: 2024-03-20
excerpt: Exploring the decision to build this site with Eleventy and why static site generators are a great choice for portfolio sites.
---

When building this portfolio site, I had many options to choose from. In the end, I went with [Eleventy](https://www.11ty.dev/), a static site generator. Here's why.

## The Case for Static Sites

Static site generators transform templates and content into plain HTML, CSS, and JavaScript files. This approach offers several benefits:

1. **Performance** - No server-side processing means lightning-fast page loads
2. **Security** - No database or backend means fewer attack vectors
3. **Simplicity** - Easy to host anywhere, no complex infrastructure
4. **Cost** - Free hosting on platforms like Netlify, Vercel, or GitHub Pages

## Why Eleventy?

There are many excellent static site generators: Hugo, Jekyll, Gatsby, Next.js (in static mode), and more. I chose Eleventy because:

- **Zero-config** - Works out of the box with sensible defaults
- **Flexible templating** - Supports Nunjucks, Markdown, JavaScript, and more
- **Data-driven** - Easy to pull in data from YAML, JSON, or JavaScript
- **Lightweight** - No client-side JavaScript shipped by default

## The Setup

Here's a quick look at how I structured the site:

```
src/
├── _data/          # YAML files for projects, talks, etc.
├── _includes/      # Layout templates
├── blog/           # Markdown blog posts
├── assets/         # CSS, images
└── *.njk           # Page templates
```

The beauty of this setup is that adding new content is as simple as creating a new Markdown or YAML file. No database updates, no CMS, just files in a Git repository.

## Conclusion

For a portfolio site that changes infrequently and doesn't need dynamic features, a static site generator is hard to beat. The combination of performance, simplicity, and free hosting makes it an excellent choice.

What static site generator do you prefer? Let me know!
