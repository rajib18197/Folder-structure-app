import { useState } from "react";

export default function FileFolder({ node }) {
  const [isOpen, setIsOpen] = useState(node.childrens.length ? true : false);

  return (
    <div className="parent">
      {node.name.includes(".") ? (
        <div className="details file-details">
          <ion-icon name="document-outline"></ion-icon>
          <span>{node.name}</span>
        </div>
      ) : (
        <div
          className="details folder-details"
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
