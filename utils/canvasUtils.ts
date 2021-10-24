import V2 from "./V2";

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  pointA: V2,
  pointB: V2,
  lineWidth: number,
  color: string
) => {
  ctx.beginPath();
  ctx.moveTo(pointA.x, pointA.y);
  ctx.lineTo(pointB.x, pointB.y);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
};
