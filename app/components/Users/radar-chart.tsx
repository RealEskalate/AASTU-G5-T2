"use client";

import { useEffect, useRef } from "react";

export default function RadarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 600;
    canvas.height = 600;

    // Center of the chart
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;

    // Draw the radar chart
    drawRadarChart(ctx, centerX, centerY, radius);
  }, []);

  const drawRadarChart = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number
  ) => {
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Number of axes
    const numAxes = 5;
    const angleStep = (Math.PI * 2) / numAxes;

    // Draw the grid lines (5 levels)
    for (let level = 1; level <= 5; level++) {
      const levelRadius = (radius * level) / 5;
      ctx.beginPath();
      for (let i = 0; i <= numAxes; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + levelRadius * Math.cos(angle);
        const y = centerY + levelRadius * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = "#e5e7eb"; // Light gray
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw the axes
    for (let i = 0; i < numAxes; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = "#e5e7eb"; // Light gray
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw axis labels
      const labels = [
        "Attendance",
        "Completion",
        "Consistency",
        "First Education Phase",
        "Camp Phase I",
      ];
      const labelX = centerX + (radius + 20) * Math.cos(angle);
      const labelY = centerY + (radius + 20) * Math.sin(angle);

      ctx.fillStyle = "#9ca3af"; // Gray text
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(labels[i], labelX, labelY);
    }

    // Draw the NaN indicator in the center
    ctx.fillStyle = "#10b981"; // Green background
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white"; // White text
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("NaN", centerX, centerY);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <canvas ref={canvasRef} className="max-w-full"></canvas>
    </div>
  );
}
