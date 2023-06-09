
import type { Arguments, CommandBuilder } from 'yargs'


type Options = {
  org: string
  repoName: string
}
import { getRepoLanguage } from '../utils/languageSearch'


export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .positional('org', { type: 'string', demandOption: true }
                ).positional('repoName', { type: 'string', demandOption: true})

export const handler = async(argv: Arguments<Options>): Promise<void> => {
  const { org, repoName } = argv
  const res = await getRepoLanguage(org, repoName)
  process.stdout.write(JSON.stringify(res))
  process.exit(0)
}
