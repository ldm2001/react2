// src > app > layout.tsx >
import Link from "next/link";
import ThemeProvider from "@/components/theme-provider";
import ThemeStatus from "@/components/theme-status";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <header>
            <h1>== Root Layout Header ==</h1>
            <nav>
              <Link href="/">Home</Link> | <Link href="/counter">Counter</Link> | <Link href="/about">About</Link>
              <br />
              <Link href="/react">React</Link> | <Link href="/backup">Backup</Link>
              <br />
              <Link href="/server-render">Server Render</Link>
              <br />
              <Link href="/dynamic-routes/dynamic-routes">LinkSub</Link> | <Link href="/dynamic-routes/link-sub-abc">LinkSub2</Link>
              <br />
              # interleaving 예제 : <Link href="/interleaved">interLeaving 예제</Link>
            </nav>
            <ThemeStatus />
          </header>
          <main>
            {children}
          </main>
          <footer>
            <p>== Root Layout Footer ==</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}