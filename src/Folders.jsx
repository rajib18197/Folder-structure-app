import { useState } from "react";
import { root } from "./data/tree";

export default function Folders() {
  const [data, setData] = useState(root);

  return (
    <div className="folders">
      <h4 className="folders__title">Explorer</h4>
      <header className="folders__header">
        <p>Files-Folders</p>
        <button>📁 Folder</button>
        <button>📁 File</button>
      </header>

      <main className="folders__main">
        {/* {data.map((node) => ( */}
        <Folder node={data} />
        {/* ))} */}
      </main>
    </div>
  );
}

function Folder({ node }) {
  const [isOpen, setIsOpen] = useState(node.childrens.length ? true : false);

  return (
    <div className="parent">
      <div className="name" onClick={() => setIsOpen((open) => !open)}>
        {node.childrens.length ? <span>{isOpen ? "🔽" : "▶️"}</span> : null}
        <span>{node.name}</span>
      </div>

      {node.childrens.length ? (
        <div className={`child ${isOpen ? "open" : "close"}`}>
          {node.childrens.map((child) => (
            <Folder node={child} key={child.id} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
