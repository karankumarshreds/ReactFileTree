import React, { useState } from "react";
import ReactDOM from "react-dom";

const DATA = {
  id: 1,
  fileName: "src",
  children: [
    { id: 2, fileName: "app.tsx", children: null },
    { id: 3, fileName: "index.tsx", children: null },
    {
      id: 4,
      fileName: "hooks",
      children: [{ id: 5, fileName: "useState.tsx", children: null }]
    }
  ]
};

function App() {
  const [tree, setTree] = useState([
    { id: 1, fileName: "src", childOf: null, level: 0 },
    { id: 2, fileName: "app.tsx", childOf: 1, level: 1 },
    { id: 3, fileName: "index.tsx", childOf: 1, level: 1 },
    { id: 4, fileName: "hooks", childOf: 1, level: 1 },
    { id: 5, fileName: "useState.tsx", childOf: 4, level: 2 }
  ]);
  React.useEffect(() => {
    const arr = [];
    let counter = 1;
    const recursive = (children, parent) => {
      children.forEach(node => {
        if (!node.children) {
          arr.push({
            id: node.id,
            fileName: node.fileName,
            level: counter,
            childOf: parent
          })
        } else {
          counter += 1 
          recursive(node.children, node.id)
        }
      });
    }
    arr.push({ id: DATA.id, fileName: DATA.fileName, childOf: null, level: 0 })
    recursive(DATA.children, DATA.id);
    setTree(arr)
  }, [])

  return (
    <div className="App" style={{ fontWeight: 600, display: 'flex' }}>
      <pre>{JSON.stringify(DATA, null, 2)}</pre>
      <pre>
        {JSON.stringify(tree, null, 2)}
      </pre>
    </div>
  );
}

export default App
