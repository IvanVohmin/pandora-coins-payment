import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="h-[80vh] w-full flex items-center justify-center flex-col gap-3">
      <h1 className="text-2xl tracking-tight font-bold">Страница не найдена</h1>
      <Link href="/" className="text-sky-600">
        На главную
      </Link>
    </section>
  );
}
