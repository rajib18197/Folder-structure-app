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
const initialData = [tree];

export default function Explorer() {
  const [data, setData] = useState(initialData);
  const [isOpen, setIsOpen] = useState(true);
  console.log(data, 111);

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
    setData((data) => [...data, newTree]);
    setFileInput((file) => ({ ...file, showInput: false, fileName: "" }));
  }

  function handleNewFolderCreationClick() {
    const newTree = new Tree([[folderInput.folderName]]);
    setData((data) => [...data, newTree]);
    setFolderInput((folder) => ({
      ...folder,
      showInput: false,
      folderName: "",
    }));
  }

  function handleNewFileOnTreeClick(node, fileName) {
    const selectedTree = data.find((tree) => {
      return tree.findNode(tree.root, node.name);
    });

    const parentNode = selectedTree.findNode(selectedTree.root, node.name);
    selectedTree.createNode(parentNode.name, fileName);

    setData((data) =>
      data.map((tree) => {
        if (tree.root.name === selectedTree.root.name) {
          return selectedTree;
        }
        return tree;
      })
    );
  }

  function handleNewFolderOnTreeClick(node, folderName) {
    const selectedTree = data.find((tree) => {
      return tree.findNode(tree.root, node.name);
    });

    const parentNode = selectedTree.findNode(selectedTree.root, node.name);
    selectedTree.createNode(parentNode.name, folderName);

    setData((data) =>
      data.map((tree) => {
        if (tree.root.name === selectedTree.root.name) {
          return selectedTree;
        }
        return tree;
      })
    );
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

          {data.map((tree) => (
            <FileFolder
              node={tree.root}
              key={crypto.randomUUID()}
              onFileSelect={handleNewFileOnTreeClick}
              onFolderSelect={handleNewFolderOnTreeClick}
            />
          ))}
        </main>
      )}
    </div>
  );
}
