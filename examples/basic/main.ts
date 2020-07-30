import { Context, Engine, JSONResponse } from '../../src/index'

const app = new Engine()

app.get('/', async ctx => {
    const query: { name: string, age: number } = ctx.query()
    return new JSONResponse(query)
})

app.get('/hello/{name}', async ctx => {
    return new JSONResponse({ hello: ctx.params.name })
})

app.post('/hello', async ctx => {
    const body: { message: string } = await ctx.body()
    return new JSONResponse(body)
})

app.ws('/ws').on('connection', ws => {
    ws.on('message', msg => {
        ws.send(msg)
    })
})

app.serve(8000)
