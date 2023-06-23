import {exec} from '@actions/exec'
import {request} from './request'
import fs from 'fs'
import {argv} from 'process'

export async function createCheck(): Promise<string> {
  const {GITHUB_EVENT_PATH, GITHUB_SHA, GITHUB_TOKEN} = process.env
  const event = JSON.parse(fs.readFileSync(GITHUB_EVENT_PATH ?? '', 'utf8'))

  let {after: sha} = event
  if (!sha) {
    sha = GITHUB_SHA
  }
  const {repository} = event.pop()
  console.log('repository', repository)
  console.log('event', event)
  const {owner, name} = repository

  const checkName = 'Sls-mentor check'

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    'User-Agent': 'sls-mentor-action'
  }
  const body = {
    name: checkName,
    head_sha: sha,
    status: 'in_progress',
    started_at: new Date()
  }
  const {data} = await request(
    `https://api.github.com/repos/${owner}/${name}/check-runs`,
    {
      method: 'POST',
      headers,
      body
    }
  )
  const {id} = data
  return id
}
export const updateCheck = async (): Promise<void> => {}

export async function slsMentor(level: number): Promise<void> {
  const command = `npx sls-mentor --level ${level}`
  const options = {
    listeners: {
      stdout: (data: Buffer) => data.toString(),
      stderr: (data: Buffer) => data.toString()
    },
    cwd: './'
  }
  await exec(command, [], options)
}

export async function run(level: number): Promise<string> {
  console.log('run')
  //console.log('createCheck id', createCheck())
  slsMentor(level)
  return 'success'
}

run(parseInt(argv[1]) ?? 1)
