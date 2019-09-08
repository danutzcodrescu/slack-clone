const algoliasearch = require('algoliasearch');
const client = algoliasearch(process.env.ALGOLIA_APP, process.env.ALGOLIA_API_KEY);
const index = client.initIndex(process.env.ALGOLIA_INDEX);

module.exports = {
  Query: {
    Search: (root, args, context) => {
      return index.search({query: args.query, filters: args.filters,})
    },
  }
}
