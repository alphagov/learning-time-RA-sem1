import { Octokit } from 'octokit'
import { Endpoints } from "@octokit/types"

export type listOrgReposResponse = Endpoints["GET /orgs/{org}/repos"]["response"]
type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never //Thanks stack overflow


const token = process.env.GITHUB_TOKEN


const octokit = new Octokit({
    auth: token
})


const getAllRepos = async(org: string, page = 1, acc: listOrgReposResponse['data'] = [], per_page?: number ): Promise<listOrgReposResponse['data']> => {
    const res: listOrgReposResponse  = await octokit.request(`GET /orgs/${org}/repos`,{ 
        per_page: per_page || 100,
        page: page,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
    if(res.data.length > 0){
        res.data.forEach(repo => {
            acc.push(repo)
        })
        return getAllRepos(org, page+1, acc, per_page)
    }
    return acc
}


const getSpecificPageofRepos = async(org: string, page: number, per_page?: number) => {
    const res: listOrgReposResponse  = await octokit.request(`GET /orgs/${org}/repos`,{ 
        per_page: per_page || 100,
        page: page,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
    return res
}

const returnFilteredRepoNames = (data: listOrgReposResponse['data'], filterKey: string): string[]=> {
    return data.reduce((acc: string[], repo: ArrayElement<listOrgReposResponse['data']>) => {
        if(repo.name.startsWith(filterKey)) acc.push(repo.name)
        return acc
    }, [])
}

const repoNameSearch = async(org: string, filterKey: string) => {
    const data = await getAllRepos(org)
    const filteredDataByName = returnFilteredRepoNames(data, filterKey)
    return filteredDataByName
}

repoNameSearch('alphagov', 'di-').then((data) => console.log(data))

