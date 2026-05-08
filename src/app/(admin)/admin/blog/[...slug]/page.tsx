"use client";

import { Queries } from "@/api";
import { Mutations } from "@/api/mutations";
import { CommonBottomActionBar, CommonCard, CommonFormSection } from "@/components/common";
import { PAGE_TITLE } from "@/constants";
import { BLOG_STATUS_OPTIONS } from "@/data";
import { BlogFormValues } from "@/type";
import { BlogSchema, GenerateOptions, GetChangedFields, RemoveEmptyFields, useDynamicSlug } from "@/utils";
import { Form, Formik, FormikHelpers } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const CommonValidationSelect = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationSelect), { ssr: false });
const CommonValidationSwitch = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationSwitch), { ssr: false });
const CommonValidationTextField = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationTextField), { ssr: false });
const CommonValidationDatePicker = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationDatePicker), { ssr: false });
const CommonFormImageBox = dynamic(() => import("@/attribute").then((mod) => mod.CommonFormImageBox), { ssr: false });

const AddEditBlogPage = () => {
  const router = useRouter();

  const { mutate: addData, isPending: isAddLoading } = Mutations.useAddBlog();
  const { mutate: editData, isPending: isEditLoading } = Mutations.useEditBlog();
  const { mode, id } = useDynamicSlug(["mode", "id"] as const);
  const isEditing = Boolean(id) && mode === "edit";
  const pageMode = isEditing ? "EDIT" : "ADD";

  const { data, isLoading: isDataLoading } = Queries.useGetBlogById(id, !!id);
  const { data: storesData, isLoading: isStoresLoading } = Queries.useGetStore({});
  const { data: themeData, isLoading: isThemeLoading } = Queries.useGetTheme({});

  const Data = data?.data;
  const pageTitle = PAGE_TITLE.BLOG[pageMode];

  const initialValues: BlogFormValues = {
    storeId: Data?.storeId || "",
    title: Data?.title || "",
    content: Data?.content || "",
    excerpt: Data?.excerpt || "",
    author: Data?.author || "",
    image: Data?.image || "",
    status: Data?.status || "",
    tags: Data?.tags || [],
    blogCategory: Data?.blogCategory || "",
    themeId: Data?.themeId || "",
    seo: {
      title: Data?.seo?.title || "",
      description: Data?.seo?.description || "",
      slug: Data?.seo?.slug || "",
    },
    publishedAt: Data?.publishedAt || "",
    isActive: Data?.isActive ?? true,
  };

  const handleSubmit = (values: BlogFormValues, { resetForm }: FormikHelpers<BlogFormValues>) => {
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
          <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">Admin {PAGE_TITLE.BLOG.BASE} editor</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{pageTitle}</h1>
        </div>
      </div>
      <CommonCard cardProps={{ title: `${PAGE_TITLE.BLOG.BASE} Details`, loading: isDataLoading, style: { borderRadius: 10, overflow: "hidden" } }}>
        <div className="flex! flex-col gap-3!">
          <Formik<BlogFormValues> enableReinitialize initialValues={initialValues} validationSchema={BlogSchema} onSubmit={handleSubmit}>
            {({ dirty }) => (
              <Form className="space-y-5">
                <CommonFormSection title="Basic Details" row={{ gutter: [10, 10] }}>
                  <CommonValidationSelect name="storeId" label="Store" placeholder="Select store" options={GenerateOptions(storesData?.data?.stores)} loading={isStoresLoading} col={{ xs: 24, md: 12 }} required />
                  <CommonValidationTextField name="title" label="Title" placeholder="Enter Title" col={{ xs: 24, md: 12 }} required />
                  <CommonValidationTextField name="content" label="Content" placeholder="Enter Content" col={{ xs: 24, md: 12 }} />
                  <CommonValidationTextField name="excerpt" label="Excerpt" placeholder="Enter excerpt" col={{ xs: 24, md: 12 }} />
                  <CommonValidationTextField name="author" label="Author" placeholder="Enter author" col={{ xs: 24, md: 12 }} />
                  <CommonValidationSelect name="status" label="status" placeholder="Enter status" col={{ xs: 24, md: 12 }} options={BLOG_STATUS_OPTIONS} />
                  <CommonValidationSelect name="tags" label="tags" placeholder="Enter tags" col={{ xs: 24, md: 12 }} options={[]} mode="tags" />
                  <CommonValidationTextField name="blogCategory" label="Blog Category" placeholder="Enter blog category" col={{ xs: 24, md: 12 }} />
                  <CommonValidationSelect name="themeId" label="theme" placeholder="Enter theme" col={{ xs: 24, md: 12 }} options={GenerateOptions(themeData?.data?.themes)} loading={isThemeLoading} />
                  <CommonValidationDatePicker name="publishedAt" label="Published Date" col={{ xs: 24, md: 12 }} />
                  <CommonFormImageBox name="image" label="Image" type="image" col={{ xs: 24, md: 12 }} />
                </CommonFormSection>

                <CommonFormSection title="SEO" row={{ gutter: [10, 10] }}>
                  <CommonValidationTextField name="seo.title" label="Seo Title" placeholder="Enter seo title" col={{ xs: 24 }} required />
                  <CommonValidationTextField name="seo.description" label="Seo Description" placeholder="Enter seo description" col={{ xs: 24 }} multiline required />
                  <CommonValidationTextField name="seo.slug" label="Seo slug" placeholder="Enter seo slug" col={{ xs: 24 }} multiline required />
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

export default AddEditBlogPage;
