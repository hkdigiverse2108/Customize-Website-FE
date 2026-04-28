import { Mutations, Queries } from "@/api";
import { CommonButton } from "@/attribute";
import { setSelectedFiles, setUploadModal, useAppDispatch, useAppSelector } from "@/store";
import { Image, Skeleton } from "antd";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { FaCheck, FaFilePdf } from "react-icons/fa";

const FileGallery = () => {
  const { isUploadModal } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const shouldFetchImages = isUploadModal.type === "image";
  const shouldFetchPdf = isUploadModal.type === "pdf";

  const [selected, setSelected] = useState<string[]>([]);

  const { mutate: mutateDelete } = Mutations.useDeleteUpload();

  const { data: images, isLoading: isLoadingImages } = Queries.useGetUploadImage({ enabled: shouldFetchImages });
  const { data: pdf, isLoading: isLoadingPdf } = Queries.useGetUploadPdf({ enabled: shouldFetchPdf });

  const ListData = isUploadModal.type === "image" ? images?.data : pdf?.data;

  /* ---------------------------------- */
  /* Selection Logic */
  /* ---------------------------------- */
  const toggleSelect = (file: string) => {
    setSelected((prev) => {
      if (isUploadModal.multiple) {
        return prev.includes(file) ? prev.filter((i) => i !== file) : [...prev, file];
      } else {
        return prev[0] === file ? [] : [file];
      }
    });
  };
  /* ---------------------------------- */
  /* Delete uploaded file */
  /* ---------------------------------- */
  const handleDelete = (file: string) => {
    if (!file) return;
    mutateDelete({ fileUrl: file });
  };

  /* ---------------------------------- */
  /* Save selection to Redux */
  /* ---------------------------------- */
  const handleSaveBtn = () => {
    dispatch(setSelectedFiles(selected));
    dispatch(setUploadModal({ open: false, type: isUploadModal.type, fieldName: isUploadModal.fieldName }));
    setSelected([]);
  };

  /* ---------------------------------- */
  /* Close modal */
  /* ---------------------------------- */
  const handleClose = () => {
    setSelected([]);
    dispatch(setUploadModal({ open: false, type: isUploadModal.type }));
  };

  return (
    <>
      <div className="flex flex-col gap-4 custom-scrollbar h-[327px] overflow-y-auto">
        <div className="flex flex-wrap gap-4">
          {isLoadingImages || isLoadingPdf
            ? [...Array(10)].map((_, i) => <Skeleton key={i} style={{ borderRadius: "10px" }} />)
            : ListData?.map((file: string, idx: number) => (
                <div
                  key={idx}
                  onClick={() => toggleSelect(file)}
                  className={`relative group border rounded-xl p-2 cursor-pointer
                    ${selected.includes(file) ? "border-brand-400" : "border-gray-200"}`}
                >
                  {/* Selected badge */}
                  {selected.includes(file) && (
                    <span className="absolute top-2 left-2 bg-brand-500 text-white rounded-sm p-1 text-xs z-50">
                      <FaCheck />
                    </span>
                  )}

                  {/* Preview */}
                  {isUploadModal.type === "image" ? (
                    <Image width={108} height={108} alt="basic" src={file} className="rounded-sm object-contain" />
                  ) : (
                    <div className="w-[108px] h-[108px] flex flex-col items-center justify-center">
                      <FaFilePdf size={40} />
                    </div>
                  )}

                  {/* Menu */}
                  <div className="absolute top-1 right-1 w-full h-full flex items-start justify-end">
                    <div className="transform transition-all bg-gray-50 rounded-full opacity-0 group-hover:opacity-100 flex gap-1">
                      <CommonButton
                        color="green"
                        variant="filled"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(file, "_blank");
                        }}
                        icon={<BsEye />}
                      />
                      <CommonButton
                        color="danger"
                        variant="filled"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(file);
                        }}
                        icon={<BiTrash />}
                      />
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between gap-3 mt-5 pt-4 border-t border-gray-200 dark:border-gray-800">
        <p className="text-gray-500">{selected.length} selected</p>
        <div className="flex gap-2">
          <CommonButton title="Clear" color="default" variant="dashed" onClick={handleClose} />
          <CommonButton title="Save" onClick={handleSaveBtn} />
        </div>
      </div>
    </>
  );
};

export default FileGallery;
