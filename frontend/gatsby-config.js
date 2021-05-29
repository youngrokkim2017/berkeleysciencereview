require("dotenv").config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: `Berkeley Science Review`,
    description: `A student-run publication on all things science.`,
    author: `Berkeley Science Review`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-54035-1",
        head: false,
        anonymize: true,
        respectDNT: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        // apiURL: process.env.API_URL || `http://localhost:1337`,
        apiURL:`http://localhost:1337`,
        contentTypes: [
          `user`,
          `authors`,
          `designer`,
          `article`,
          `category`,
          `magazine-issue`,
        ],
        singleTypes: [
          `about-us`,
          `join-us`,
          `staff-listing`,
          `subscribe`,
          `write-for-us`,
          `writing-resources`,
        ],
        queryLimit: 1000000,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby`,
        short_name: `bsr`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/bsr-icon.jpg`
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
          endpoint: 'https://berkeleysciencereview.us6.list-manage.com/subscribe/post?u=6089ba0af6ca14defb3115ed3&amp;id=c29e546b96', // string; add your MC list endpoint here; see instructions below
          timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
    `gatsby-plugin-offline`,
    // 'gatsby-plugin-postcss',
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        cssLoaderOptions: {
          camelCase: false,
          exportLocalsConvention: false,
          namedExport: false,
        },
        // postCssPlugins: [require(`postcss-preset-env`)({ stage: 0 })],
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `#003262`,
        // Disable the loading spinner.
        showSpinner: true,
      },
    },
  ],
};