"use client";

import { Mutations } from "@/api";
import { Queries } from "@/api/queries";
import { CommonActionColumn, CommonCard, CommonDeleteModal, CommonObjectPropertyColumn, CommonTable } from "@/components/common";
import { PAGE_TITLE, ROUTES } from "@/constants";
import { ProductBase } from "@/type";
import { useTableFilter } from "@/utils";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";

const ProductPage = () => {
  const { paginationModel, handleTableChange, rowToDelete, setRowToDelete, search, setSearch, isActive, setActive, params } = useTableFilter();
  const router = useRouter();

  const { data: productData, isLoading: isProductLoading, isFetching: isProductFetching } = Queries.useGetProduct(params);
  const { mutate: editData, isPending: isEditLoading } = Mutations.useEditProduct();
  const { mutate: deleteMutate, isPending: isDeleteLoading } = Mutations.useDeleteProduct();

  const handleDeleteBtn = () => {
    if (!rowToDelete) return;
    deleteMutate(rowToDelete?._id as string, { onSuccess: () => setRowToDelete(null) });
  };

  const columns: ColumnsType<ProductBase> = [
    CommonObjectPropertyColumn("storeId", "storeId", ["name"], { title: "Store" }),
    CommonObjectPropertyColumn("title", "title", [], { title: "Title" }),
    CommonObjectPropertyColumn("slug", "slug", [], { title: "Slug" }),
    CommonObjectPropertyColumn("productType", "productType", [], { title: "Product Type", type: "format" }),
    CommonObjectPropertyColumn("status", "status", [], { title: "status", type: "format" }),
    CommonObjectPropertyColumn("price", "price", [], { title: "price" }),
    CommonObjectPropertyColumn("comparePrice", "comparePrice", [], { title: "compare Price" }),
    CommonObjectPropertyColumn("costPrice", "costPrice", [], { title: "cost Price" }),
    CommonObjectPropertyColumn("publishedAt", "publishedAt", [], { title: "Published at", type: "date" }),
    CommonObjectPropertyColumn("isPublished", "isPublished", [], { title: "Published", type: "boolean" }),
    CommonActionColumn<ProductBase>({
      onActive: { onHandle: (row) => editData({ id: row._id, isActive: !row.isActive }) },
      onEdit: { onHandle: (row) => router.push(`${ROUTES.ADMIN.PRODUCT.EDIT}/${row._id}`) },
      onDelete: { onHandle: (row) => setRowToDelete({ _id: row?._id, title: row?.title }) },
    }),
  ];

  const dataOption = {
    columns,
    dataSource: productData?.data?.products || [],
    loading: isProductLoading || isProductFetching || isEditLoading,
    pagination: { ...paginationModel, total: productData?.data?.total_count || 0 },
    onChange: handleTableChange,
    onSearch: { value: search, onChange: setSearch },
    onActive: { value: isActive, onChange: setActive },
  };

  return (
    <>
      <CommonCard cardProps={{ title: PAGE_TITLE.PRODUCT.BASE }} handleAdd={() => router.push(ROUTES.ADMIN.PRODUCT.ADD)}>
        <CommonTable<ProductBase> {...dataOption} />
      </CommonCard>
      <CommonDeleteModal open={Boolean(rowToDelete)} itemName={rowToDelete?.title} loading={isDeleteLoading} onClose={() => setRowToDelete(null)} onConfirm={() => handleDeleteBtn()} />
    </>
  );
};

export default ProductPage;
