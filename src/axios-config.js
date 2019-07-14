import axios from 'axios'
const GITHUB_GRAPHQL_CLIENT = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer ${process.env.GITHUB_GRAPHQL_PERSONAL_ACCESS_TOKEN}`
  },
})

export default GITHUB_GRAPHQL_CLIENT