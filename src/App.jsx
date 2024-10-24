import { createContext, memo, useContext, useState } from "react";

const DarkModeContext = createContext({});

function Button({ children, ...rest }) {
  const { isDarkMode } = useDarkMode();
  return (
    <button
      style={{
        backgroundColor: isDarkMode ? "#333" : "#ccc",
        border: "1px solid",
        color: "inherit",
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

function ToggleButton() {
  const { toggleDarkMode } = useDarkMode();
  return <Button onClick={toggleDarkMode}>Toggle mode</Button>;
}

const Header = memo(function Header() {
  return (
    <header
      style={{
        padding: "10px 5px",
        borderBottom: "1px solid",
        marginBottom: "10px",
        display: "flex",
        gap: "5px",
        justifyContent: "flex-end",
      }}
    >
      <Button>Products</Button>
      <Button>Services</Button>
      <Button>Pricing</Button>
      <ToggleButton />
    </header>
  );
});

function useDarkMode() {
  return useContext(DarkModeContext);
}

function Main() {
  const { isDarkMode } = useDarkMode();
  return (
    <main
      style={{
        color: isDarkMode ? "white" : "black",
        backgroundColor: isDarkMode ? "black" : "white",
        margin: "-8px",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <Header />
      <h1>Welcome to our business site!</h1>
    </main>
  );
}

function DarkModeProvider({ children }) {
  const [isDarkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((v) => !v);
  const contextValue = { isDarkMode, toggleDarkMode };
  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <Main />
    </DarkModeProvider>
  );
}

export default App;
