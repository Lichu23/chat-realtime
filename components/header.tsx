import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="py-4">
      <nav className="px-4 lg:px-10  flex items-center justify-between">
        <ul className="flex gap-10 text-sm font-medium">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/chat">Chat</Link>
          </li>

          <li>
            <Link href="https://github.com/Lichu23">Who am I?</Link>
          </li>
        </ul>

        <div className="flex items-center justify-between gap-6">
          <ThemeToggle />

          <SignedOut>
            <SignInButton mode="modal">
              <Button size="sm">Sign in</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
