import { getRepoLanguage } from './languageSearch'
import { getAllFiles } from './treeSearch'
import { dependencyFiles } from './parseDependencyPackages'


export const getRepoDependencies = async (org: string, repoName: string) => {
  const repoLanguages = await getRepoLanguage(org, repoName)
  const languages = Object.keys(repoLanguages)
  const depends = Promise.all(languages.map(async(language) => {
    if(dependencyFiles[language]) return getAllFiles(org, repoName, dependencyFiles[language])
  }))
  return depends
}


