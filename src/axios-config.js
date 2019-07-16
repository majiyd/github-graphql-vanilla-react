import axios from 'axios'
const GITHUB_GRAPHQL_CLIENT = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer cc03632b8bc2e3b9deb344a21dd9f00e5b1378ed`
  },
})

export const GET_USER = `
  query (
    $user: String!,
    $cursor: String
  ){
    user(login: $user){
      name
      url
      repositories(first:5 after: $cursor ){
        edges{
          node{
            name
            url
            id
            viewerHasStarred
          }
        }
        totalCount
        pageInfo{
          endCursor
          hasNextPage
        }
      }
    }
  }
`
export default GITHUB_GRAPHQL_CLIENT