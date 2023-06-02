/**
 * @jest-environment ./__tests__/mockEnv.ts
 */
import {slsMentor, createCheck} from '../src/run'
import {setupServer} from 'msw/node'
import {rest} from 'msw'

const handlers = [
  rest.post(
    `https://api.github.com/repos/toto/tototo/check-runs`,
    async (req, res, ctx) => {
      console.log('request intercepted')
      return res(
        ctx.status(200, 'OK'),
        ctx.json({
          id: '10000'
        })
      )
    }
  )
]
export const server = setupServer(...handlers)

describe('sls mentor github action', () => {
  beforeAll(() => {
    server.listen()
  })
  afterAll(() => {
    server.close()
  })
  it('should run sls-mentor level 1', async () => {
    expect(await slsMentor(1)).toHaveReturned()
  }, 60000)
  it('should create a check', async () => {
    await createCheck()
  })
})
