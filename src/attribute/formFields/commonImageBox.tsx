import { setSelectedFiles, setUploadModal, useAppSelector } from "@/store";
import { CommonImageBoxProps } from "@/type";
import { Col, Image } from "antd";
import { useField } from "formik";
import { useEffect, useMemo, type FC } from "react";
import { BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { CgFileAdd } from "react-icons/cg";
import { PiFilePdfLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { CommonButton } from "./commonButton";

export const CommonFormImageBox: FC<CommonImageBoxProps> = ({ name, label, type, col, required, multiple }) => {
  const [field, meta, helpers] = useField<(File | string)[] | null>(name);
  const { selectedFiles, isUploadModal } = useAppSelector((state) => state.modal);
  const fieldName = isUploadModal?.fieldName;
  const dispatch = useDispatch();

  /* ---------------- Normalize Value ---------------- */
  const values = useMemo<(File | string)[]>(() => {
    const raw = field.value;
    if (Array.isArray(raw)) return raw.filter(Boolean);
    if (raw) return [raw];
    return [];
  }, [field.value]);

  // ---------------- Sync Redux → Formik ----------------
  useEffect(() => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    // ✅ strict match
    if (fieldName !== name) return;

    const isFile = (value: unknown): value is File => value instanceof File;
    const newFiles = selectedFiles.filter((file: any) => !values.some((v: any) => (isFile(v) && isFile(file) ? v.name === file.name : v === file)));

    if (multiple) {
      helpers.setValue([...(values || []), ...newFiles]);
    } else {
      helpers.setValue(newFiles[0]);
    }

    // ✅ reset everything
    dispatch(setSelectedFiles([]));
    dispatch(setUploadModal({ open: false, type, multiple: false, fieldName: "" }));
  }, [selectedFiles]); // ❗ ONLY selectedFiles

  /* ---------------- Preview URLs ---------------- */
  const previews = useMemo(() => values.map((item) => (item instanceof File ? URL.createObjectURL(item) : item)), [values]);

  /* ---------------- Cleanup Blob URLs ---------------- */
  useEffect(() => {
    return () => {
      previews.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [previews]);

  const hasError = Boolean(meta.touched && meta.error);

  /* ---------------- Remove Item ---------------- */
  const removeItem = (index: number) => {
    const updated = values.filter((_, i) => i !== index);
    helpers.setValue(multiple ? updated : null);
  };

  return (
    <Col {...col}>
      <div className="flex flex-col gap-2">
        {/* Label */}
        <p className="text-sm font-medium">
          {label}
          {(hasError || required) && <span className="text-red-600 ml-1">*</span>}
        </p>

        {/* Preview Grid */}
        <div className="flex flex-wrap gap-3">
          {previews.map((url, index) => (
            <div key={index} className="relative group flex items-center justify-center rounded-xl p-2 cursor-pointer border border-gray-200 overflow-hidden">
              {type === "image" ? (
                <Image width={108} height={108} alt="basic" src={url} className="rounded-sm object-contain" />
              ) : (
                <div className="w-[108px] h-[108px] flex flex-col items-center justify-center">
                  <PiFilePdfLight style={{ fontSize: 40 }} />
                </div>
              )}

              {/* Delete Overlay */}
              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition gap-2">
                <CommonButton
                  color="green"
                  variant="filled"
                  size="middle"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(url, "_blank");
                  }}
                  icon={<BsEye />}
                />
                <CommonButton
                  color="danger"
                  variant="filled"
                  size="middle"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(index);
                  }}
                  icon={<BiTrash />}
                />
              </div>
            </div>
          ))}

          {/* Upload Box */}
          {(previews.length < 1 || multiple) && (
            <div onClick={() => dispatch(setUploadModal({ open: true, type: type, multiple: multiple, fieldName: name }))} className={`flex items-center justify-center rounded-xl border cursor-pointer p-2 w-[124px] h-[124px] ${hasError ? "border-red-500" : "border-gray-200 dark:border-gray-600"}`}>
              <CgFileAdd style={{ fontSize: 40, color: "#aaa" }} />
            </div>
          )}
        </div>

        {/* Error */}
        {hasError && <p className="text-xs text-red-600">{meta.error}</p>}
      </div>
    </Col>
  );
};
