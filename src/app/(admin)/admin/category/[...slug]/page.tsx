"use client";

import { Queries } from "@/api";
import { Mutations } from "@/api/mutations";
import { CommonBottomActionBar, CommonCard, CommonFormSection } from "@/components/common";
import { PAGE_TITLE } from "@/constants";
import { CategoryFormValues } from "@/type";
import { CategorySchema, GenerateOptions, GetChangedFields, RemoveEmptyFields, useDynamicSlug } from "@/utils";
import { Form, Formik, FormikHelpers } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const CommonFormImageBox = dynamic(() => import("@/attribute").then((mod) => mod.CommonFormImageBox), { ssr: false });
const CommonValidationSelect = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationSelect), { ssr: false });
const CommonValidationSwitch = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationSwitch), { ssr: false });
const CommonValidationTextField = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationTextField), { ssr: false });

const AddEditCategoryPage = () => {
  const router = useRouter();

  const { mutate: addData, isPending: isAddLoading } = Mutations.useAddCategory();
  const { mutate: editData, isPending: isEditLoading } = Mutations.useEditCategory();
  const { mode, id } = useDynamicSlug(["mode", "id"] as const);
  const isEditing = Boolean(id) && mode === "edit";
  const pageMode = isEditing ? "EDIT" : "ADD";

  const { data, isLoading: isDataLoading } = Queries.useGetCategoryById(id, !!id);
  const { data: storesData, isLoading: isStoresLoading } = Queries.useGetStore({});
  const { data: categoriesData, isLoading: isCategoriesLoading } = Queries.useGetCategory({});

  const Data = data?.data;
  const pageTitle = PAGE_TITLE.CATEGORY[pageMode];

  const initialValues: CategoryFormValues = {
    storeId: Data?.storeId || "",
    parentCategoryId: Data?.parentCategoryId || "",
    name: Data?.name || "",
    slug: Data?.slug || "",
    description: Data?.description || "",
    image: Data?.image || "",
    isActive: Data?.isActive ?? true,
  };
  const handleSubmit = (values: CategoryFormValues, { resetForm }: FormikHelpers<CategoryFormValues>) => {
    const changedFields = GetChangedFields(values, Data);
    const handleSuccess = () => {
      resetForm();
      router.back();
    };
    if (isEditing) editData({ id, ...changedFields }, { onSuccess: handleSuccess });
    else addData(RemoveEmptyFields(values), { onSuccess: handleSuccess });
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 rounded-lg border border-slate-100 bg-white/90 p-5 backdrop-blur">
        <div className="text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">Admin {PAGE_TITLE.CATEGORY.BASE} editor</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{pageTitle}</h1>
        </div>
      </div>
      <CommonCard cardProps={{ title: `${PAGE_TITLE.CATEGORY.BASE} Details`, loading: isDataLoading, style: { borderRadius: 10, overflow: "hidden" } }}>
        <div className="flex! flex-col gap-3!">
          <Formik<CategoryFormValues> enableReinitialize initialValues={initialValues} validationSchema={CategorySchema} onSubmit={handleSubmit}>
            {({ dirty }) => (
              <Form className="space-y-5">
                <CommonFormSection title="Basic Details" row={{ gutter: [10, 10] }}>
                  <CommonValidationSelect name="storeId" label="Store" placeholder="Select store" options={GenerateOptions(storesData?.data?.stores)} loading={isStoresLoading} col={{ xs: 24, md: 12 }} />
                  <CommonValidationSelect name="parentCategoryId" label="Parent Category" placeholder="Select parent category" options={GenerateOptions(categoriesData?.data?.categories)} loading={isCategoriesLoading} col={{ xs: 24, md: 12 }} />
                  <CommonValidationTextField name="name" label="Category Name" placeholder="Enter category name" col={{ xs: 24, md: 12 }} required />
                  <CommonValidationTextField name="slug" label="slug" placeholder="Enter slug" col={{ xs: 24, md: 12 }} required />
                  <CommonValidationTextField name="description" label="description" placeholder="Enter description" col={{ xs: 24 }} multiline />
                  <CommonFormImageBox name="image" label="Image" type="image" col={{ xs: 24, md: 12 }} />
                </CommonFormSection>
                <CommonFormSection title="Features" row={{ gutter: [10, 10] }}>
                  <CommonValidationSwitch name="isActive" label="Active" col={{ xs: 24 }} />
                </CommonFormSection>
                <CommonBottomActionBar save isLoading={isAddLoading || isEditLoading} disabled={!dirty} />
              </Form>
            )}
          </Formik>
        </div>
      </CommonCard>
    </div>
  );
};

export default AddEditCategoryPage;
