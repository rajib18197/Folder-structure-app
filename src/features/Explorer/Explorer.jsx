import { useState } from "react";
import { Tree } from "../../data/tree";
import ExplorerNameInput from "./ExplorerNameInput";
import FileFolder from "./FileFolder";

const data = [
  ["DSA", "Linked List", "Doubly LL", "Reverse-A-Doubly-LL.js"],
  ["DSA", "Linked List", "Circular LL", "Detect-and-Remove-a-Loop.js"],
  ["DSA", "Stack", "Design-A-Stack-with-Queue.js"],
];

const tree = new Tree(data);
const initialData = [tree.root];

export default function Explorer() {
  const [data, setData] = useState(initialData);
  const [isOpen, setIsOpen] = useState(true);

  const [fileInput, setFileInput] = useState({
    showInput: false,
    fileName: "",
  });

  const [folderInput, setFolderInput] = useState({
    showInput: false,
    folderName: "",
  });

  function handleToggleExplorerClick() {
    setIsOpen((open) => !open);
  }

  function handleNewFileCreationClick() {
    const newTree = new Tree([[fileInput.fileName]]);
    setData((data) => [...data, newTree.root]);
    setFileInput((file) => ({ ...file, showInput: false, fileName: "" }));
  }

  function handleNewFolderCreationClick() {
    const newTree = new Tree([[folderInput.folderName]]);
    setData((data) => [...data, newTree.root]);
    setFolderInput((folder) => ({
      ...folder,
      showInput: false,
      folderName: "",
    }));
  }

  return (
    <div className="folders">
      <h4 className="folders__title">
        Explorer <span>...</span>
      </h4>
      <header className="folders__header">
        <ExplorerNameInput
          isOpen={isOpen}
          onToggle={handleToggleExplorerClick}
        />
        <div className="btns">
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
            File+
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
            <ion-icon name="folder-outline"></ion-icon>
            Folder+
          </button>
        </div>
      </header>

      {isOpen && (
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
            <FileFolder node={node} key={crypto.randomUUID()} />
          ))}
        </main>
      )}
    </div>
  );
}
