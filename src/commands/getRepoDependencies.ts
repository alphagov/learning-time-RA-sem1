import type { Arguments, CommandBuilder } from 'yargs'
import { getRepoDependencies } from '../utils/commandHelpers/getDependencies'

type Options = {
  org: string
  repo: string
}

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .positional('org', { type: 'string', demandOption: true })
    .positional('repo', { type: 'string', demandOption: true })

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { org, repo } = argv
  const res = await getRepoDependencies(org, repo)
  process.stdout.write(JSON.stringify(res))
  process.exit(0)
}
