import { getAllFiles } from "./treeSearch";

const checkNodeVersion = async(org: string, repoName: string) => {
    const nvmrcFiles = await getAllFiles(org, repoName, '.nvmrc') 
    if(nvmrcFiles.length> 1) {
        console.log(`More than one .nvmrc file is present in repository ${repoName}`)
    }
    console.log(`${repoName} uses Node version(s) ${nvmrcFiles}`)
}

