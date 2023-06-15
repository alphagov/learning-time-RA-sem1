import { getRepoLanguage } from './languageSearch'
import { getAllFiles } from './treeSearch'
import { dependencyFiles, parseDependencyData } from './parseDependencyPackages'

export const getRepoDependencies = async (org: string, repoName: string) => {
  const repoLanguages = await getRepoLanguage(org, repoName)
  const languages = Object.keys(repoLanguages[repoName])
  if (languages === undefined) return console.log('Cannot find repo language')
  for (const language of languages) {
    if (!dependencyFiles[language]) {
      const languageDependency = await getAllFiles(
        org,
        repoName,
        dependencyFiles[language]
      )
      console.log(languageDependency)
    }
  }
  return 
}

