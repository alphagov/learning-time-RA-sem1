import { Endpoints } from '@octokit/types'
import { Octokit } from 'octokit'
import { repoNameSearch, repoNames } from './repos'
import * as fs from 'fs'

type repoLanguageResponse =
  Endpoints['GET /repos/{owner}/{repo}/languages']['response']['data']

const token = process.env.GITHUB_KEY

export const octokit = new Octokit({
  auth: token
})

const getRepoLanguage = async (
  owner: string,
  repoName: string
): Promise<repoLanguageResponse> => {
  return {
    [repoName]: (
      await octokit.request(`GET /repos/${owner}/${repoName}/languages`, {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })
    ).data
  }
}

const getRepoLanguagesFromList = async (repoNames: string[]) =>
  await Promise.all(
    repoNames.map((repoName) => {
      const [owner, repo] = repoName.split('/')
      return getRepoLanguage(owner, repo)
    })
  )

const getAllOrgRepoLangs = async (org: string) => {
  const repos = await repoNames(org)
  return await getRepoLanguagesFromList(repos)
}

const getFilteredRepoLanguages = async (org: string, filterKey: string) => {
  const repos = await repoNameSearch(org, filterKey)
  return await getRepoLanguagesFromList(repos)
}

