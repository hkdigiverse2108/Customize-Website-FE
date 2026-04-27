import { Mutations } from "@/api";
import { CommonButton, CommonNotification } from "@/attribute";
import { useAppSelector } from "@/store";
import { Image } from "antd";
import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { RiCloseLargeFill } from "react-icons/ri";

const DropzoneWithPreview = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const { isUploadModal } = useAppSelector((state) => state.modal);

  const { mutate: uploadImage, isPending } = Mutations.useUpload();

  const isImageMode = isUploadModal.type === "image";

  // Allowed mime types
  const allowedTypes = isImageMode ? ["image/png", "image/jpg", "image/jpeg", "image/webp"] : ["application/pdf"];

  // Validate file type
  const validate = (file: File) => allowedTypes.includes(file.type);

  // Handle both input & drop upload
  const processFiles = (fileList: FileList) => {
    const validFiles: File[] = [];
    const previewUrls: string[] = [];

    Array.from(fileList).forEach((file) => {
      if (!validate(file)) {
        CommonNotification("error", isImageMode ? `Only PNG, JPG, WEBP, JPEG allowed` : `Only PDF files allowed`);
        return;
      }
      validFiles.push(file);
      previewUrls.push(URL.createObjectURL(file));
    });

    setFiles((prev) => [...prev, ...validFiles]);
    setPreviews((prev) => [...prev, ...previewUrls]);
  };

  const handleInputUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processFiles(e.target.files);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) processFiles(e.dataTransfer.files);
  };

  const handleRemove = (i: number) => {
    URL.revokeObjectURL(previews[i]);
    setFiles(files.filter((_, idx) => idx !== i));
    setPreviews(previews.filter((_, idx) => idx !== i));
  };

  const handleClear = () => {
    previews.forEach((p) => URL.revokeObjectURL(p));
    setFiles([]);
    setPreviews([]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    files.forEach((file) => formData.append(isImageMode ? "images" : "pdf", file));

    uploadImage(formData, {
      onSuccess: () => handleClear(),
    });
  };

  return (
    <div>
      <div
        className="w-full h-12 rounded-2xl border-2 border-dashed border-gray-300 hover:border-brand-500 flex flex-col items-center justify-center text-center cursor-pointer bg-white"
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => e.preventDefault()} // IMPORTANT
        onDrop={handleDrop} // IMPORTANT
      >
        <div className="flex flex-col items-center justify-center flex-1 text-center">
          <span className="text-center block w-full text-sm font-semibold text-gray-700">{`Drag and drop your ${isImageMode ? "PNG, JPG, WEBP, JPEG images" : "PDF"}  here or browse`}</span>
        </div>
      </div>

      {!!files.length && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 mt-3">
          <div className="mb-3 text-sm font-medium text-gray-700">Selected Files ({files.length})</div>

          <div className="space-y-2 min-h-10 max-h-100 custom-scrollbar overflow-y-auto">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2 cursor-pointer">
                <div className="flex items-center gap-2" onClick={() => !isImageMode && window.open(previews[index], "_blank")}>
                  {isImageMode ? <Image width={50} height={50} alt="basic" src={previews[index]} className="rounded-sm object-contain" /> : <div className="w-12 h-12 flex items-center justify-center bg-red-100 text-red-600 font-bold rounded">PDF</div>}
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-gray-700">{file.name}</div>
                    <div className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                  </div>
                </div>
                <CommonButton icon={<RiCloseLargeFill />} onClick={() => handleRemove(index)} size="middle" color="danger" variant="filled" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HIDDEN FILE INPUT */}
      <input type="file" ref={fileRef} className="hidden" multiple accept={isImageMode ? allowedTypes.join(", ") : "application/pdf"} onChange={handleInputUpload} />

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
        <CommonButton onClick={handleClear} title="Clear" color="default" variant="dashed" />
        <CommonButton loading={isPending} title="Insert Media" disabled={files.length === 0} onClick={handleUpload} />
      </div>
    </div>
  );
};

export default DropzoneWithPreview;
