import React, { useRef } from "react";
import { Upload, Image, X } from "lucide-react";

type Props = {
  image: string | null;
  onUpload: (url: string) => void;
};

const HeaderImageUploader: React.FC<Props> = ({ image, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onUpload(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpload("");
  };

  return (
    <div className="mb-8">
      <div className="relative group">
        {image ? (
          <div className="relative overflow-hidden rounded-lg border border-cyan-500/30 shadow-2xl">
            <img
              src={image}
              alt="Header"
              className="w-full h-56 object-cover transition-all duration-300 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Controls overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex gap-3">
                <button
                  onClick={handleClick}
                  className="bg-gray-900/80 backdrop-blur-sm text-cyan-400 p-3 rounded-full hover:bg-gray-800/90 transition-all duration-200 hover:scale-110 border border-cyan-500/30"
                >
                  <Upload size={20} />
                </button>
                <button
                  onClick={handleRemove}
                  className="bg-gray-900/80 backdrop-blur-sm text-red-400 p-3 rounded-full hover:bg-gray-800/90 transition-all duration-200 hover:scale-110 border border-red-500/30"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-lg border border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ) : (
          <div
            onClick={handleClick}
            className="w-full h-56 bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] group"
          >
            <div className="text-gray-400 group-hover:text-cyan-400 transition-colors duration-300">
              <Image size={48} className="mx-auto mb-4" />
            </div>
            <p className="text-gray-400 group-hover:text-cyan-400 transition-colors duration-300 font-medium">
              Click to upload header image
            </p>
            <p className="text-gray-500 text-sm mt-2">
              PNG, JPG, GIF up to 10MB
            </p>
            
            {/* Tech-style corner decorations */}
            <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-500/30 group-hover:border-cyan-400/60 transition-colors duration-300" />
            <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-500/30 group-hover:border-cyan-400/60 transition-colors duration-300" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-500/30 group-hover:border-cyan-400/60 transition-colors duration-300" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-500/30 group-hover:border-cyan-400/60 transition-colors duration-300" />
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>
      
      {/* Upload status indicator */}
      {image && (
        <div className="mt-3 flex items-center gap-2 text-sm text-cyan-400">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          Header image loaded
        </div>
      )}
    </div>
  );
};

export default HeaderImageUploader;