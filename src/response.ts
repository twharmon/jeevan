import { ServerResponse } from 'http'
import * as fs from 'fs'

export enum HttpStatus {
    OK = 200,
    BadRequest = 400,
    NotFound = 404,
    Conflict = 409,
    UnprocessableEntity = 422,
    InternalServerError = 500,
}

export interface Response {
    send: (res: ServerResponse) => void
}

export class TextResponse {
    constructor(text: string, status = HttpStatus.OK) {
        this.text = text
        this.status= status
    }

    private readonly text: string
    private readonly status: HttpStatus

    send(res: ServerResponse) {
        res.writeHead(this.status, { 'Content-Type': 'text/plain' })
        res.end(this.text)
    }
}

export class JSONResponse {
    constructor(obj: object, status = HttpStatus.OK) {
        this.obj = obj
        this.status= status
    }

    private readonly obj: object
    private readonly status: HttpStatus

    send(res: ServerResponse) {
        res.writeHead(this.status, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(this.obj))
    }
}

export class FileResponse {
    constructor(path: string) {
        this.path = path
    }

    private readonly path: string

    send(res: ServerResponse) {
        fs.readFile(process.cwd() + this.path, function (err, data) {
            if (err) {
                res.writeHead(404)
                res.end('Page not found')
                return
            }
            res.writeHead(200)
            res.end(data)
        })
    }
}

export class EmptyResponse {
    constructor(status = HttpStatus.OK) {
        this.status= status
    }

    private readonly status: HttpStatus

    send(res: ServerResponse) {
        res.writeHead(this.status)
        res.end()
    }
}