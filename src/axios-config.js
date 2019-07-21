import axios from 'axios'
const GITHUB_GRAPHQL_CLIENT = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer xxxxxx`
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
export const UNSTAR_REPOSITORY = `
  mutation ($repositoryId: ID!){
    removeStar(input{starrableId: $repositoryId}) {
      starrable{
        viewerHasStarred
      }
    }
  }
`
export default GITHUB_GRAPHQL_CLIENT