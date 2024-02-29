export default async function VehiclesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="flex grow">{children}</main>;
}
