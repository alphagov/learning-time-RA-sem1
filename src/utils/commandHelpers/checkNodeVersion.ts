import { getAllFiles } from './treeSearch'

export const checkNodeVersion = async (org: string, repoName: string) => {
  const nvmrcFiles = await getAllFiles(org, repoName, '.nvmrc')
  if (nvmrcFiles.length > 1) {
    console.log(
      `More than one .nvmrc file is present in repository ${repoName}`
    )
  }

  const nodeVersions = await getAllFiles(org, repoName, 'node-version')
  if (nodeVersions.length > 1) {
    console.log(
      `More than one node-version file is present in repository ${repoName}`
    )
  }
  return `${
    nvmrcFiles.length == 0
      ? nodeVersions.length == 0
        ? 'No Node version files found'
        : nodeVersions
      : nvmrcFiles
  } `
}
