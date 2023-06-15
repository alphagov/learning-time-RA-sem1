import { Endpoints } from '@octokit/types'
import { Octokit } from 'octokit'

const token = process.env.GITHUB_KEY

export const octokit = new Octokit({
  auth: token
})


const searchRepoForSpecificFile = async(org: string, repoName:string, fileName: string) => {
const res = await octokit.rest.search.code({
  q: `${fileName}+org:${org}+repo:${org}/${repoName}`, 
  per_page: 100,
    page: 1,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
})
return res
}

