"use client";

import { Mutations } from "@/api";
import { Queries } from "@/api/queries";
import { CommonCard, CommonTable } from "@/components/common";
import CommonDeleteModal from "@/components/common/modal/commonDeleteModal";
import CommonActionColumn from "@/components/common/table/commonActionColumn";
import { PAGE_TITLE, ROUTES } from "@/constants";
import { PlanBase } from "@/type";
import { useTableFilter } from "@/utils";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";

const PlanPage = () => {
  const { paginationModel, handleTableChange, rowToDelete, setRowToDelete, search, setSearch, isActive, setActive, params } = useTableFilter();
  const router = useRouter();

  const { data: planData, isLoading: isPlanLoading, isFetching: isPlanFetching } = Queries.useGetPlan(params);
  const { mutate: editData, isPending: isEditLoading } = Mutations.useEditPlan();
  const { mutate: deleteMutate, isPending: isDeleteLoading } = Mutations.useDeletePlan();

  const handleEdit = (item: PlanBase) => {
    router.push(`${ROUTES.ADMIN.PLAN.EDIT}/${item._id}`);
  };

  const handleDeleteBtn = () => {
    if (!rowToDelete) return;
    deleteMutate(rowToDelete?._id as string, { onSuccess: () => setRowToDelete(null) });
  };

  const columns: ColumnsType<PlanBase> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    CommonActionColumn<PlanBase>({
      onActive: { onHandle: (row) => editData({ id: row._id, isActive: !row.isActive }) },
      onEdit: { onHandle: (row) => handleEdit(row) },
      onDelete: { onHandle: (row) => setRowToDelete({ _id: row?._id, title: row?.name }) },
    }),
  ];

  const dataOption = {
    columns,
    dataSource: planData?.data?.plans || [],
    loading: isPlanLoading || isPlanFetching || isEditLoading,
    pagination: { ...paginationModel, total: planData?.data?.total_count || 0 },
    onChange: handleTableChange,
    onSearch: { value: search, onChange: setSearch },
    onActive: { value: isActive, onChange: setActive },
  };

  return (
    <>
      <CommonCard cardProps={{ title: PAGE_TITLE.PLAN.BASE }} handleAdd={() => router.push(ROUTES.ADMIN.PLAN.ADD)}>
        <CommonTable<PlanBase> {...dataOption} />
      </CommonCard>
      <CommonDeleteModal open={Boolean(rowToDelete)} itemName={rowToDelete?.title} loading={isDeleteLoading} onClose={() => setRowToDelete(null)} onConfirm={() => handleDeleteBtn()} />
    </>
  );
};

export default PlanPage;
