import * as React from "react"
import * as ReactDOM from 'react-dom'
import craftXIconSrc from "./craftx-icon.png"

const App: React.FC<{}> = () => {
  const isDarkMode = useCraftDarkMode();

  React.useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }}>
    <img className="icon" src={craftXIconSrc} alt="CraftX logo" />
    <button className={`btn ${isDarkMode ? "dark" : ""}`} onClick={getSelectedText}>
      Hello world!
    </button>
  </div>;
}

async function getSelectedText() {
  const result = await craft.editorApi.getTextSelection()

  if (result.status !== "success") {
      throw new Error(result.message)
  }

  const selectedText = result.data;

  console.log(`Selected text range: ${selectedText}`);
}

function useCraftDarkMode() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    craft.env.setListener(env => setIsDarkMode(env.colorScheme === "dark"));
  }, []);

  return isDarkMode;
}

function insertHelloWorld() {
  const block = craft.blockFactory.textBlock({
    content: "Hello world!"
  });

  craft.dataApi.addBlocks([block]);
}

export function initApp() {
  ReactDOM.render(<App />, document.getElementById('react-root'))
}
