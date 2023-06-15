import type { Arguments, CommandBuilder } from 'yargs'
import { getAllRepoNamesPaginate } from '../utils/commandHelpers/repos'
import { writeOutJson } from '../utils/writeout'

type Options = {
  org: string
  includeArchived: boolean | undefined
  writeOut: boolean | undefined
  path: string | undefined
}

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({
      includeArchived: { type: 'boolean' },
      writeOut: { type: 'boolean' }
    })
    .positional('org', { type: 'string', demandOption: true })
    .positional('path', { type: 'string', demandOption: false })

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { org, includeArchived, writeOut, path } = argv
  const res = includeArchived
    ? await getAllRepoNamesPaginate(org, true)
    : await getAllRepoNamesPaginate(org)
  if (writeOut && path) {
    await writeOutJson(path, `${org}-repos`, JSON.stringify(res))
  } else {
    process.stdout.write(JSON.stringify(res))
  }
  process.exit(0)
}
