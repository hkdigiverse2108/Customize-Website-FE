"use client";

import { Queries } from "@/api/queries";
import { CommonCard, CommonTable } from "@/components/common";
import { PAGE_TITLE } from "@/constants";
import { PlanBase } from "@/type";
import { useTableFilter } from "@/utils";

const PlanPage = () => {
  const { paginationModel, handleTableChange, params } = useTableFilter();
  const { data: planData, isLoading: planLoading } = Queries.useGetPlan(params);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
  ];

  const dataOption = {
    columns,
    dataSource: planData?.data?.plans || [],
    loading: planLoading,
    pagination: { ...paginationModel, total: planData?.data?.total_count || 0 },
    onChange: handleTableChange,
  };

  return (
    <CommonCard cardProps={{ title: PAGE_TITLE.PLAN.BASE}} handleAdd={() => {}}>
      <CommonTable<PlanBase> {...dataOption} />
    </CommonCard>
  );
};

export default PlanPage;
