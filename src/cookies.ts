export default class Cookies {
    constructor(raw?: string) {
        if (!raw) return
        const cookies = raw.split(';')
        for (let i = cookies.length - 1; i >= 0; i--) {
            const [key, val] = cookies[i].split('=')
            this.obj[key] = val
        }
    }

    private obj: { [key: string]: string } = {}

    get(key: string): string | null {
        return this.obj[key] ?? null
    }
}