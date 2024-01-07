'use client'

import { FunctionComponent, useEffect, useState } from "react";
import IconLogo from "../icons/icon-logo";
import IconDark from "../icons/icon-dark";
import IconLight from "../icons/icon-light";
import useLocalStorage from "@/src/lib/hooks/useLocalStorage";
import Link from "next/link";
import Theming from "../theming";

interface HeaderProps {
  
}
 
const Header: FunctionComponent<HeaderProps> = () => {

  // local storage
  const [value, setValue] = useLocalStorage("theme", "")

  const [currentTheme, setCurrentTheme] = useState(value ? value :
  (typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light" : "dark"))
  
  if (typeof document !== 'undefined') {
    if (currentTheme === "light") {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  useEffect(() => {
    if (currentTheme === "light") {
      document.documentElement.classList.remove('dark')
      setValue("light")
    } else {
      document.documentElement.classList.add('dark')
      setValue("dark")
    }
  }, [currentTheme])

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
          <Theming></Theming>
        </div>
      </div>
    </nav>
  );
}
 
export default Header;