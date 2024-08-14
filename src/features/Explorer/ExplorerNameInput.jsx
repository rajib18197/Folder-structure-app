import { useState } from "react";

export default function ExplorerNameInput() {
  const [windowName, setWindowName] = useState("");
  const [editWindowName, setEditWindowName] = useState(true);

  return (
    <div>
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
