
import type { Arguments, CommandBuilder } from 'yargs'
import { repoNameSearch } from '../utils/repos'

type Options = {
  org: string
  searchKey: string
}



export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .positional('org', { type: 'string', demandOption: true }
                ).positional('searchKey', { type: 'string', demandOption: true})

export const handler = async(argv: Arguments<Options>): Promise<void> => {
  const { org, searchKey } = argv
  const res = await repoNameSearch(org, searchKey)
  process.stdout.write(JSON.stringify(res))
  process.exit(0)
}
