import type { Arguments, CommandBuilder } from 'yargs'
import { getRepoLanguage } from '../utils/commandHelpers/languageSearch'

type Options = {
  org: string
  repoName: string
}

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .positional('org', { type: 'string', demandOption: true })
    .positional('repoName', { type: 'string', demandOption: true })

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { org, repoName } = argv
  const res = await getRepoLanguage(org, repoName)
  process.stdout.write(JSON.stringify(res))
  process.exit(0)
}
