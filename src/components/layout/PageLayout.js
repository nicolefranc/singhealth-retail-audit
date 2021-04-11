export const PageTitle = ({ title }) => <h1 className="mb-5 text-3xl md:text-5xl font-semibold tracking-wide">{ title }</h1>
export const PageSubtitle = ({ title }) => <h3 className="text-base uppercase">{ title }</h3>
export const SectionTitle = ({ title }) => <h2 className="font-medium text-lg uppercase tracking-wide pb-2 mb-6 border-gray-200 border-b-2">{ title }</h2>
export const Section = ({ children }) => <section className="py-10">{ children }</section>

export const PageHeader = ({ title, children }) => {
    return (
        <>
            <PageTitle title={title} />
            { children }
        </>
    )
}