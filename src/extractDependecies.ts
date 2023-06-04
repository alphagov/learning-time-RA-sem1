import { Endpoints } from '@octokit/types'
import { Octokit } from 'octokit'
import { getRepoLanguage } from './languageSearch'
import { convertBase64ToString } from './utils/convertBase64'
import { ArrayElement } from './repos'

const token = process.env.GITHUB_KEY

export const octokit = new Octokit({
  auth: token
})

type contentsRequestData =
  Endpoints['GET /repos/{owner}/{repo}/contents/{path}']['response']['data']

const makeContentsRequest = async (
  org: string,
  repoName: string,
  fileName: string
): Promise<contentsRequestData> => {
  return (
    (await octokit.request(`GET /repos/${org}/${repoName}/contents/${fileName}`, 
    {
      per_page: 100,
      page: 1,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })).data
  )
}

export const returnDependencyFile = async (
  org: string,
  repoName: string,
  filename: string
) => {
  const res = await makeContentsRequest(org, repoName, filename) as any // this is a gross fudge, will return to vanquish this
  return (convertBase64ToString(res.content as string))
}



