import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

const ImageUploadComponent = ({
  formData,
  selectedImage,
  setSelectedImage,
  imageType,
  setImageType,
  imageTypeOptions,
  handleImageUpload,
  imagePreview,
  setImagePreview,
}) => {
  const fileInputRef = useRef(null);
  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a valid image file (JPEG, PNG, or GIF)");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setSelectedImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle image type selection
  const handleTypeSelection = (type) => {
    setImageType(type);
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      // Simulate file input change
      const event = { target: { files: [file] } };
      handleFileSelect(event);
    }
  };

  // Clear selected image
  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="md:col-span-3" id="image-upload">
      {/* <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-6">
        Image Upload
      </h2> */}
      <div className="">
        {/* Image Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 my-1">
            Select Image <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {imageTypeOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleTypeSelection(option.value)}
                className={`relative cursor-pointer rounded-lg border-2 p-2 transition-all duration-200 hover:shadow-md ${
                  imageType === option.value
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{option.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">
                      {option.label}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {option.description}
                    </p>
                  </div>
                  {imageType === option.value && (
                    <div className="absolute top-2 right-2">
                      <svg
                        className="w-5 h-5 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Area */}
        {imageType && (
          <div
            className={`relative border-2 border-dashed rounded-lg p-2 text-center transition-all duration-200 mt-2 ${
              imagePreview
                ? "border-green-300 bg-green-50"
                : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {imagePreview ? (
              <div className="space-y-4">
                {/* Image Preview */}
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Upload preview"
                    className={`object-cover border-4 border-white shadow-lg ${
                      imageType === "profile_image"
                        ? "w-32 h-32 rounded-full"
                        : "w-32 h-32 rounded-lg"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>

                <div>
                  {/* <p className="break-all text-sm text-gray-600 mb-2">
                    {selectedImage?.name}
                  </p> */}
                  {/* <p className="text-xs text-gray-500">
                    Size: {(selectedImage?.size / 1024 / 1024).toFixed(2)} MB
                  </p> */}
                  {imageType && (
                    <p className="text-xs text-blue-600 mt-1">
                      Type:{" "}
                      {
                        imageTypeOptions.find((opt) => opt.value === imageType)
                          ?.label
                      }
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Upload Icon */}
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Upload Image
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Drag and drop your image here, or click to browse
                  </p>
                  <p className="text-xs text-gray-400">
                    Supports: JPEG, PNG, GIF (Max 5MB)
                  </p>
                </div>
              </div>
            )}

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        )}
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          {selectedImage && imageType && (
            <>
              <button
                type="button"
                onClick={handleImageUpload}
                disabled={!imageType}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-offset-2 mt-2 ${
                  !imageType
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-primary text-white"
                }`}
              >
                Upload Image
              </button>
            </>
          )}
        </div>
      </div>
      {(formData?.profile_image ||
        formData?.company_logo ||
        formData?.qr_code) && (
        <div class="grid gap-4 mt-2">
          <div class="grid grid-cols-3 gap-4">
            <div>
              <img
                class="h-auto max-w-full rounded-lg aspect-square object-cover max-h-[220px]"
                src={formData?.profile_image}
                alt=""
              />
            </div>
            <div>
              <img
                class="h-auto max-w-full rounded-lg aspect-square object-cover max-h-[220px]"
                src={formData?.company_logo}
                alt=""
              />
            </div>
            <div>
              <img
                class="h-auto max-w-full rounded-lg aspect-square object-cover max-h-[220px]"
                src={formData?.qr_code}
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadComponent;
