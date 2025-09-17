export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>*** Blog Layout Header ***</header>
        <main>{children}</main>
        <footer>*** Blog Layout Footer ***</footer>
      </body>
    </html>
  );
}