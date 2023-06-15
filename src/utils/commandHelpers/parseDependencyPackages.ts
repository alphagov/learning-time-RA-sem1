export const dependencyFiles: Record<string, string> = {
  JavaScript: 'package.json',
  TypeScript: 'package.json',
  Python: 'requirements.txt',
  Go: 'go.mod',
  PHP: 'composer.json'
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

const extractPythonDependencies = (data: string) => {
  return data
    .split('\n')
    .reduce((acc: Record<string, string>, line: string) => {
      if (!line.includes('#') && line.length > 1) {
        const [name, version] = line.split('==')
        acc[name] = version
      }
      return acc
    }, {})
}

export const parseDependencyData = (language: string, data: string) => {
  switch (language) {
    case 'JavaScript':
      return extractPackageJsonDependencies(data)
    case 'TypeScript':
      return extractPackageJsonDependencies(data)
    case 'Python':
      return extractPythonDependencies(data)
    default:
      break
  }
}
