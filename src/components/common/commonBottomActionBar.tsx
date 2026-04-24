"use client";

import { CommonButton } from "@/attribute";
import { CommonBottomActionBarProps } from "@/type";
import { useRouter } from "next/navigation";
import type { FC } from "react";

const CommonBottomActionBar: FC<CommonBottomActionBarProps> = ({ isLoading, disabled, save, onSave }) => {
  const router = useRouter();

  return (
    <>
      {save && (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <CommonButton color="default" variant="dashed" title="Back" onClick={() => router.back()} />
          <CommonButton htmlType="submit" title="Save" onClick={onSave} loading={isLoading} disabled={disabled} />
        </div>
      )}
    </>
  );
};

export default CommonBottomActionBar;
