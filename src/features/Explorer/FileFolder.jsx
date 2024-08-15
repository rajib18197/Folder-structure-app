import { useState } from "react";

export default function FileFolder({ node }) {
  const [isOpen, setIsOpen] = useState(node.childrens.length ? true : false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log(e);
    setIsContextMenuOpen(true);
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

      {node.childrens.length ? (
        <div className={`child ${isOpen ? "open" : "close"}`}>
          {node.childrens.map((child) => (
            <FileFolder node={child} key={child.id} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
