
import type { Arguments, CommandBuilder } from 'yargs'
import { writeOutJson } from '../utils/writeout'


type Options = {
  org: string
  includeArchived: boolean | undefined
  writeOut: boolean | undefined
  path: string | undefined
}
import { getAllReposPaginate } from '../utils/repos'



export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({
      includeArchived: { type: 'boolean' },
      writeOut: { type: 'boolean'}
    })
    .positional('org', { type: 'string', demandOption: true })
    .positional('path', {type: 'string',demandOption : false })

export const handler = async(argv: Arguments<Options>): Promise<void> => {
  const { org, includeArchived, writeOut, path } = argv
  const res = includeArchived ? await getAllReposPaginate(org, true) : await getAllReposPaginate(org)
  if(writeOut && path){
    writeOutJson(path, `${org}-repos`, JSON.stringify(res))
  }
  process.stdout.write(JSON.stringify(res[1]))
  process.exit(0)
}
