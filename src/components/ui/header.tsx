import IconLogo from "../icons/icon-logo";
import Link from "next/link";
import Theming from "./theming";
import { Suspense } from "react";
 
export default function Header() {
  return (
    <nav className="fixed bg-primary top-0 z-40 h-10 sm:h-12 px-1 sm:px-2 w-full">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center justify-start">
          <Link href="/" className="flex ml-1 sm:ml-2 md:mr-24">
            <div>
              <IconLogo classes="h-6 w-6 sm:w-8 sm:h-8 mr-1 sm:mr-3 fill-red-600"></IconLogo>
            </div>
            <span className="self-center sm:text-xl text-base font-semibold md:text-2xl whitespace-nowrap text-foreground text-red-600">NEXT NOTES</span>
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