import type { IShapeDrawer, IShapeValues } from "tsparticles-engine";

export class HeartShape implements IShapeDrawer {
  draw(
    context: CanvasRenderingContext2D,
    particle: IShapeValues,
    radius: number
  ): void {
    const factor = 0.5;
    const x = particle.x || 0;
    const y = particle.y || 0;

    context.moveTo(x, y - radius / 3);

    context.bezierCurveTo(
      x - radius * factor,
      y - radius * 2 * factor,
      x - radius * 2 * factor,
      y,
      x,
      y + radius
    );

    context.bezierCurveTo(
      x + radius * 2 * factor,
      y,
      x + radius * factor,
      y - radius * 2 * factor,
      x,
      y - radius / 3
    );
  }
}
