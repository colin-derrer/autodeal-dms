import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1 className="text-4xl font-bold text-primary-foreground">404</h1>
      <p className="text-lg font-medium text-muted-foreground">
        Page not found
      </p>
      <Link href="/">Return to home</Link>
    </div>
  );
}
