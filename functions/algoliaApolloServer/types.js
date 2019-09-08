const {gql} = require("apollo-server-lambda");

module.exports = gql`
  type Query {
    Search(query: String!, filters: String): AlgoliaResponse
  }

  type AlgoliaResponse {
    hits: [Message]
    page: Int!
    nbHits: Int!
    nbPages: Int!
    hitsPerPage: Int!
    processingTimeMS: Int!
    query: String!
    params: String!
  }

  type Message {
    id: ID!
    userId: String!
    body: String!
    channelId: ID!
    date: String!
    
  }
  
  extend type Message {
    _highlightResult: HighlightResult!
  }

  type HighlightResult {
    body: Match!
  }

  type Match {
    value: String!
    matchLevel: String!
  }
`;

