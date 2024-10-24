import { createContext, memo, useContext, useState } from "react";

const DarkModeContext = createContext({});

function Button({ children, ...rest }) {
  const { isDarkMode } = useContext(DarkModeContext);
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
  const { toggleDarkMode } = useContext(DarkModeContext);
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

const Main = memo(function Main() {
  const { isDarkMode } = useContext(DarkModeContext);
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
});

function App() {
  const [isDarkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((v) => !v);
  const contextValue = { isDarkMode, toggleDarkMode };
  return (
    <DarkModeContext.Provider value={contextValue}>
      <Main />
    </DarkModeContext.Provider>
  );
}

export default App;
