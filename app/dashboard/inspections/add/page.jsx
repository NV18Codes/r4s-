"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../AuthContext";
import { toast } from "sonner";

export default function AddInspectionPage() {
  const router = useRouter();
  const { token } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [annotatedImage, setAnnotatedImage] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a JPG, PNG, or JPEG image");
      return;
    }

    // Validate file size (10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error("Image must be under 10MB");
      return;
    }

    setSelectedFile(file);
    setResults(null);
    setAnnotatedImage(null);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const drawBoundingBoxes = (imageSrc, cracks) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw original image
        ctx.drawImage(img, 0, 0);
        
        // Draw bounding boxes
        ctx.strokeStyle = '#ff0000'; // Red
        ctx.lineWidth = 3;
        ctx.font = '16px Arial';
        ctx.fillStyle = '#ff0000';
        
        cracks.forEach((crack, index) => {
          const { x, y, width, height } = crack;
          
          // Draw rectangle
          ctx.strokeRect(x, y, width, height);
          
          // Draw label
          const label = `Crack ${index + 1} (${(crack.confidence * 100).toFixed(0)}%)`;
          ctx.fillRect(x, y - 20, 150, 20);
          ctx.fillStyle = '#ffffff';
          ctx.fillText(label, x + 5, y - 5);
          ctx.fillStyle = '#ff0000';
        });
        
        const annotatedDataUrl = canvas.toDataURL('image/jpeg');
        resolve(annotatedDataUrl);
      };
      img.src = imageSrc;
    });
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first");
      return;
    }

    setAnalyzing(true);
    
    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64Data = reader.result;
          
          // Detect environment
          const isNetlify = window.location.hostname.includes('netlify.app');
          const uploadUrl = isNetlify 
            ? '/.netlify/functions/upload-image'
            : `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/images`;

          const response = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(token && { 'Authorization': `Bearer ${token}` }),
            },
            body: JSON.stringify({
              image: base64Data,
              filename: selectedFile.name,
            }),
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to analyze image');
          }

          const text = await response.text();
          const data = JSON.parse(text);

          // Format cracks data
          const cracks = (data.boxes || []).map((box, index) => ({
            crackNumber: index + 1,
            confidence: box.confidence,
            x: box.x1,
            y: box.y1,
            width: box.x2 - box.x1,
            height: box.y2 - box.y1,
          }));

          // Sort by confidence (highest first)
          cracks.sort((a, b) => b.confidence - a.confidence);

          const results = {
            annotatedImageUrl: data.annotatedImageUrl || base64Data, // Use original if no annotated
            detectedCracks: cracks,
          };

          setResults(results);

          // Draw bounding boxes on image
          const annotated = await drawBoundingBoxes(preview, cracks);
          setAnnotatedImage(annotated);

          if (cracks.length === 0) {
            toast.success("Analysis complete! No cracks detected.");
          } else {
            toast.success(`Analysis complete! Found ${cracks.length} crack(s).`);
          }

        } catch (error) {
          console.error('Analysis error:', error);
          toast.error(error.message || "Failed to analyze image");
        } finally {
          setAnalyzing(false);
        }
      };

      reader.onerror = () => {
        toast.error("Failed to read image file");
        setAnalyzing(false);
      };

      reader.readAsDataURL(selectedFile);

    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.message || "Failed to upload image");
      setAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setResults(null);
    setAnnotatedImage(null);
    // Reset file input
    const fileInput = document.getElementById('image-upload');
    if (fileInput) fileInput.value = '';
  };

  const displayImage = annotatedImage || preview;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add Inspection</h1>
          <p className="text-gray-500 mt-1">Upload road image for crack detection analysis</p>
        </div>
        <button
          onClick={() => router.push('/dashboard/inspections')}
          className="text-[#005580] hover:text-[#004466] font-medium"
        >
          ← Back to Inspections
        </button>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Road Image</h2>
        
        <div className="space-y-4">
          {/* File Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Image File
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#005580] file:text-white hover:file:bg-[#004466]"
            />
            <p className="mt-1 text-xs text-gray-500">
              JPG, PNG or JPEG (Max 10MB)
            </p>
          </div>

          {/* File Info */}
          {selectedFile && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Selected:</span> {selectedFile.name}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Size:</span> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={!selectedFile || analyzing}
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {analyzing ? "Analyzing..." : "Analyze for Cracks"}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Annotated Image */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Annotated Image</h3>
            {displayImage && (
              <div className="flex justify-center">
                <img 
                  src={displayImage} 
                  alt="Annotated road" 
                  className="max-w-full h-auto rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          {/* Crack List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Detected Cracks ({results.detectedCracks.length})
            </h3>
            
            {results.detectedCracks.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-2">✅</div>
                <p>No cracks detected</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {results.detectedCracks.map((crack) => (
                  <div 
                    key={crack.crackNumber} 
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">
                        Crack {crack.crackNumber}
                      </h4>
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                        {(crack.confidence * 100).toFixed(0)}% confidence
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Coordinates:</span> 
                        ({crack.x.toFixed(0)}, {crack.y.toFixed(0)})
                      </div>
                      <div>
                        <span className="font-medium">Size:</span> 
                        {crack.width.toFixed(0)} × {crack.height.toFixed(0)} pixels
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Analyze Another Button */}
      {results && (
        <div className="text-center">
          <button
            onClick={handleReset}
            className="bg-[#005580] text-white px-6 py-3 rounded-lg hover:bg-[#004466] transition-colors font-medium"
          >
            Analyze Another Image
          </button>
        </div>
      )}
    </div>
  );
}
