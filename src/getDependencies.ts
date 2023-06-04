import { getRepoLanguage } from "./languageSearch";
import { returnDependencyFile } from "./extractDependecies";

const dependencyFiles: Record<string, string> = {
    JavaScript: 'package.json',
    TypeScript: 'package.json',
    Python: 'requirements.txt',
    Go: 'go.mod',
    PHP: 'composer.json',
  }

const getRepoDependencies = async(org: string, repoName: string ) => {
    const repoLanguages = await getRepoLanguage(org, repoName)
    const languages = Object.keys(repoLanguages[repoName])
    const dependencies : any[] = [] //TODO: #2 Fix this
    if(languages === undefined)  return console.log("Cannot find repo language")
    for (const language of languages){
        if (dependencyFiles[language] !== undefined){
        const languageDependency = await returnDependencyFile(org, repoName, dependencyFiles[language])
        const parsedData =  { [repoName]:parseDependencyData(language, languageDependency)}
        dependencies.push(parsedData)
        }
    }
    return dependencies
}


const extractPackageJsonDependencies = (data: string) => {
    const parsedData: Record<string, string> = JSON.parse(data)
    const dependencies = parsedData.dependencies
    const devDependencies = parsedData.devDependencies
    return {
        dependencies, 
        devDependencies
    }
}

const parseDependencyData = (language: string, data: string) => {
    switch (language){
        case 'JavaScript':
            return extractPackageJsonDependencies(data)
        case 'TypeScript':
            return extractPackageJsonDependencies(data)
        default:
            break
    }
}
