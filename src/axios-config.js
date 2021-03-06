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