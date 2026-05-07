import React, { useEffect, useState } from 'react';

const CloudinaryWidget = ({ onUploadSuccess, buttonText = "Upload Media", publicId }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load the Cloudinary upload widget script if it's not present
    if (!document.getElementById("cloudinary-widget-js")) {
      const script = document.createElement("script");
      script.id = "cloudinary-widget-js";
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.async = true;
      script.onload = () => setLoaded(true);
      document.body.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  const openWidget = () => {
    if (loaded && window.cloudinary) {
      window.cloudinary.openUploadWidget(
        {
          cloudName: "da8mkmdmh",
          uploadPreset: "digicards_public",
          // No fixed publicId — each upload gets a unique URL so CDN cache is never stale
          sources: ['local', 'camera', 'instagram'],
          multiple: false,
          maxFiles: 1,
          clientAllowedFormats: ["png", "jpeg", "jpg", "mp4", "mov", "webp", "gif"],
          maxFileSize: 104857600 // Secure threshold of 100MB for Reels
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            const freshUrl = result.info.secure_url;
            console.log("Upload Success (unique URL):", freshUrl);
            onUploadSuccess(freshUrl);
          }
        }
      );
    }
  };

  return (
    <button 
      type="button" 
      onClick={openWidget} 
      disabled={!loaded}
      style={{
        padding: '12px 20px', 
        borderRadius: '8px', 
        cursor: loaded ? 'pointer' : 'wait', 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '8px',
        background: '#ffffff',
        color: '#1a202c',
        border: '1px solid #e2e8f0',
        fontWeight: '600',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}
      onMouseOver={(e) => loaded && (e.currentTarget.style.borderColor = '#cbd5e0')}
      onMouseOut={(e) => loaded && (e.currentTarget.style.borderColor = '#e2e8f0')}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17 8 12 3 7 8"></polyline>
        <line x1="12" y1="3" x2="12" y2="15"></line>
      </svg>
      {buttonText}
    </button>
  );
};

export default CloudinaryWidget;
