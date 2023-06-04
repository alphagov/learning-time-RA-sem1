import { getRepoLanguage } from "./languageSearch";
import { returnDependencyFile } from "./extractDependecies";
import { dependencyFiles,
        parseDependencyData } from "./utils/parseDependencyPackages";



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


