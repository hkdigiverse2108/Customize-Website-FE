"use client";

import { Queries } from "@/api/queries";
import { CommonButton } from "@/attribute";
import { CommonCard, CommonTable } from "@/components/common";
import { PAGE_TITLE, ROUTES } from "@/constants";
import { PlanBase } from "@/type";
import { useTableFilter } from "@/utils";
import { Flex } from "antd";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { BiEdit, BiTrash } from "react-icons/bi";

const PlanPage = () => {
  const { paginationModel, handleTableChange, params } = useTableFilter();
  const router = useRouter();

  const { data: planData, isLoading: planLoading } = Queries.useGetPlan(params);
  const handleEdit = (item: PlanBase) => {
    // navigate(handleNavigate, {
    //   state: {
    //     editData: item,
    //     edit: true,
    //   },
    // });
  };

  const columns: ColumnsType<PlanBase> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Option",
      key: "actionIcons",
      width: 120,
      fixed: "right",
      render: (_, record) => (
        <Flex gap="middle" justify="center">
          <CommonButton icon={<BiEdit />} size="middle" color="default" variant="dashed" />
          <CommonButton icon={<BiTrash />} size="middle" color="default" variant="dashed" />
        </Flex>
      ),
    },
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
