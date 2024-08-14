import Editors from "./Editors";
import Explorer from "./features/Explorer/Explorer";

export default function AppLayout() {
  return (
    <div className="app">
      <Explorer />
      <Editors />
    </div>
  );
}
