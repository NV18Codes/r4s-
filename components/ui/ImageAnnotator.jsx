"use client";
import { useEffect, useRef } from 'react';

export default function ImageAnnotator({ imageUrl, cracks = [], severity }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !imageUrl) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image
      ctx.drawImage(img, 0, 0);

      // Draw crack annotations
      cracks.forEach((crack, index) => {
        const { x, y, width, height } = crack;
        
        // Choose color based on severity
        let color = '#FFD700'; // Yellow for Low
        if (severity === 'Medium') color = '#FFA500'; // Orange
        if (severity === 'High') color = '#FF0000'; // Red

        // Draw bounding box
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, width, height);

        // Draw crack points
        if (crack.points && Array.isArray(crack.points)) {
          ctx.fillStyle = color;
          crack.points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
            ctx.fill();
          });
        }

        // Draw crack number
        ctx.fillStyle = '#000';
        ctx.font = 'bold 20px Arial';
        ctx.fillBackground = true;
        ctx.fillRect(x, y - 25, 40, 25);
        ctx.fillStyle = '#FFF';
        ctx.fillText(`${index + 1}`, x + 10, y - 8);
      });

      // Draw legend
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(10, 10, 200, 100);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, 200, 100);

      ctx.fillStyle = '#000';
      ctx.font = 'bold 16px Arial';
      ctx.fillText('Crack Detection', 15, 35);
      ctx.font = '14px Arial';
      ctx.fillText(`Total: ${cracks.length} cracks`, 15, 55);
      ctx.fillText(`Severity: ${severity}`, 15, 75);
      
      // Legend colors
      ctx.fillStyle = '#FFD700';
      ctx.fillText('•', 15, 95);
      ctx.fillStyle = '#FFA500';
      ctx.fillText('•', 80, 95);
      ctx.fillStyle = '#FF0000';
      ctx.fillText('•', 145, 95);
      
      ctx.fillStyle = '#000';
      ctx.font = '12px Arial';
      ctx.fillText('Low', 25, 95);
      ctx.fillText('Med', 90, 95);
      ctx.fillText('High', 155, 95);

      // Update container to show canvas at proper size
      if (containerRef.current) {
        const maxWidth = containerRef.current.offsetWidth;
        const aspectRatio = img.width / img.height;
        if (img.width > maxWidth) {
          canvas.style.width = '100%';
          canvas.style.height = 'auto';
        } else {
          canvas.style.width = `${img.width}px`;
          canvas.style.height = `${img.height}px`;
        }
      }
    };

    img.src = imageUrl;
  }, [imageUrl, cracks, severity]);

  return (
    <div ref={containerRef} className="w-full border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100">
      <canvas 
        ref={INTERNATIONAL} 
        className="w-full h-auto block mx-auto"
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
}

