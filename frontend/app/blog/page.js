import { Construction } from "lucide-react";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="card max-w-md w-full text-center p-8 space-y-4">
        <div className="flex flex-col items-center gap-3">
          <Construction className="w-12 h-12 text-[var(--color-primary)] animate-bounce" />
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">
            Blog Page
          </h1>
        </div>
        <p className="text-lg text-[var(--color-muted-foreground)]">
          🚧 This page is currently under construction 🚧
        </p>
        <button className="btn btn-primary mt-4">Go Back Home</button>
      </div>
    </main>
  );
}
