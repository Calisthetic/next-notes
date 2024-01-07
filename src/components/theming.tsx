import { useTheme } from 'next-themes'
import { FunctionComponent, useEffect } from 'react';
import IconLight from './icons/icon-light';
import IconDark from './icons/icon-dark';
import useLocalStorage from '../lib/hooks/useLocalStorage';

interface ThemingProps {
  
}
 
const Theming: FunctionComponent<ThemingProps> = () => {
  const [value, setValue] = useLocalStorage("theme", "")
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setTheme(value)
  }, [value])


  return (
    <button className="mr-1" onClick={() => setValue(value === "dark" ? "light" : "dark")}>
      {theme === "dark" ? (
        <IconLight classes="h-6 w-6 fill-white"></IconLight>
      ) : (
        <IconDark classes="h-6 w-6 fill-black"></IconDark>
      )}
    </button>
  );
}
 
export default Theming;