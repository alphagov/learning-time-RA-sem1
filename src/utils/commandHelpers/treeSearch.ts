import { Octokit } from 'octokit'
import { Endpoints } from '@octokit/types'
import { returnDependencyFile } from './extractDependecies'

type BranchRequestResponse =
  Endpoints['GET /repos/{owner}/{repo}/branches/{branch}']['response']
type TreeRequestResponse =
  Endpoints['GET /repos/{owner}/{repo}/git/trees/{tree_sha}']['response']
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

const token = process.env.GITHUB_KEY

export const octokit = new Octokit({
  auth: token
})

const fetchMainSha = async (org: string, repoName: string) => {
  const res = (await octokit.request('GET /repos/{org}/{repo}/branches/main', {
    org: org,
    repo: repoName,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })) as BranchRequestResponse
  return res.data.commit.sha
}

const fetchTreeFromSha = async (org: string, repoName: string, sha: string) => {
  const res = (await octokit.request(
    'GET /repos/{org}/{repo}/git/trees/{tree_sha}',
    {
      org: org,
      repo: repoName,
      tree_sha: sha,
      recursive: true
    }
  )) as TreeRequestResponse
}

const fetchTreeFile = async (
  org: string,
  repoName: string,
  sha: string,
  fileName: string
) => {
  const res = (await octokit.request(
    'GET /repos/{org}/{repo}/git/trees/{sha}',
    {
      org: org,
      page: 1,
      repo: repoName,
      sha: sha,
      recursive: true
    }
  )) as TreeRequestResponse
  const paths = res.data.tree.reduce((arr: Record<string, unknown>[], file) => {
    if (file.path?.includes(fileName)) {
      arr.push(file)
    }
    return arr
  }, [])
  return paths
}

const fetchFilePaths = async (
  org: string,
  repoName: string,
  sha: string,
  fileName: string
) => {
  const res = (await octokit.request(
    'GET /repos/{org}/{repo}/git/trees/{sha}',
    {
      org: org,
      page: 1,
      repo: repoName,
      sha: sha,
      recursive: true
    }
  )) as TreeRequestResponse
  const paths = res.data.tree.reduce((arr: string[], file) => {
    if (file.path?.includes(fileName)) {
      arr.push(file.path)
    }
    return arr
  }, [])
  return paths
}

export const getAllFiles = async (
  org: string,
  repoName: string,
  fileName: string
) => {
  const mainBranchSha = await fetchMainSha(org, repoName)
  const paths = await fetchFilePaths(org, repoName, mainBranchSha, fileName)
  return Promise.all(
    paths.map(async (path) => {
      const file = await returnDependencyFile(org, repoName, path)
      return file
    })
  )
}
