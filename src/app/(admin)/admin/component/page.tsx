"use client";

import { Mutations } from "@/api";
import { Queries } from "@/api/queries";
import { CommonActionColumn, CommonCard, CommonDeleteModal, CommonObjectPropertyColumn, CommonTable } from "@/components/common";
import { PAGE_TITLE, ROUTES } from "@/constants";
import { ComponentBase } from "@/type";
import { useTableFilter } from "@/utils";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";

const ComponentPage = () => {
  const { paginationModel, handleTableChange, rowToDelete, setRowToDelete, search, setSearch, isActive, setActive, params } = useTableFilter();
  const router = useRouter();

  const { data: componentData, isLoading: isComponentLoading, isFetching: isComponentFetching } = Queries.useGetComponent(params);
  const { mutate: editData, isPending: isEditLoading } = Mutations.useEditComponent();
  const { mutate: deleteMutate, isPending: isDeleteLoading } = Mutations.useDeleteComponent();

  const handleDeleteBtn = () => {
    if (!rowToDelete) return;
    deleteMutate(rowToDelete?._id as string, { onSuccess: () => setRowToDelete(null) });
  };

  const columns: ColumnsType<ComponentBase> = [
    CommonObjectPropertyColumn("name", "name", [], { title: "Name" }),
    CommonObjectPropertyColumn("type", "type", [], { title: "type" }),
    CommonObjectPropertyColumn("category", "category", [], { title: "Category" }),
    CommonObjectPropertyColumn("label", "label", [], { title: "Label" }),
    CommonObjectPropertyColumn("version", "version", [], { title: "Version" }),
    CommonActionColumn<ComponentBase>({
      onActive: { onHandle: (row) => editData({ id: row._id, isActive: !row.isActive }) },
      onEdit: { onHandle: (row) => router.push(`${ROUTES.ADMIN.COMPONENT.EDIT}/${row._id}`) },
      onDelete: { onHandle: (row) => setRowToDelete({ _id: row?._id, title: row?.name }) },
    }),
  ];

  const dataOption = {
    columns,
    dataSource: componentData?.data?.components || [],
    loading: isComponentLoading || isComponentFetching || isEditLoading,
    pagination: { ...paginationModel, total: componentData?.data?.total_count || 0 },
    onChange: handleTableChange,
    onSearch: { value: search, onChange: setSearch },
    onActive: { value: isActive, onChange: setActive },
  };

  return (
    <>
      <CommonCard cardProps={{ title: PAGE_TITLE.COMPONENT.BASE }} handleAdd={() => router.push(ROUTES.ADMIN.COMPONENT.ADD)}>
        <CommonTable<ComponentBase> {...dataOption} />
      </CommonCard>
      <CommonDeleteModal open={Boolean(rowToDelete)} itemName={rowToDelete?.title} loading={isDeleteLoading} onClose={() => setRowToDelete(null)} onConfirm={() => handleDeleteBtn()} />
    </>
  );
};

export default ComponentPage;
