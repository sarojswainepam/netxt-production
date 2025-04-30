import Navbar from "../components/navbar";

export default function RootLayout({
    children,
}: Readonly<{
    params: { slug: string[] };
    searchParams: { [key: string]: string | string[] | undefined };
    children: React.ReactNode;
}>) {
    return (
        <main className="font-work-sans">
            <Navbar />
            {children}
        </main>
    );
}