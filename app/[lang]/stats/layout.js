import SectionWrapper from "@/components/SectionWrapper";

export default function StatsLayout({ children, }) {
    return(
    <SectionWrapper className="custom-screen" suppressHydrationWarning>
        {children}
    </SectionWrapper>
    )
}