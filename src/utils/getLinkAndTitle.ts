


export const getLink = (doc: any) => {

    if (doc.checkTypeLink === 'backlink') {
        return doc.link
    } else if (doc.checkTypeLink === 'internal') {
        return `/${doc.localLink.slug}`
    }
    return '#'
}

export const getTitle = (doc: any) => {

    if (doc.type === 'backlink') {
        return doc.title || doc.url
    } else if (doc.type === 'internal') {
        return doc.linkLocal.title
    }
    return ''
}