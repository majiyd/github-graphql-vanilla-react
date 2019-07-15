import axios from 'axios'
const GITHUB_GRAPHQL_CLIENT = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer cc03632b8bc2e3b9deb344a21dd9f00e5b1378ed`
  },
})

export const GET_USER = `
  query ($user: String!){
    user(login: $user){
      name
      url
      repositories(first:5 ){
        totalCount
        edges{
          node{
            name
            url
          }
        }
      }
    }
  }
`
export default GITHUB_GRAPHQL_CLIENT