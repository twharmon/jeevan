# Jeevan
Simple web framework.

## Usage
```typescript
import { Context, Engine, JSONResponse } from 'jeevan'

const app = new Engine()

app.get('/hello/{name}', async (ctx: Context) => {
    return new JSONResponse({ hello: ctx.params.name })
})

app.post('/hello', async (ctx: Context) => {
    const body = await ctx.body()
    return new JSONResponse(body)
})

app.ws('/ws').on('connection', ws => {
    ws.on('message', msg => {
        ws.send(msg)
    })
})

app.serve(8000)
```

## Contribute
Make a pull request.
