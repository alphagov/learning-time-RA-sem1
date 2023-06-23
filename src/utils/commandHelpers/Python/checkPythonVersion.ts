import { getAllFiles } from '../treeSearch'

export const checkPythonVersion = async (org: string, repoName: string) => {
  const pythonVersion = await getAllFiles(org, repoName, '.python-version')
  if (pythonVersion.length > 1) {
    console.log(
      `More than one .nvmrc file is present in repository ${repoName}`
    )
  }

 
  return `${
    pythonVersion.length == 0 ? 'No Python version files found': pythonVersion
  } `
}
