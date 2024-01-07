'use client'

import { useTheme } from 'next-themes'
import IconLight from '../icons/icon-light';
import IconDark from '../icons/icon-dark';
import useLocalStorage from '../../lib/hooks/useLocalStorage';
import { useEffect } from 'react';

export default function Theming() {
  const [value, setValue] = useLocalStorage("theme", "")
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (value) {
      setTheme(value)
    }
  }, [value])


  return (
    <button className="mr-1" onClick={() => setValue(value === "dark" ? "light" : "dark")}>
      {value === "dark" ? (
        <IconLight classes="h-6 w-6 fill-white"></IconLight>
      ) : (
        <IconDark classes="h-6 w-6 fill-black"></IconDark>
      )}
    </button>
  );
}