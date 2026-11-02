const dashboardPath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/gar2025-dashboard.html`;

export default function Home() {
  return (
    <main className="fixed inset-0">
      <iframe
        className="h-full w-full border-0"
        src={dashboardPath}
        title="GAR 2025 Resilience Pays policy intelligence dashboard"
      />
    </main>
  );
}
