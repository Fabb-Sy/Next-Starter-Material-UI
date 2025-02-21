import ThemeRegistry from "./themeRegistry"

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeRegistry>
      {children}
    </ThemeRegistry>
  )
}

export default GlobalProvider