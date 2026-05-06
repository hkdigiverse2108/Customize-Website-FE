"use client";

import { Queries } from "@/api";
import { Mutations } from "@/api/mutations";
import { CommonBottomActionBar, CommonCard, CommonFormSection } from "@/components/common";
import { PAGE_TITLE } from "@/constants";
import { PAGE_TYPE_OPTIONS, PAGE_VISIBILITY_OPTIONS } from "@/data";
import { PageFormValues } from "@/type";
import { GenerateOptions, GetChangedFields, PageSchema, RemoveEmptyFields, useDynamicSlug } from "@/utils";
import { Form, Formik, FormikHelpers } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const CommonValidationSelect = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationSelect), { ssr: false });
const CommonValidationSwitch = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationSwitch), { ssr: false });
const CommonValidationTextField = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationTextField), { ssr: false });

const AddEditPagesPage = () => {
  const router = useRouter();

  const { mutate: addData, isPending: isAddLoading } = Mutations.useAddPage();
  const { mutate: editData, isPending: isEditLoading } = Mutations.useEditPage();
  const { mode, id } = useDynamicSlug(["mode", "id"] as const);
  const isEditing = Boolean(id) && mode === "edit";
  const pageMode = isEditing ? "EDIT" : "ADD";

  const { data, isLoading: isDataLoading } = Queries.useGetPageById(id, !!id);
  const { data: storesData, isLoading: isStoresLoading } = Queries.useGetStore({});

  const Data = data?.data;
  const pageTitle = PAGE_TITLE.PAGE[pageMode];

  const initialValues: PageFormValues = {
    storeId: Data?.storeId || "",
    title: Data?.title || "",
    slug: Data?.slug || "",
    description: Data?.description || "",
    type: Data?.type || "",
    metaTitle: Data?.metaTitle || "",
    metaDescription: Data?.metaDescription || "",
    metaKeywords: Data?.metaKeywords || [],
    isPublished: Data?.isPublished ?? false,
    isHomePage: Data?.isHomePage ?? false,
    isDraft: Data?.isDraft ?? true,
    visibility: Data?.visibility || "",
    password: Data?.password || "",
    isActive: Data?.isActive ?? true,
  };
  const handleSubmit = (values: PageFormValues, { resetForm }: FormikHelpers<PageFormValues>) => {
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
          <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">Admin {PAGE_TITLE.PAGE.BASE} editor</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{pageTitle}</h1>
        </div>
      </div>
      <CommonCard cardProps={{ title: `${PAGE_TITLE.PAGE.BASE} Details`, loading: isDataLoading, style: { borderRadius: 10, overflow: "hidden" } }}>
        <div className="flex! flex-col gap-3!">
          <Formik<PageFormValues> enableReinitialize initialValues={initialValues} validationSchema={PageSchema} onSubmit={handleSubmit}>
            {({ dirty }) => (
              <Form className="space-y-5">
                <CommonFormSection title="Basic Details" row={{ gutter: [10, 10] }}>
                  <CommonValidationSelect name="storeId" label="Store" placeholder="Select store" options={GenerateOptions(storesData?.data?.stores)} loading={isStoresLoading} col={{ xs: 24, md: 12 }} required />
                  <CommonValidationTextField name="title" label="Title" placeholder="Enter page title" col={{ xs: 24, md: 12 }} required />
                  <CommonValidationTextField name="slug" label="Slug" placeholder="Enter slug" col={{ xs: 24, md: 12 }} required />
                  <CommonValidationSelect name="type" label="Type" placeholder="Enter page type" col={{ xs: 24, md: 12 }} options={PAGE_TYPE_OPTIONS} />
                  <CommonValidationTextField name="description" label="Description" placeholder="Enter description" col={{ xs: 24 }} multiline />
                </CommonFormSection>

                <CommonFormSection title="SEO Details" row={{ gutter: [10, 10] }}>
                  <CommonValidationTextField name="metaTitle" label="Meta Title" placeholder="Enter meta title" col={{ xs: 24 }} />
                  <CommonValidationTextField name="metaDescription" label="Meta Description" placeholder="Enter meta description" col={{ xs: 24 }} multiline />
                  <CommonValidationSelect name="metaKeywords" label="Meta Keywords" placeholder="Enter meta keywords" mode="tags" options={[]} col={{ xs: 24 }} />
                </CommonFormSection>

                <CommonFormSection title="Visibility & Access" row={{ gutter: [10, 10] }}>
                  <CommonValidationSelect name="visibility" label="Visibility" placeholder="Enter visibility" options={PAGE_VISIBILITY_OPTIONS} col={{ xs: 24, md: 12 }} />
                  <CommonValidationTextField name="password" label="Password" placeholder="Enter password" col={{ xs: 24, md: 12 }} />
                </CommonFormSection>

                <CommonFormSection title="Features" row={{ gutter: [10, 10] }}>
                  <CommonValidationSwitch name="isPublished" label="Published" syncOppositeFieldName="isDraft" col={{ xs: 24, md: 6 }} />
                  <CommonValidationSwitch name="isHomePage" label="Home Page" col={{ xs: 24, md: 6 }} />
                  <CommonValidationSwitch name="isDraft" label="Draft" syncOppositeFieldName="isPublished" col={{ xs: 24, md: 6 }} />
                  <CommonValidationSwitch name="isActive" label="Active" col={{ xs: 24, md: 6 }} />
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

export default AddEditPagesPage;
