import { getRepoDependencies } from './getDependencies'
import { getRepoLanguage } from './languageSearch'
import { extractRuntimeVersions, runtimesFiles } from './extractRuntimeVersions'

export const generateRepoReport = async (org: string, repoName: string) => {
  const reportObj: Record<string, unknown> = {}
  reportObj['Dependencies'] = await getRepoDependencies(org, repoName)
  reportObj['Languages'] = await getRepoLanguage(org, repoName)
  reportObj['RuntimeVersions'] = await Promise.all(
    Object.keys(reportObj.Languages as Record<string, number | undefined>)
      .filter((language) => Object.keys(runtimesFiles).includes(language))
      .map(
        async (language) =>
          await extractRuntimeVersions(org, repoName, language)
      )
  )
  return reportObj
}
