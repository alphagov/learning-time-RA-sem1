import type { Arguments, CommandBuilder } from 'yargs'
import { generateRepoReport } from '../utils/commandHelpers/generateRepoReport'
import { writeOutJson } from '../utils/writeout'

type Options = {
  org: string
  repo: string
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
    .positional('repo', { type: 'string', demandOption: true })
    .positional('path', { type: 'string', demandOption: false })

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { org, repo, writeOut, path } = argv
  const res = await generateRepoReport(org, repo)
  if (writeOut && path) {
    await writeOutJson(path, `${org}-${repo}-report`, JSON.stringify(res))
  } else {
    process.stdout.write(JSON.stringify(res))
  }
  process.exit(0)
}
