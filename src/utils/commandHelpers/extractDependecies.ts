import { Endpoints } from '@octokit/types'
import { Octokit } from 'octokit'
import { convertBase64ToString } from '../convertBase64'


const token = process.env.GITHUB_KEY

export const octokit = new Octokit({
  auth: token
})

type contentsRequestData =
  Endpoints['GET /repos/{owner}/{repo}/contents/{path}']['response']
type contentsDataResponseKeys = keyof contentsRequestData['data']

const makeContentsRequest = async (
  org: string,
  repoName: string,
  fileName: string
): Promise<contentsRequestData> => {

    const res = await octokit.request(`GET /repos/{owner}/{repo}/contents/{path}`, 
    {
      owner: org, 
      repo: repoName, 
      path: fileName,
      per_page: 100,
      page: 1,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    return res
}

export const returnDependencyFile = async (
  org: string,
  repoName: string,
  filename: string
) => {
  const { data } = await makeContentsRequest(org, repoName, filename)
  return convertBase64ToString(data['content' as contentsDataResponseKeys])
}
