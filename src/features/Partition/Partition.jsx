import { root } from "./data";

export default function PartitionContainer() {
  const partitionRoot = root;

  return (
    <div className="root-partition">
      <Partition childs={partitionRoot.childrens} />
    </div>
  );
}

function Partition({ childs, classNames = "" }) {
  const colors = [
    "#FF5733", // Red Orange
    "#33FF57", // Lime Green
    "#3357FF", // Blue
    "#FF33A8", // Pink
    "#57FFC1", // Aquamarine
    "#FFA533", // Orange
    "#B833FF", // Purple
    "#33FFD7", // Turquoise
    "#FF3385", // Hot Pink
    "#33A8FF", // Sky Blue
    "#FF5733", // Coral
    "#A8FF33", // Chartreuse
    "#5733FF", // Indigo
    "#FF33B8", // Magenta
    "#33FF85", // Mint
    "#FFD733", // Yellow
    "#8D33FF", // Lavender
    "#33FFA5", // Sea Green
    "#FF3333", // Bright Red
    "#33D7FF", // Light Blue
  ];

  return childs.map((child) => {
    return (
      <div
        key={child.userName}
        className={`partition${classNames}`}
        style={
          child.childrens.length > 0
            ? {
                display: "flex",
                flexDirection: child.isHorizontal ? "column" : "row",
                height: "100%",
              }
            : classNames
            ? { height: "100%", width: "100%" }
            : {}
        }
      >
        {child.childrens.length > 0 ? (
          //   <div
          //     className={`sub-partition-root ${child.userName}`}
          //     style={{
          //       flexDirection: `${child.isHorizontal ? "column" : "row"}`,
          //     }}
          //   >
          <Partition childs={child.childrens} classNames={"-child"} />
        ) : (
          //   </div>
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor:
                colors[Math.trunc(Math.floor(Math.random() * colors.length))],
            }}
          >
            <span>{child.userName}</span>
            <button>V</button>
            <button>H</button>
          </div>
        )}
      </div>
    );
  });
}
