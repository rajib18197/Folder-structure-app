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

  const [folderInput, setFolderInput] = useState({
    showInput: false,
    folderName: "",
  });

  function handleNewFileCreationClick() {
    const newTree = new Tree([[fileInput.fileName]]);
    console.log(newTree.root);

    setData((data) => [...data, newTree.root]);
  }

  function handleNewFolderCreationClick() {
    const newTree = new Tree([[folderInput.folderName]]);
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
          onClick={() => {
            setFolderInput((folder) => ({
              ...folder,
              showInput: false,
              folderName: "",
            }));
            setFileInput((file) => ({ ...file, showInput: !file.showInput }));
          }}
        >
          <ion-icon name="document-outline"></ion-icon>
          File
        </button>

        <button
          onClick={() => {
            setFileInput((file) => ({
              ...file,
              showInput: false,
              fileName: "",
            }));

            setFolderInput((folder) => ({
              ...folder,
              showInput: !folder.showInput,
            }));
          }}
        >
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

        {folderInput.showInput && (
          <input
            onChange={(e) =>
              setFolderInput((folder) => ({
                ...folder,
                folderName: e.target.value,
              }))
            }
            onKeyDown={(e) =>
              e.key === "Enter" ? handleNewFolderCreationClick() : ""
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
  const [isOpen, setIsOpen] = useState(node.childrens.length ? true : false);

  return (
    <div className="parent">
      <div className="name" onClick={() => setIsOpen((open) => !open)}>
        {node.name.includes(".") ? (
          <ion-icon name="document-outline"></ion-icon>
        ) : (
          <>
            {isOpen ? (
              <ion-icon name="chevron-down-outline"></ion-icon>
            ) : (
              <ion-icon name="chevron-forward-outline"></ion-icon>
            )}
            <ion-icon name="folder-outline"></ion-icon>
          </>
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
