import { octokit } from "./repos"
import { Endpoints } from "@octokit/types"

type repoLanguageResponse =
  Endpoints["GET /repos/{owner}/{repo}/languages"]["response"]

const getRepoLanguage = async (owner: string, repoName: string) => {
  return {
    [repoName]: (
      await octokit.request(`GET /repos/${owner}/${repoName}/languages`, {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
    ).data,
  }
}

const getRepoLanguagesFromList = async(repoNames: string[]) => repoNames.map(repoName => {
    const [owner, repo ] = repoName.split('/')
    return getRepoLanguage(owner, repo)
})
