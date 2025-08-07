import React from "react";

type Props = {
  image: string | null;
  onUpload: (url: string) => void;
};

const HeaderImageUploader: React.FC<Props> = ({ image, onUpload }) => {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onUpload(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-6">
      {image ? (
        <img
          src={image}
          alt="Header"
          className="w-full h-48 object-cover rounded mb-2"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded mb-2 text-gray-600">
          No header image
        </div>
      )}

      <input type="file" accept="image/*" onChange={handleChange} />
    </div>
  );
};

export default HeaderImageUploader;
