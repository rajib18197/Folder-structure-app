import { useState } from "react";

export default function FileFolder({ node, onSelect }) {
  const [isOpen, setIsOpen] = useState(node.childrens.length ? true : false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  const [fileInput, setFileInput] = useState({
    showInput: false,
    fileName: "",
  });

  const [folderInput, setFolderInput] = useState({
    showInput: false,
    folderName: "",
  });

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsContextMenuOpen(true);
  }

  function handleNewFileCreationClick() {
    onSelect(node, fileInput.fileName);
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
    <div className="parent" onContextMenu={handleClick}>
      {isContextMenuOpen && (
        <div className="btns btns--top">
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
      )}
      {node.name.includes(".") ? (
        <div className="details file-details name">
          <ion-icon name="document-outline"></ion-icon>
          <span>{node.name}</span>
        </div>
      ) : (
        <div
          className={`details folder-details name ${
            isContextMenuOpen ? "context-active" : ""
          }`}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <ion-icon name="chevron-down-outline"></ion-icon>
          ) : (
            <ion-icon name="chevron-forward-outline"></ion-icon>
          )}
          <ion-icon name="folder-outline"></ion-icon>

          <span>{node.name}</span>
        </div>
      )}

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

      {node.childrens.length ? (
        <div className={`child ${isOpen ? "open" : "close"}`}>
          {node.childrens.map((child) => (
            <FileFolder node={child} key={child.id} onSelect={onSelect} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
