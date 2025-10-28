"use client";
import { useState } from 'react';
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
          🤖 AI Detection ({crackCount} cracks)
        </button>
      </div>

      {/* Image Display */}
      <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-50">
        {activeTab === 'original' ? (
          <div className="relative">
            <img 
              src={originalImageUrl} 
              alt="Original road image" 
              className="w-full h-auto"
            />
            <div className="absolute top-4 right-4">
              <button
                onClick={() => downloadImage(originalImageUrl, `original-road-${inspectionId}.jpg`)}
                disabled={downloading}
                className="bg-white/90 hover:bg-white text-gray-800 px-3 py-2 rounded-lg shadow-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                {downloading ? '⏳' : '⬇️'} Download
              </button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <img 
              src={annotatedImageUrl || originalImageUrl} 
              alt="AI annotated image" 
              className="w-full h-auto"
            />
            <div className="absolute top-4 right-4">
              <button
                onClick={() => downloadImage(annotatedImageUrl || originalImageUrl, `ai-detection-${inspectionId}.jpg`)}
                disabled={downloading}
                className="bg-white/90 hover:bg-white text-gray-800 px-3 py-2 rounded-lg shadow-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                {downloading ? '⏳' : '⬇️'} Download
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Crack Overlay for Annotated View */}
      {activeTab === 'annotated' && cracks.length > 0 && (
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none">
            {cracks.map((crack, index) => {
              const color = severity === 'High' ? '#FF0000' : severity === 'Medium' ? '#FFA500' : '#FFD700';
              return (
                <div key={index}>
                  {/* Crack bounding box */}
                  <div
                    className="absolute border-2 pointer-events-none"
                    style={{
                      left: crack.x,
                      top: crack.y,
                      width: crack.width,
                      height: crack.height,
                      borderColor: color,
                      borderWidth: '3px'
                    }}
                  />
                  
                  {/* Crack points */}
                  {crack.points?.map((point, pointIndex) => (
                    <div
                      key={pointIndex}
                      className="absolute w-2 h-2 rounded-full pointer-events-none"
                      style={{
                        left: point.x - 4,
                        top: point.y - 4,
                        backgroundColor: color
                      }}
                    />
                  ))}
                  
                  {/* Crack number */}
                  <div
                    className="absolute text-white text-sm font-bold pointer-events-none"
                    style={{
                      left: crack.x - 2,
                      top: crack.y - 25,
                      backgroundColor: color,
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}
                  >
                    {crack.id || index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Detection Summary */}
      {activeTab === 'annotated' && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <div>
                <p className="font-semibold text-gray-900">AI Detection Complete</p>
                <p className="text-sm text-gray-600">
                  Found {crackCount} crack(s) with {severity} severity
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
