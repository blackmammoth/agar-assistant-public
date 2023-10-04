'use client';

import { ThemeProvider } from "next-themes";


const ThemeProviders = ({children}) => {
  return (
    <ThemeProvider defaultTheme='light' attribute='class'>
        {children}
    </ThemeProvider>
  )
}

export default ThemeProviders