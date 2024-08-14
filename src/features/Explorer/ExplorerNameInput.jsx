import { useState } from "react";

export default function ExplorerNameInput() {
  const [windowName, setWindowName] = useState("Project");
  const [editWindowName, setEditWindowName] = useState(false);

  return (
    <div className="explorerName">
      {editWindowName && (
        <input
          type="text"
          value={windowName}
          onChange={(e) => setWindowName(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? setEditWindowName(false) : "")}
        />
      )}
      {!editWindowName && (
        <p onClick={() => setEditWindowName(true)}>{windowName}</p>
      )}
    </div>
  );
}
