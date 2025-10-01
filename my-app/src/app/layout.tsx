import Link from "next/link";
import React from "react";

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
            {/* Prefetched when the link is hovered or enters the viewport */}
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>

            {/* 외부 링크는 <a> 태그 사용 */}
            <a href="https://google.com" target="_blank" rel="noopener noreferrer">
              Google with a tag
            </a>

            <a href="/blog" target="_blank" rel="noopener noreferrer">
              Blog with a tag
            </a>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

