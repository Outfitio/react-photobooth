import React, { createContext, useState, useContext } from "react";

const AppStateContext = createContext();

export function AppStateProvider({ children }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progressIncrement, setProgress] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAvatar, setGeneratedAvatars] = useState(null);
  const [previewSize, setSize] = useState("square");

  // Enter your UploadPreset and CloudName here to enable uploading to your cloudinary bucket.
  const cloudinaryUploadPreset = "uncm2kav";
  const cloudinaryCloudName = "outfitio";

  const value = {
    imageUrl,
    setImageUrl,
    isUploading,
    setIsUploading,
    progressIncrement,
    setProgress,
    isGenerating,
    setIsGenerating,
    generatedAvatar,
    setGeneratedAvatars,
    previewSize,
    setSize,
    cloudinaryUploadPreset,
    cloudinaryCloudName,
  };
  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error(
      "You probably forgot a <AppStateProvider> context provider!"
    );
  }
  return context;
}
