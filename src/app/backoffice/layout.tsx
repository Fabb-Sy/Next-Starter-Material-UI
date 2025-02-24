import BackofficeLayout from "./BackofficeLayout";

export default function BackofficeRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BackofficeLayout>
      {children}
    </BackofficeLayout>
  );
}
