import Link from "next/link";



interface CLinkProps {
    href: string;
    lang: string;
    type?: 'backlink' | 'internal';
    collection?: string;
    children?: React.ReactNode;
    [key: string]: any;

}


// A custom Link component that wraps use relationships and external links redirection
export default function LinkRedirect(props: CLinkProps) {
    const { href, lang, type = 'internal', collection, children, ...rest } = props;
    return <Link href={`/${lang}/go?to=${encodeURIComponent(href)}&type=${type}&collection=${collection || ''}`} {...rest}>{children}</Link>
}