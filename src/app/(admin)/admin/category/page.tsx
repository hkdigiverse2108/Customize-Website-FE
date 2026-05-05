"use client";

import { Mutations } from "@/api";
import { Queries } from "@/api/queries";
import { CommonActionColumn, CommonCard, CommonDeleteModal, CommonObjectPropertyColumn, CommonTable } from "@/components/common";
import { PAGE_TITLE, ROUTES } from "@/constants";
import { CategoryBase } from "@/type";
import { useTableFilter } from "@/utils";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";

const CategoryPage = () => {
  const { paginationModel, handleTableChange, rowToDelete, setRowToDelete, search, setSearch, isActive, setActive, params } = useTableFilter();
  const router = useRouter();

  const { data: categoryData, isLoading: isCategoryLoading, isFetching: isCategoryFetching } = Queries.useGetCategory(params);
  const { mutate: editData, isPending: isEditLoading } = Mutations.useEditCategory();
  const { mutate: deleteMutate, isPending: isDeleteLoading } = Mutations.useDeleteCategory();

  const handleDeleteBtn = () => {
    if (!rowToDelete) return;
    deleteMutate(rowToDelete?._id as string, { onSuccess: () => setRowToDelete(null) });
  };

  const columns: ColumnsType<CategoryBase> = [
    CommonObjectPropertyColumn("storeId", "storeId", ["name"], { title: "store" }),
    CommonObjectPropertyColumn("name", "name", [], { title: "Name" }),
    CommonObjectPropertyColumn("slug", "slug", [], { title: "slug" }),
    CommonObjectPropertyColumn("parentCategoryId", "parentCategoryId", ["name"], { title: "Parent Category" }),
    CommonActionColumn<CategoryBase>({
      onActive: { onHandle: (row) => editData({ id: row._id, isActive: !row.isActive }) },
      onEdit: { onHandle: (row) => router.push(`${ROUTES.ADMIN.CATEGORY.EDIT}/${row._id}`) },
      onDelete: { onHandle: (row) => setRowToDelete({ _id: row?._id, title: row?.name }) },
    }),
  ];

  const dataOption = {
    columns,
    dataSource: categoryData?.data?.categories || [],
    loading: isCategoryLoading || isCategoryFetching || isEditLoading,
    pagination: { ...paginationModel, total: categoryData?.data?.total_count || 0 },
    onChange: handleTableChange,
    onSearch: { value: search, onChange: setSearch },
    onActive: { value: isActive, onChange: setActive },
  };

  return (
    <>
      <CommonCard cardProps={{ title: PAGE_TITLE.CATEGORY.BASE }} handleAdd={() => router.push(ROUTES.ADMIN.CATEGORY.ADD)}>
        <CommonTable<CategoryBase> {...dataOption} />
      </CommonCard>
      <CommonDeleteModal open={Boolean(rowToDelete)} itemName={rowToDelete?.title} loading={isDeleteLoading} onClose={() => setRowToDelete(null)} onConfirm={() => handleDeleteBtn()} />
    </>
  );
};

export default CategoryPage;
