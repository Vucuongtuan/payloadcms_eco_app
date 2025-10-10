import Link from "next/link";

export function Logo() {
  return (
    <div className="flex-shrink-0">
      <Link href="/" aria-label="Back to homepage" className="block">
        <div className="text-xl md:text-2xl lg:text-3xl font-bold text-black">
          Mood co.
        </div>
      </Link>
    </div>
  );
}
