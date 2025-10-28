"use client";
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

export default function ImageViewer({ 
  originalImageUrl, 
  annotatedImageUrl,
  cracks = [], 
  severity,
  crackCount,
  inspectionId 
}) {
  const [activeTab, setActiveTab] = useState('original');
  const [downloading, setDownloading] = useState(false);
  const containerRef = useRef(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!originalImageUrl) return;
    
    const img = new Image();
    img.onload = () => {
      console.log('Image loaded:', { width: img.width, height: img.height, url: originalImageUrl });
      setImageDimensions({ width: img.width, height: img.height });
    };
    img.onerror = (e) => {
      console.error('Image failed to load:', originalImageUrl, e);
      setImageDimensions({ width: 800, height: 600 }); // Fallback dimensions
    };
    img.src = originalImageUrl;
  }, [originalImageUrl]);

  const downloadImage = async (imageUrl, filename) => {
    setDownloading(true);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('Image downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download image');
    } finally {
      setDownloading(false);
    }
  };

  const getSeverityColor = (severityLevel) => {
    switch (severityLevel) {
      case 'High': return '#FF0000';
      case 'Medium': return '#FFA500';
      case 'Low': return '#FFD700';
      default: return '#808080';
    }
  };

  const color = getSeverityColor(severity);

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('original')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'original'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📷 Original Image
        </button>
        <button
          onClick={() => setActiveTab('annotated')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'annotated'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🤖 AI Detection ({crackCount || 0} cracks)
        </button>
      </div>

      {/* Image Display with Overlays */}
      <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-50" ref={containerRef}>
        <div className="relative w-full" style={{ position: 'relative' }}>
          {/* Background Image */}
          <img 
            src={originalImageUrl} 
            alt={activeTab === 'original' ? 'Original road image' : 'AI annotated image'}
            className="w-full h-auto block"
            style={{ display: 'block' }}
          />

          {/* Crack Overlays - Only show in annotated tab */}
          {activeTab === 'annotated' && cracks.length > 0 && (
            <div 
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }}
            >
              {cracks.map((crack, index) => {
                // Calculate percentage-based positioning
                const leftPercent = (crack.x / imageDimensions.width) * 100;
                const topPercent = (crack.y / imageDimensions.height) * 100;
                const widthPercent = (crack.width / imageDimensions.width) * 100;
                const heightPercent = (crack.height / imageDimensions.height) * 100;

                return (
                  <div key={index} style={{ position: 'absolute' }}>
                    {/* Bounding Box */}
                    <div
                      style={{
                        position: 'absolute',
                        left: `${leftPercent}%`,
                        top: `${topPercent}%`,
                        width: `${widthPercent}%`,
                        height: `${heightPercent}%`,
                        border: `3px solid ${color}`,
                        pointerEvents: 'none'
                      }}
                    />
                    
                    {/* Crack Label */}
                    <div
                      style={{
                        position: 'absolute',
                        left: `${leftPercent}%`,
                        top: `calc(${topPercent}% - 25px)`,
                        backgroundColor: color,
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        pointerEvents: 'none'
                      }}
                    >
                      Crack {crack.id || index + 1}
                    </div>

                    {/* Points */}
                    {crack.points && crack.points.map((point, pointIndex) => {
                      const pointLeftPercent = (point.x / imageDimensions.width) * 100;
                      const pointTopPercent = (point.y / imageDimensions.height) * 100;
                      
                      return (
                        <div
                          key={pointIndex}
                          style={{
                            position: 'absolute',
                            left: `${pointLeftPercent}%`,
                            top: `${pointTopPercent}%`,
                            width: '6px',
                            height: '6px',
                            backgroundColor: color,
                            borderRadius: '50%',
                            pointerEvents: 'none',
                            transform: 'translate(-50%, -50%)'
                          }}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}

          {/* Download Button */}
          <div 
            className="absolute top-4 right-4"
            style={{ position: 'absolute', top: '16px', right: '16px' }}
          >
            <button
              onClick={() => downloadImage(
                originalImageUrl, 
                activeTab === 'original' 
                  ? `original-road-${inspectionId}.jpg` 
                  : `ai-detection-${inspectionId}.jpg`
              )}
              disabled={downloading}
              className="bg-white/90 hover:bg-white text-gray-800 px-3 py-2 rounded-lg shadow-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {downloading ? '⏳' : '⬇️'} Download
            </button>
          </div>
        </div>
      </div>

      {/* Detection Summary */}
      {activeTab === 'annotated' && crackCount !== undefined && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <div>
                <p className="font-semibold text-gray-900">AI Detection Complete</p>
                <p className="text-sm text-gray-600">
                  Found {crackCount} crack(s) with {severity || 'Low'} severity
                </p>
              </div>
            </div>
            {crackCount > 0 && (
              <div className="text-right">
                <div className="text-sm text-gray-600">Work Order</div>
                <div className="text-lg font-bold text-green-600">✅ Created</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
