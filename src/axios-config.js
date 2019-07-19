import axios from 'axios'
const GITHUB_GRAPHQL_CLIENT = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer a87aa383e8d6425592b3eac345230ff22357e11f`
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
export const STAR_REPOSITORY = `
  mutation ($repositoryId: ID!){
    addStar(input:{starrableId: $repositoryId}){
      starrable{
        viewerHasStarred
      }
    }
  }
`
export default GITHUB_GRAPHQL_CLIENT