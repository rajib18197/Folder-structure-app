import Editors from "./Editors";
import Folders from "./Folders";

export default function AppLayout() {
  return (
    <div className="app">
      <Folders />
      <Editors />
    </div>
  );
}
