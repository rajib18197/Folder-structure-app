import { useState } from "react";

export default function ExplorerNameInput({ isOpen, onToggle }) {
  const [windowName, setWindowName] = useState("Project");
  const [editWindowName, setEditWindowName] = useState(false);

  return (
    <div className="explorerName">
      <span onClick={onToggle}>
        {isOpen ? (
          <ion-icon name="chevron-down-outline"></ion-icon>
        ) : (
          <ion-icon name="chevron-forward-outline"></ion-icon>
        )}
      </span>

      {editWindowName && (
        <input
          type="text"
          value={windowName}
          onChange={(e) => setWindowName(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? setEditWindowName(false) : "")}
        />
      )}

      {!editWindowName && (
        <p className="explorer-title" onClick={() => setEditWindowName(true)}>
          {windowName}
        </p>
      )}
    </div>
  );
}
