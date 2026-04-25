"use client";

import { Mutations } from "@/api";
import { Queries } from "@/api/queries";
import { CommonCard, CommonTable } from "@/components/common";
import CommonDeleteModal from "@/components/common/modal/commonDeleteModal";
import CommonActionColumn from "@/components/common/table/commonActionColumn";
import { CommonObjectPropertyColumn } from "@/components/common/table/commonColumns";
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

  const handleDeleteBtn = () => {
    if (!rowToDelete) return;
    deleteMutate(rowToDelete?._id as string, { onSuccess: () => setRowToDelete(null) });
  };

  const columns: ColumnsType<PlanBase> = [
    CommonObjectPropertyColumn("name", "name", ["name"], { title: "Name", type: "format" }),
    CommonObjectPropertyColumn("duration", "duration", ["duration"], { title: "Duration", type: "format" }),
    CommonObjectPropertyColumn("price", "price", ["price"], { title: "Price" }),
    CommonObjectPropertyColumn("themeLimit", "themeLimit", ["themeLimit"], { title: "Theme Limit" }),
    CommonObjectPropertyColumn("productLimit", "productLimit", ["productLimit"], { title: "Product Limit" }),
    CommonObjectPropertyColumn("blogLimit", "blogLimit", ["blogLimit"], { title: "Blog Limit" }),
    CommonObjectPropertyColumn("orderLimit", "orderLimit", ["orderLimit"], { title: "Order Limit" }),
    CommonActionColumn<PlanBase>({
      onActive: { onHandle: (row) => editData({ id: row._id, isActive: !row.isActive }) },
      onEdit: { onHandle: (row) => router.push(`${ROUTES.ADMIN.PLAN.EDIT}/${row._id}`) },
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
