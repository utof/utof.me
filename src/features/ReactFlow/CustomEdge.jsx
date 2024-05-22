import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  getBezierPath,
  useReactFlow,
} from "reactflow";

function getLabelPosition(sourceX, sourceY, targetX, targetY, percentage) {
  const x = sourceX + (targetX - sourceX) * percentage;
  const y = sourceY + (targetY - sourceY) * percentage;
  return [x, y];
}

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  percentage = 0.2,
}) {
  const { setEdges } = useReactFlow();
  const [edgePath, , , ,] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const [labelX, labelY] = getLabelPosition(
    sourceX,
    sourceY,
    targetX,
    targetY,
    percentage
  );

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            background: "#ffcc00",
            padding: 10,
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700,
          }}
          className="nodrag nopan"
        >
          delete
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
