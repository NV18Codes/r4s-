"use client";
import { useEffect, useRef } from 'react';

export default function CrackDetectionCanvas({ 
  originalImageUrl, 
  cracks = [], 
  severity,
  crackCount 
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !originalImageUrl) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the original image
      ctx.drawImage(img, 0, 0);

      // Draw crack annotations
      cracks.forEach((crack, index) => {
        const { x, y, width, height, points } = crack;
        
        // Choose color based on severity
        let color = '#FFD700'; // Yellow for Low
        if (severity === 'Medium') color = '#FFA500'; // Orange
        if (severity === 'High') color = '#FF0000'; // Red

        // Draw bounding box around crack
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, width, height);

        // Draw crack points
        if (points && Array.isArray(points)) {
          ctx.fillStyle = color;
          points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
            ctx.fill();
          });
        }

        // Draw crack number label
        ctx.fillStyle = color;
        ctx.fillRect(x - 2, y - 25, 30, 20);
        ctx.fillStyle = '#000';
        ctx.font = 'bold 14px Arial';
        ctx.fillText(`${index + 1}`, x + 5, y - 8);
      });

      // Draw legend
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillRect(10, 10, 220, 120);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, 220, 120);

      ctx.fillStyle = '#000';
      ctx.font = 'bold 16px Arial';
      ctx.fillText('Crack Detection Results', 15, 30);
      ctx.font = '14px Arial';
      ctx.fillText(`Total Cracks: ${crackCount}`, 15, 50);
      ctx.fillText(`Severity: ${severity}`, 15, 70);
      
      // Legend colors
      ctx.fillStyle = '#FFD700';
      ctx.fillText('• Low', 15, 90);
      ctx.fillStyle = '#FFA500';
      ctx.fillText('• Medium', 80, 90);
      ctx.fillStyle = '#FF0000';
      ctx.fillText('• High', 150, 90);

      // Update container to show canvas at proper size
      if (containerRef.current) {
        const maxWidth = containerRef.current.offsetWidth;
        if (img.width > maxWidth) {
          canvas.style.width = '100%';
          canvas.style.height = 'auto';
        } else {
          canvas.style.width = `${img.width}px`;
          canvas.style.height = `${img.height}px`;
        }
      }
    };

    img.src = originalImageUrl;
  }, [originalImageUrl, cracks, severity, crackCount]);

  return (
    <div ref={containerRef} className="w-full border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100">
      <canvas 
        ref={canvasRef} 
        className="w-full h-auto block mx-auto"
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
}
