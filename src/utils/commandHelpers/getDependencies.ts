import { getRepoLanguage } from './languageSearch'
import { getAllFiles } from './treeSearch'
import { dependencyFiles, parseDependencyData } from './parseDependencyPackages'

export const getRepoDependencies = async (org: string, repoName: string) => {
  const repoLanguages = await getRepoLanguage(org, repoName)
  let languages = Object.keys(repoLanguages)
  languages =
    languages.includes('JavaScript') && languages.includes('TypeScript')
      ? languages.filter((language) => language !== 'JavaScript')
      : languages // bit of a special case here as TS + JS both use package.jsons / package-lock.jsons
  const depends = languages.reduce(async (acc, language) => {
    if (dependencyFiles[language])
      (await acc)[dependencyFiles[language]] = (
        await getAllFiles(org, repoName, dependencyFiles[language])
      ).map((file) => parseDependencyData(language, file))
    return acc
  }, Promise.resolve({} as Record<string, unknown>))
  return depends
}
