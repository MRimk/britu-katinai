import fm from 'front-matter'
import { marked } from 'marked'

export type CatFrontmatter = {
    name: string
    breed: string
    gender: 'Male' | 'Female'
    birthdate: string
    image: string
    colour?: string
    litter?: string
    mother?: string
    father?: string
}

export type CatDoc = CatFrontmatter & { slug: string; html: string }

const rawModules = import.meta.glob('../cats/*.md', { as: 'raw', eager: true }) as Record<string, string>

const litterPhotoModules = import.meta.glob('../assets/litters/*.{jpg,jpeg,png}', {
    as: 'url',
    eager: true,
}) as Record<string, string>

function slugify(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function computeAge(birthdate: string): string {
    const b = new Date(birthdate)
    const now = new Date()
    const years = now.getFullYear() - b.getFullYear()
    const m = now.getMonth() - b.getMonth()
    const adj = m < 0 || (m === 0 && now.getDate() < b.getDate()) ? 1 : 0
    const y = years - adj
    const months =
        (now.getFullYear() - b.getFullYear()) * 12 +
        (now.getMonth() - b.getMonth()) -
        (now.getDate() < b.getDate() ? 1 : 0)
    if (y <= 0) return `${months} mėn.`
    return `${y} m.`
}

export const cats: CatDoc[] = Object.entries(rawModules)
    .map(([_, raw]) => {
        const parsed = fm<CatFrontmatter>(raw)
        const data = parsed.attributes
        const slug = slugify(data.name)
        const html = marked.parse(parsed.body) as string
        return { ...data, slug, html }
    })
    .sort((a, b) => a.name.localeCompare(b.name))

export function getCatBySlug(slug: string) {
    return cats.find((c) => c.slug === slug)
}

export function getLitters() {
    const map = new Map<string, CatDoc[]>()
    for (const c of cats) {
        if (!c.litter) continue
        if (!map.has(c.litter)) map.set(c.litter, [])
        map.get(c.litter)!.push(c)
    }
    for (const [, arr] of map) arr.sort((a, b) => a.name.localeCompare(b.name))
    return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]))
}

export function formatDate(d: string) {
    const date = new Date(d)
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export const ageString = computeAge


type LitterPhoto = { url: string; num: number }

const litterPhotoIndex: Map<string, string[]> = (() => {
    const byLitter = new Map<string, LitterPhoto[]>()

    for (const [path, url] of Object.entries(litterPhotoModules)) {
        const file = path.split('/').pop()! // e.g. "A2025-05-1.jpeg"
        // Capture everything up to the last "-<number>" as litterId
        const m = file.match(/^(.*)-(\d+)\.(?:jpe?g|png)$/i)
        if (!m) continue
        const litterId = m[1]
        const num = parseInt(m[2], 10)
        if (!byLitter.has(litterId)) byLitter.set(litterId, [])
        byLitter.get(litterId)!.push({ url, num })
    }

    // sort numerically and store just URLs
    const index = new Map<string, string[]>()
    for (const [id, arr] of byLitter) {
        arr.sort((a, b) => a.num - b.num)
        index.set(id, arr.map((p) => p.url))
    }
    return index
})()

/** Get all group photos for a litter (sorted by number ascending). */
export function getLitterPhotos(litterId: string): string[] {
    return litterPhotoIndex.get(litterId) ?? []
}