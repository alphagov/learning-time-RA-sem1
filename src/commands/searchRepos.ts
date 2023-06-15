import type { Arguments, CommandBuilder } from 'yargs'
import { getAllRepoNamesPaginate } from '../utils/commandHelpers/repos'

type Options = {
  org: string
  searchKey: string
  includeArchived: boolean | undefined
}

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({
      includeArchived: { type: 'boolean' }
    })
    .positional('org', { type: 'string', demandOption: true })
    .positional('searchKey', { type: 'string', demandOption: true })

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { org, searchKey, includeArchived } = argv
  const res = includeArchived
    ? await getAllRepoNamesPaginate(org, includeArchived)
    : await getAllRepoNamesPaginate(org)
  const filteredRes = res.filter((repo) => repo.includes(searchKey))
  process.stdout.write(JSON.stringify(filteredRes))
  process.exit(0)
}
