import NodeEnvironment from 'jest-environment-node'
import type {EnvironmentContext, JestEnvironmentConfig} from '@jest/environment'
import {dirname} from 'path'

export class CustomEnvironment extends NodeEnvironment {
  GITHUB_EVENT_PATH: string
  constructor(config: JestEnvironmentConfig, _context: EnvironmentContext) {
    super(config, _context)
    this.GITHUB_EVENT_PATH = `${dirname}/mockEvent.json`
  }
  async setup(): Promise<void> {
    await super.setup()
  }
}
