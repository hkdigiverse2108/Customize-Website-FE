"use client";

import { Queries } from "@/api/queries";
import { CommonCard, CommonTable } from "@/components/common";
import CommonActionColumn from "@/components/common/table/commonActionColumn";
import { PAGE_TITLE, ROUTES } from "@/constants";
import { PlanBase } from "@/type";
import { useTableFilter } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";

const PlanPage = () => {
  const { paginationModel, handleTableChange, params } = useTableFilter();
  const router = useRouter();

  const { data: planData, isLoading: planLoading } = Queries.useGetPlan(params);
  const handleEdit = (item: PlanBase) => {
    router.push(`${ROUTES.ADMIN.PLAN.ADD_EDIT}`);
  };

  const columns: ColumnsType<PlanBase> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    CommonActionColumn<PlanBase>({
      // onActive: { onHandle: (row) => console.log("row", row) },
      onEdit: { onHandle: (row) => handleEdit(row) },
      // onDelete: { onHandle: (row) => console.log("row", row) },
    }),
  ];

  const dataOption = {
    columns,
    dataSource: planData?.data?.plans || [],
    loading: planLoading,
    pagination: { ...paginationModel, total: planData?.data?.total_count || 0 },
    onChange: handleTableChange,
  };

  return (
    <CommonCard cardProps={{ title: PAGE_TITLE.PLAN.BASE }} handleAdd={() => router.push(ROUTES.ADMIN.PLAN.ADD_EDIT)}>
      <CommonTable<PlanBase> {...dataOption} />
    </CommonCard>
  );
};

export default PlanPage;
