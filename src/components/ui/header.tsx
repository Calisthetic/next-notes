'use client'

import Link from "next/link";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import IconLogo from "../icons/icon-logo";
import IconDark from "../icons/icon-dark";
import IconLight from "../icons/icon-light";

interface HeaderProps {
  
}
 
const Header: FunctionComponent<HeaderProps> = () => {

  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') === null ? 
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light") : localStorage.getItem('theme'))
  
  if (currentTheme === "dark") {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  const ChangeTheme = useCallback((theme:string) => {
    if (theme === currentTheme) return
    setCurrentTheme(theme)

    if (theme === "system") {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
        localStorage.setItem("theme", "dark")
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem("theme", "light")
      }
    } else if (theme === "light") {
      document.documentElement.classList.remove('dark')
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem("theme", "dark")
    }
  }, [currentTheme])

  useEffect(() => {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", PrefersThemeChangedHandler)

    if (currentTheme === "light") {
      document.documentElement.classList.remove('dark')
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem("theme", "dark")
    }
    
    function PrefersThemeChangedHandler() {
      if (!('theme' in localStorage)) {
        ChangeTheme("system")
      }
    }

    return () => window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", PrefersThemeChangedHandler)
  }, [ChangeTheme])
  let token = localStorage.getItem("token")

  return (
    <nav className="fixed top-0 z-40 h-12 px-1 sm:px-2 w-full">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center justify-start">
          <Link href="/" className="flex ml-1 sm:ml-2 md:mr-24">
            <div>
              <IconLogo classes="h-8 w-8 mr-1 sm:mr-3 fill-red-600"></IconLogo>
            </div>
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-foreground">Storage</span>
          </Link>
        </div>
        {/* User profile */}
        <div className="flex items-center gap-x-2 sm:gap-x-4 text-textLight dark:text-textDark">
          <button onClick={() => ChangeTheme(currentTheme === "dark" ? "light" : "dark")}>
            {currentTheme === "dark" ? (
              <IconLight classes="h-6 w-6 fill-white"></IconLight>
            ) : (
              <IconDark classes="h-6 w-6 fill-black"></IconDark>
            )}
          </button>
          {
            token ? (
              <Link href="/signin" className="bg-button first-letter:uppercase transition-all
              rounded-md px-3 py-1.5 text-sm font-medium hover:bg-button-hover">sign in</Link>
            ) : null
          }
        </div>
      </div>
    </nav>
  );
}
 
export default Header;