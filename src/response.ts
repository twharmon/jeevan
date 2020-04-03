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
        res.writeHead(this.status, { 'Content-Type': 'text/plain; charset=utf-8' })
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
        res.writeHead(this.status, { 'Content-Type': 'application/json; charset=utf-8' })
        res.end(JSON.stringify(this.obj))
    }
}

export class FileResponse {
    constructor(path: string) {
        this.path = path
    }

    private readonly path: string

    send(res: ServerResponse) {
        fs.readFile(process.cwd() + this.path, (err, data) => {
            if (err) {
                res.writeHead(404)
                res.end('Page not found')
                return
            }
            const headers: { [key: string]: string } = {}
            switch (this.path.split('.').pop()) {
                case 'avi': headers['Content-Type'] = 'video/x-msvideo'; break
                case 'css': headers['Content-Type'] = 'text/css'; break
                case 'csv': headers['Content-Type'] = 'text/csv'; break
                case 'doc': headers['Content-Type'] = 'application/msword'; break
                case 'docx': headers['Content-Type'] = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'; break
                case 'eot': headers['Content-Type'] = 'application/vnd.ms-fontobject'; break
                case 'gz': headers['Content-Type'] = 'application/gzip'; break
                case 'gif': headers['Content-Type'] = 'image/gif'; break
                case 'htm' || 'html': headers['Content-Type'] = 'text/html'; break
                case 'ico': headers['Content-Type'] = 'image/vnd.microsoft.icon'; break
                case 'jpg' || 'jpeg': headers['Content-Type'] = 'image/jpeg'; break
                case 'js': headers['Content-Type'] = 'text/javascript'; break
                case 'json': headers['Content-Type'] = 'application/json'; break
                case 'mp3': headers['Content-Type'] = 'audio/mpeg'; break
                case 'mpeg': headers['Content-Type'] = 'video/mpeg'; break
                case 'oga': headers['Content-Type'] = 'audio/ogg'; break
                case 'ogv': headers['Content-Type'] = 'video/ogg'; break
                case 'otf': headers['Content-Type'] = 'font/otf'; break
                case 'png': headers['Content-Type'] = 'image/png'; break
                case 'pdf': headers['Content-Type'] = 'application/pdf'; break
                case 'ppt': headers['Content-Type'] = 'application/vnd.ms-powerpoint'; break
                case 'pptx': headers['Content-Type'] = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'; break
                case 'rtf': headers['Content-Type'] = 'application/rtf'; break
                case 'svg': headers['Content-Type'] = 'image/svg+xml'; break
                case 'tar': headers['Content-Type'] = 'application/x-tar'; break
                case 'ttf': headers['Content-Type'] = 'font/ttf'; break
                case 'txt': headers['Content-Type'] = 'text/plain'; break
                case 'wav': headers['Content-Type'] = 'audio/wav'; break
                case 'woff': headers['Content-Type'] = 'font/woff'; break
                case 'woff2': headers['Content-Type'] = 'font/woff2'; break
                case 'xhtml': headers['Content-Type'] = 'application/xhtml+xml'; break
                case 'xls': headers['Content-Type'] = 'application/vnd.ms-excel'; break
                case 'xlsx': headers['Content-Type'] = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'; break
                case 'xml': headers['Content-Type'] = 'application/xml'; break
                case 'zip': headers['Content-Type'] = 'application/zip'; break
                default: headers['Content-Type'] = 'application/octet-stream'
            }
            res.writeHead(200, headers)
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