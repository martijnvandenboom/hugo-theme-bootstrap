const autoprefixer = require('autoprefixer');
const rtlcss = require('rtlcss');
const path = require('path');

// Function to conditionally include PurgeCSS only for production builds
function getPurgeCSSPlugin() {
  if (process.env.HUGO_ENVIRONMENT === 'production') {
    try {
      // Import PurgeCSS config
      const purgecssConfigPath = path.resolve(__dirname, '../../../../purgecss.config.js');
      const purgecss = require(purgecssConfigPath);
      return purgecss ? purgecss : null; // If purgecss exists, return the plugin
    } catch (error) {
      console.error("Error loading PurgeCSS config:", error);
      return null; // If error occurs, don't include PurgeCSS
    }
  }
  return null; // Don't include PurgeCSS if not in production
}

module.exports = {
  plugins: [
    autoprefixer,
    getPurgeCSSPlugin(), // Dynamically load PurgeCSS plugin
    rtlcss,
  ].filter(Boolean), // Filter out null or undefined plugins
};
