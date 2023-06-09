import { Octokit } from 'octokit'
import { Endpoints } from '@octokit/types'

export type listOrgReposResponse =
  Endpoints['GET /orgs/{org}/repos']['response']
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never //Thanks stack overflow

const token = process.env.GITHUB_KEY

export const octokit = new Octokit({
  auth: token
})

// TODO: Come back and add an includeArchived param that filters our response by if it is archived or not
export const getAllRepos = async (
  org: string,
  page = 1,
  acc: listOrgReposResponse['data'] = [],
  per_page?: number
): Promise<listOrgReposResponse['data']> => {
  const res: listOrgReposResponse = await octokit.request(
    `GET /orgs/${org}/repos`,
    {
      per_page: per_page || 100,
      page: page,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  )
  if (res.data.length > 0) {
    res.data.forEach((repo) => {
      acc.push(repo)
    })
    return getAllRepos(org, page + 1, acc, per_page)
  }
  return acc
}

const getSpecificPageofRepos = async (
  org: string,
  page: number,
  per_page?: number
) => {
  const res: listOrgReposResponse = await octokit.request(
    `GET /orgs/${org}/repos`,
    {
      per_page: per_page || 100,
      page: page,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  )
  return res
}

const returnFilteredRepoNames = (
  data: listOrgReposResponse['data'],
  filterKey: string
): string[] => {
  return data.reduce(
    (acc: string[], repo: ArrayElement<listOrgReposResponse['data']>) => {
      if (repo.name.includes(filterKey)) acc.push(repo.full_name)
      return acc
    },
    []
  )
}

export const repoNameSearch = async (org: string, filterKey: string, archived = false) => {
  const data = await getAllReposPaginate(org)
  const filteredDataByName = returnFilteredRepoNames(data, filterKey)
  return {[`${org}/"${filterKey}"`] :filteredDataByName}
}

export const repoNames = async (org: string, archived = false): Promise<string[]> => {
  return (await getAllReposPaginate(org, archived)).map((repo) => repo.full_name)
}

export const getAllReposPaginate = async(org : string, archived = false) => {
  const res = await octokit.paginate(`GET /orgs/${org}/repos`) as listOrgReposResponse['data']
  if(archived) return res
  else return res.filter((repo:any ) => !repo.archived) as listOrgReposResponse['data']
}
