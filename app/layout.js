import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "Student CRUD",
  description: "Next.js CRUD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
