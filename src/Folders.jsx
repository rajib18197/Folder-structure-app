import { useEffect, useRef, useState } from "react";
import { root, Tree } from "./data/tree";

export default function Folders() {
  const [data, setData] = useState([root]);
  const [windowName, setWindowName] = useState("");
  const [editWindowName, setEditWindowName] = useState(true);
  const [fileInput, setFileInput] = useState({
    showInput: false,
    fileName: "",
  });

  function handleNewFileCreationClick() {
    const newTree = new Tree([[fileInput.fileName]]);
    console.log(newTree.root);

    setData((data) => [...data, newTree.root]);
  }

  return (
    <div className="folders">
      <h4 className="folders__title">Explorer</h4>
      <header className="folders__header">
        <div>
          {editWindowName && (
            <input
              type="text"
              value={windowName}
              onChange={(e) => setWindowName(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" ? setEditWindowName(false) : ""
              }
            />
          )}
          {!editWindowName && (
            <p onClick={() => setEditWindowName(true)}>{windowName}</p>
          )}
        </div>
        <button
          onClick={() =>
            setFileInput((file) => ({ ...file, showInput: !file.showInput }))
          }
        >
          <ion-icon name="document-outline"></ion-icon>
          File
        </button>
        <button>
          <ion-icon name="folder-outline"></ion-icon> Folder
        </button>
      </header>

      <main className="folders__main">
        {fileInput.showInput && (
          <input
            onChange={(e) =>
              setFileInput((file) => ({ ...file, fileName: e.target.value }))
            }
            onKeyDown={(e) =>
              e.key === "Enter" ? handleNewFileCreationClick() : ""
            }
          />
        )}
        {data.map((node) => (
          <Folder node={node} key={crypto.randomUUID()} />
        ))}
      </main>
    </div>
  );
}

function Folder({ node }) {
  // console.log(node);

  const [isOpen, setIsOpen] = useState(node.childrens.length ? true : false);

  return (
    <div className="parent">
      <div className="name" onClick={() => setIsOpen((open) => !open)}>
        {node.childrens.length ? (
          isOpen ? (
            <ion-icon name="chevron-down-outline"></ion-icon>
          ) : (
            <ion-icon name="chevron-forward-outline"></ion-icon>
          )
        ) : (
          <ion-icon name="logo-nodejs"></ion-icon>
        )}
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
