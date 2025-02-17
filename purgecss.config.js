const fs = require('fs');
const path = require('path');

// Path to the Hugo stats file
const stats = './hugo_stats.json';

// Ensure the Hugo stats file exists
fs.access(stats, fs.F_OK, (err) => {
  if (err) {
    throw new Error('Hugo stats file not found. Please enable "build.writeStats" in your Hugo configuration. See docs for more details: https://ingvdboom-notes.netlify.app/v1/en/docs/getting-started/prerequisites/#configuration');
  }
});

// Set up PurgeCSS
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [stats, './extra_stats.json'], // Include the Hugo stats file
  defaultExtractor: (content) => {
    const els = JSON.parse(content).htmlElements;
    return els.tags.concat(els.classes, els.ids); // Extract tags, classes, and ids
  },
  safelist: {
    standard: [
      'active', 'badge', 'bg-secondary', 'btn-link', 'btn-primary', 'collapse', 'col-xxl-10',
      'd-flex', 'end-0', 'flex-column', 'justify-content-center', 'm-1', 'mb-0', 'mb-1', 'my-1',
      'my-2', 'mx-2', 'mb-2', 'list-unstyled', 'opacity-0', 'opacity-50', 'opacity-100', 'overflow-hidden',
      'p-1', 'pb-0', 'pe-3', 'pt-0', 'pt-1', 'px-2', 'py-1', 'px-3', 'py-2', 'position-absolute',
      'rounded', 'rounded-top', 'show', 'sidebar-none', 'top-0', 'text-bg-secondary', 'text-success', 
      'w-100', 'was-validated',
    ],
    greedy: [/carousel-indicators$/] // Handle dynamic classes
  },
  dynamicAttributes: ['data-bs-popper', 'data-bs-theme', 'data-palette', 'role', 'placeholder-shown'],
});

// Export PurgeCSS plugin for PostCSS
module.exports = purgecss;
