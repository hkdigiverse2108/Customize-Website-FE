import { setUploadModal, useAppDispatch, useAppSelector } from "@/store";
import { Tabs } from "antd";
import CommonModal from "../modal/commonModal";
import Dropzone from "./dropzone";
import FileGallery from "./fileGallery";

const CommonUpload = () => {
  const { isUploadModal } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  return (
    <CommonModal open={isUploadModal.open} width={900} title={`Upload ${isUploadModal.type === "image" ? "Image" : "PDF"}`} onClose={() => dispatch(setUploadModal({ open: false, type: "image" }))}>
      <div className="flex flex-col gap-5">
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: "Select File",
              key: "1",
              children: <FileGallery />,
            },
            {
              label: "Upload New",
              key: "2",
              children: <Dropzone />,
            },
          ]}
        />
      </div>
    </CommonModal>
  );
};

export default CommonUpload;
