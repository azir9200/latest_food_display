import "../globals.css";

export default function RootLayout({}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          <p>Here is Root Layout</p>
        </div>
      </body>
    </html>
  );
}
