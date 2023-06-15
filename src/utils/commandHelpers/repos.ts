import { Octokit } from 'octokit'

const token = process.env.GITHUB_KEY

export const octokit = new Octokit({
  auth: token
})

export const getAllReposPaginate = async (org: string, archived?: boolean) => {
  const res = await octokit.paginate(
    'GET /orgs/{org}/repos',
    {
      org: org,
      per_page: 100,
      sort: 'full_name'
    },
    (response) =>
      response.data.filter((repo) => (archived ? repo : !repo.archived))
  )
  return res
}

export const getAllRepoNamesPaginate = async (
  org: string,
  archived?: boolean
) => {
  const res = await octokit.paginate(
    'GET /orgs/{org}/repos',
    {
      org: org,
      per_page: 100,
      sort: 'full_name'
    },
    (response) =>
      response.data
        .filter((repo) => (archived ? repo : !repo.archived))
        .map((repo) => repo.full_name)
  )
  return res
}
