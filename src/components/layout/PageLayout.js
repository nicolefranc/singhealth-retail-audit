import { useEffect, useState } from "react"

export const PageTitle = ({ title }) => <h1 className="mb-5 text-3xl md:text-5xl font-semibold tracking-wide">{ title }</h1>
export const PageSubtitle = ({ title }) => <h3 className="text-base uppercase">{ title }</h3>
export const SectionTitle = ({ title }) => <h2 className="font-medium text-lg uppercase tracking-wide pb-2 mb-6 border-gray-200 border-b-2">{ title }</h2>
export const Section = ({ children }) => <section className="pt-10 pb-5">{ children }</section>
export const PageContent = ({ children }) => <div className="p-6">{ children }</div>
export const PageHeading = ({ title, children }) => {
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    });

    const [scrolled, setScrolled] = useState(false)

    const handleScroll = e => {
        const y = window.scrollY;
        if (y > 50) setScrolled(true);
        else setScrolled(false);
    }
    return (
        <div className={`bg-gray-100 p-6 sticky top-0 z-2  ${!scrolled && `rounded-b-2xl`}`} onScroll={handleScroll}>
            { scrolled ? <h1 className="text-xl font-semibold">{ title }</h1>
                : <PageTitle title={title} /> }
            { !scrolled && children }
        </div>
    )
}