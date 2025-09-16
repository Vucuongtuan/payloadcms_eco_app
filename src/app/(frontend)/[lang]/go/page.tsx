import { query } from '@/utils/tryCatch';
import { notFound, redirect } from 'next/navigation';





interface RedirectPageProps {
    params: Promise<{ lang: string }>;
    searchParams: Promise<{ to?: string, type?: 'backlink' | 'internal', collection?: string }>;
}

async function fetchDocument(collection: string, slug: string, lang: string) {
    return query(async (payload) => {
        const [data, error] = await payload.find({
            collection,
            where: {
                slug: {
                    equals: slug
                },
                ...(lang ? { lang: { equals: lang } } : {})
            },
            limit: 1
        });
        if (error) {
            console.log("Error fetching redirect document:", error);
            throw new Error(error.message);
        }
        return data?.docs?.[0] || null;
    })
}

export default async function GoPage({ params, searchParams }: RedirectPageProps) {
    const { lang } = await params;
    const { to, type, collection } = await searchParams;

    // internal =>> /{lang}/redirect?to={slug}&type=internal&collection=pages
    if (type === 'internal' && collection && to && !Array.isArray(to)) {
        const doc = await fetchDocument(collection, to, lang);
        if (!doc) {
            notFound();
        }
        const url = `/${lang}/${collection !== 'pages' ? collection + '/' : ''}${to}`
        // Assuming the slug is the path
        return redirect(url);
    }

    // backlink =>> /{lang}/redirect?to=https://example.com&type=backlink
    if (type === 'backlink' && to && !Array.isArray(to)) {
        return redirect(to);
    }

    return notFound();
}