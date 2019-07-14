import axios from 'axios'
const GITHUB_GRAPHQL_CLIENT = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer cc03632b8bc2e3b9deb344a21dd9f00e5b1378ed`
  },
})

export const GET_USER = `
  {
    user(login: "majiyd"){
      name
      url
    }
  }
`
export default GITHUB_GRAPHQL_CLIENT