import { Endpoints } from '@octokit/types'
import { Octokit } from 'octokit'
import { getAllRepoNamesPaginate } from './repos'
// import { repoNameSearch, repoNames } from './repos'

export type repoLanguageResponse =
  Endpoints['GET /repos/{owner}/{repo}/languages']['response']

const token = process.env.GITHUB_KEY

export const octokit = new Octokit({
  auth: token
})

export const getRepoLanguage = async (
  owner: string,
  repoName: string
): Promise<Record<string, number| undefined>> => {
 const res =  await octokit.request(`GET /repos/${owner}/${repoName}/languages`, {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      }) as repoLanguageResponse
      return res.data
  }

const getRepoLanguagesFromList = async (repoNames: string[]) =>
  await Promise.all(
    repoNames.map((repoName) => {
      const [owner, repo] = repoName.split('/')
      return getRepoLanguage(owner, repo)
    })
  )

const getAllOrgRepoLangs = async (org: string) => {
  const repos = await getAllRepoNamesPaginate(org)
  return await getRepoLanguagesFromList(repos)
}
