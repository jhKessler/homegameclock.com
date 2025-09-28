import Link from "next/link";
import { Timer } from "lucide-react";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 transition-opacity hover:opacity-80"
      aria-label="HomeGameClock Homepage"
    >
      <Timer className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold tracking-tighter text-white">
        HomeGame<span className="font-light text-primary">Clock</span>
      </span>
    </Link>
  );
}