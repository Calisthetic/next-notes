import IconLogo from "../icons/icon-logo";
import Link from "next/link";
import Theming from "./theming";
import { Suspense } from "react";
 
export default function Header() {
  return (
    <nav className="fixed bg-primary top-0 z-10 h-12 px-1 sm:px-2 w-full">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center justify-start">
          <Link href="/" className="flex gap-x-1">
            <IconLogo classes="w-8 h-8 fill-red-600"></IconLogo>
            <span className="self-center sm:text-xl text-lg font-semibold md:text-2xl whitespace-nowrap text-foreground text-red-600">NEXT NOTES</span>
          </Link>
        </div>
        {/* User profile */}
        <div className="flex items-center gap-x-2 sm:gap-x-4 text-textLight dark:text-textDark">
          <Suspense fallback={<div></div>}>
            <Theming></Theming>
          </Suspense>
        </div>
      </div>
    </nav>
  );
}