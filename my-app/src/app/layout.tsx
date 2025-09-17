export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>=== Root Layout ===</header>
        <main>{children}</main>
      </body>
    </html>
  );
}