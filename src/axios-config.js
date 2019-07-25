import axios from 'axios'
const GITHUB_GRAPHQL_CLIENT = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_GRAPHQL_PERSONAL_ACCESS_TOKEN}`
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
          hasPreviousPage
        }
      }
    }
  }
`
export const FETCH_PREVIOUS_REPOSITORIES = `
  query (
    $user: String!,
    $cursor: String
  ){
    user(login: $user){
      name
      url
      repositories(first:5 before: $cursor ){
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
          hasPreviousPage
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
  mutation ($repositoryId: ID!) {
    removeStar(input: { starrableId: $repositoryId }) {
      starrable {
        viewerHasStarred
      }
    }
  }
`
export default GITHUB_GRAPHQL_CLIENT