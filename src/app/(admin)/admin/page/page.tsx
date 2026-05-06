"use client";

import { Mutations } from "@/api";
import { Queries } from "@/api/queries";
import { CommonActionColumn, CommonCard, CommonDeleteModal, CommonObjectPropertyColumn, CommonTable } from "@/components/common";
import { PAGE_TITLE, ROUTES } from "@/constants";
import { PageBase } from "@/type";
import { useTableFilter } from "@/utils";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";

const PagesPage = () => {
  const { paginationModel, handleTableChange, rowToDelete, setRowToDelete, search, setSearch, isActive, setActive, params } = useTableFilter();
  const router = useRouter();

  const { data: pageData, isLoading: isPageLoading, isFetching: isPageFetching } = Queries.useGetPage(params);
  const { mutate: editData, isPending: isEditLoading } = Mutations.useEditPage();
  const { mutate: deleteMutate, isPending: isDeleteLoading } = Mutations.useDeletePage();

  const handleDeleteBtn = () => {
    if (!rowToDelete) return;
    deleteMutate(rowToDelete?._id as string, { onSuccess: () => setRowToDelete(null) });
  };

  const columns: ColumnsType<PageBase> = [
    CommonObjectPropertyColumn("storeId", "storeId", ["name"], { title: "Store" }),
    CommonObjectPropertyColumn("title", "title", [], { title: "Title" }),
    CommonObjectPropertyColumn("slug", "slug", [], { title: "Slug" }),
    CommonObjectPropertyColumn("type", "type", [], { title: "Type", type: "format" }),
    CommonObjectPropertyColumn("visibility", "visibility", [], { title: "Visibility", type: "format" }),
    CommonObjectPropertyColumn("password", "password", [], { title: "Password" }),
    CommonObjectPropertyColumn("isPublished", "isPublished", [], { title: "Published", type: "boolean" }),
    CommonObjectPropertyColumn("isHomePage", "isHomePage", [], { title: "Home Page", type: "boolean" }),
    CommonObjectPropertyColumn("isDraft", "isDraft", [], { title: "Draft", type: "boolean" }),
    CommonActionColumn<PageBase>({
      onActive: { onHandle: (row) => editData({ id: row._id, isActive: !row.isActive }) },
      onEdit: { onHandle: (row) => router.push(`${ROUTES.ADMIN.PAGE.EDIT}/${row._id}`) },
      onDelete: { onHandle: (row) => setRowToDelete({ _id: row?._id, title: row?.title }) },
    }),
  ];

  const dataOption = {
    columns,
    dataSource: pageData?.data?.pages || [],
    loading: isPageLoading || isPageFetching || isEditLoading,
    pagination: { ...paginationModel, total: pageData?.data?.total_count || 0 },
    onChange: handleTableChange,
    onSearch: { value: search, onChange: setSearch },
    onActive: { value: isActive, onChange: setActive },
  };

  return (
    <>
      <CommonCard cardProps={{ title: PAGE_TITLE.PAGE.BASE }} handleAdd={() => router.push(ROUTES.ADMIN.PAGE.ADD)}>
        <CommonTable<PageBase> {...dataOption} />
      </CommonCard>
      <CommonDeleteModal open={Boolean(rowToDelete)} itemName={rowToDelete?.title} loading={isDeleteLoading} onClose={() => setRowToDelete(null)} onConfirm={() => handleDeleteBtn()} />
    </>
  );
};

export default PagesPage;
