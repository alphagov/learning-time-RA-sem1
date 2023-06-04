
export const dependencyFiles: Record<string, string> = {
    JavaScript: 'package.json',
    TypeScript: 'package.json',
    Python: 'requirements.txt',
    Go: 'go.mod',
    PHP: 'composer.json',
  }

export const extractPackageJsonDependencies = (data: string) => {
    const parsedData: Record<string, string> = JSON.parse(data)
    const dependencies = parsedData.dependencies
    const devDependencies = parsedData.devDependencies
    return {
        dependencies, 
        devDependencies
    }
}

export const parseDependencyData = (language: string, data: string) => {
    switch (language){
        case 'JavaScript':
            return extractPackageJsonDependencies(data)
        case 'TypeScript':
            return extractPackageJsonDependencies(data)
        default:
            break
    }
}
