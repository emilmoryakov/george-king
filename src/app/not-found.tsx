import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-wide">Nothing here</h1>
        <p className="mt-2 text-zinc-500">
          This conversation doesn&apos;t exist — perhaps the king had it burned.
        </p>
        <Link href="/" className="mt-4 inline-block text-violet-400 hover:underline">
          Back to the court
        </Link>
      </div>
    </main>
  );
}
