export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <nav className="bg-gray-900 text-white p-4">
            </nav>
            {children}
        </section>
    )
}