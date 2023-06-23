import { checkNodeVersion } from './TypescriptandJavascript/checkNodeVersion'
import { checkPythonVersion } from './Python/checkPythonVersion'

export const runtimesFiles: Record<string, string> = {
  JavaScript: '.nvmrc',
  TypeScript: '.nvmrc'
}

export const extractRuntimeVersions = async (
  org: string,
  repoName: string,
  language: string
) => {
  switch (language) {
    case 'JavaScript':
      return `${language}: ${await checkNodeVersion(org, repoName)}`
    case 'TypeScript':
      return `${language}: ${await checkNodeVersion(org, repoName)}`
    case 'Python':
      return `${language}: ${await checkNodeVersion(org, repoName)}`
    default:
      console.log(
        `Cannot extract runtime information for ${language} as it is currently unsupported.`
      )
      break
  }
}
