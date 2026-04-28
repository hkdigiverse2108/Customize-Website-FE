"use client";

import { Mutations } from "@/api";
import { Queries } from "@/api/queries";
import { CommonActionColumn, CommonCard, CommonDeleteModal, CommonObjectPropertyColumn, CommonTable } from "@/components/common";
import { PAGE_TITLE, ROUTES } from "@/constants";
import { StoreBase } from "@/type";
import { useTableFilter } from "@/utils";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";

const StorePage = () => {
  const { paginationModel, handleTableChange, rowToDelete, setRowToDelete, search, setSearch, isActive, setActive, params } = useTableFilter();
  const router = useRouter();

  const { data: storeData, isLoading: isStoreLoading, isFetching: isStoreFetching } = Queries.useGetStore(params);
  const { mutate: editData, isPending: isEditLoading } = Mutations.useEditStore();
  const { mutate: deleteMutate, isPending: isDeleteLoading } = Mutations.useDeleteStore();

  const handleDeleteBtn = () => {
    if (!rowToDelete) return;
    deleteMutate(rowToDelete?._id as string, { onSuccess: () => setRowToDelete(null) });
  };

  const columns: ColumnsType<StoreBase> = [
    CommonObjectPropertyColumn("name", "name", ["name"], { title: "Name", type: "format" }),
    CommonObjectPropertyColumn("duration", "duration", ["duration"], { title: "Duration", type: "format" }),
    CommonObjectPropertyColumn("price", "price", ["price"], { title: "Price" }),
    CommonObjectPropertyColumn("themeLimit", "themeLimit", ["themeLimit"], { title: "Theme Limit" }),
    CommonObjectPropertyColumn("productLimit", "productLimit", ["productLimit"], { title: "Product Limit" }),
    CommonObjectPropertyColumn("blogLimit", "blogLimit", ["blogLimit"], { title: "Blog Limit" }),
    CommonObjectPropertyColumn("orderLimit", "orderLimit", ["orderLimit"], { title: "Order Limit" }),
    CommonActionColumn<StoreBase>({
      onActive: { onHandle: (row) => editData({ id: row._id, isActive: !row.isActive }) },
      onEdit: { onHandle: (row) => router.push(`${ROUTES.ADMIN.STORE.EDIT}/${row._id}`) },
      onDelete: { onHandle: (row) => setRowToDelete({ _id: row?._id, title: row?.name }) },
    }),
  ];

  const dataOption = {
    columns,
    dataSource: storeData?.data?.stores || [],
    loading: isStoreLoading || isStoreFetching || isEditLoading,
    pagination: { ...paginationModel, total: storeData?.data?.total_count || 0 },
    onChange: handleTableChange,
    onSearch: { value: search, onChange: setSearch },
    onActive: { value: isActive, onChange: setActive },
  };

  return (
    <>
      <CommonCard cardProps={{ title: PAGE_TITLE.STORE.BASE }} handleAdd={() => router.push(ROUTES.ADMIN.STORE.ADD)}>
        <CommonTable<StoreBase> {...dataOption} />
      </CommonCard>
      <CommonDeleteModal open={Boolean(rowToDelete)} itemName={rowToDelete?.title} loading={isDeleteLoading} onClose={() => setRowToDelete(null)} onConfirm={() => handleDeleteBtn()} />
    </>
  );
};

export default StorePage;
