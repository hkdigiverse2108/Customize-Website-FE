"use client";

import { Mutations } from "@/api";
import { Queries } from "@/api/queries";
import { CommonActionColumn, CommonCard, CommonDeleteModal, CommonObjectPropertyColumn, CommonTable } from "@/components/common";
import { PAGE_TITLE, ROUTES } from "@/constants";
import { BlogBase } from "@/type";
import { useTableFilter } from "@/utils";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";

const BlogPage = () => {
  const { paginationModel, handleTableChange, rowToDelete, setRowToDelete, search, setSearch, isActive, setActive, params } = useTableFilter();
  const router = useRouter();

  const { data: blogData, isLoading: isBlogLoading, isFetching: isBlogFetching } = Queries.useGetBlog(params);
  const { mutate: editData, isPending: isEditLoading } = Mutations.useEditBlog();
  const { mutate: deleteMutate, isPending: isDeleteLoading } = Mutations.useDeleteBlog();

  const handleDeleteBtn = () => {
    if (!rowToDelete) return;
    deleteMutate(rowToDelete?._id as string, { onSuccess: () => setRowToDelete(null) });
  };

  const columns: ColumnsType<BlogBase> = [
    CommonObjectPropertyColumn("storeId", "storeId", ["name"], { title: "Store" }),
    CommonObjectPropertyColumn("title", "title", [], { title: "Title" }),
    CommonObjectPropertyColumn("content", "content", [], { title: "Content" }),
    CommonObjectPropertyColumn("excerpt", "excerpt", [], { title: "excerpt" }),
    CommonObjectPropertyColumn("author", "author", [], { title: "author" }),
    CommonObjectPropertyColumn("status", "status", [], { title: "status", type: "format" }),
    CommonObjectPropertyColumn("blogCategory", "blogCategory", [], { title: "Category" }),
    CommonObjectPropertyColumn("themeId", "themeId", ["name"], { title: "Theme" }),
    CommonObjectPropertyColumn("publishedAt", "publishedAt", [], { title: "Published at", type: "date" }),
    CommonActionColumn<BlogBase>({
      onActive: { onHandle: (row) => editData({ id: row._id, isActive: !row.isActive }) },
      onEdit: { onHandle: (row) => router.push(`${ROUTES.ADMIN.BLOG.EDIT}/${row._id}`) },
      onDelete: { onHandle: (row) => setRowToDelete({ _id: row?._id, title: row?.title }) },
    }),
  ];

  const dataOption = {
    columns,
    dataSource: blogData?.data?.blogs || [],
    loading: isBlogLoading || isBlogFetching || isEditLoading,
    pagination: { ...paginationModel, total: blogData?.data?.total_count || 0 },
    onChange: handleTableChange,
    onSearch: { value: search, onChange: setSearch },
    onActive: { value: isActive, onChange: setActive },
  };

  return (
    <>
      <CommonCard cardProps={{ title: PAGE_TITLE.BLOG.BASE }} handleAdd={() => router.push(ROUTES.ADMIN.BLOG.ADD)}>
        <CommonTable<BlogBase> {...dataOption} />
      </CommonCard>
      <CommonDeleteModal open={Boolean(rowToDelete)} itemName={rowToDelete?.title} loading={isDeleteLoading} onClose={() => setRowToDelete(null)} onConfirm={() => handleDeleteBtn()} />
    </>
  );
};

export default BlogPage;
