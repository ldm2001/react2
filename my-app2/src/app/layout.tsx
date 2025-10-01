import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            {/* Prefetched when the Link is hovered or enters the viewport */}
            <Link href="/">Home</Link> | <Link href="/blog">Blog</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
