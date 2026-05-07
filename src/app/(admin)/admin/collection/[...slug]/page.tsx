"use client";

import { Queries } from "@/api";
import { Mutations } from "@/api/mutations";
import { CommonButton } from "@/attribute";
import { CommonBottomActionBar, CommonCard, CommonFormSection } from "@/components/common";
import { PAGE_TITLE } from "@/constants";
import { COLLECTION_OPERATOR_OPTIONS, COLLECTION_RULE_CONDITION_OPTIONS, COLLECTION_RULE_FIELD_OPTIONS, COLLECTION_SORT_ORDER_OPTIONS, COLLECTION_STATUS_OPTIONS, COLLECTION_TYPE_OPTIONS } from "@/data";
import { CollectionFormValues } from "@/type";
import { CollectionSchema, GenerateOptions, GetChangedFields, MapConfig, RemoveEmptyFields, useDynamicSlug } from "@/utils";
import { Col, Divider, Row } from "antd";
import { FieldArray, Form, Formik, FormikHelpers } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { GrAdd, GrClose } from "react-icons/gr";

const CommonValidationSelect = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationSelect), { ssr: false });
const CommonValidationSwitch = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationSwitch), { ssr: false });
const CommonValidationTextField = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationTextField), { ssr: false });
const CommonValidationDatePicker = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationDatePicker), { ssr: false });
const CommonFormImageBox = dynamic(() => import("@/attribute").then((mod) => mod.CommonFormImageBox), { ssr: false });

const AddEditCollectionsPage = () => {
  const router = useRouter();

  const { mutate: addData, isPending: isAddLoading } = Mutations.useAddCollection();
  const { mutate: editData, isPending: isEditLoading } = Mutations.useEditCollection();
  const { mode, id } = useDynamicSlug(["mode", "id"] as const);
  const isEditing = Boolean(id) && mode === "edit";
  const pageMode = isEditing ? "EDIT" : "ADD";

  const { data, isLoading: isDataLoading } = Queries.useGetCollectionById(id, !!id);
  const { data: storesData, isLoading: isStoresLoading } = Queries.useGetStore({});
  const { data: productsData, isLoading: isProductsLoading } = Queries.useGetProduct({});

  const Data = data?.data;
  const pageTitle = PAGE_TITLE.COLLECTION[pageMode];

  const initialValues: CollectionFormValues = {
    storeId: Data?.storeId || "",
    title: Data?.title || "",
    handle: Data?.handle || "",
    type: Data?.type || "",
    status: Data?.status || "",
    isPublished: Data?.isPublished ?? false,
    publishedAt: Data?.publishedAt || "",
    description: Data?.description || "",
    productIds: Data?.productIds || [],
    rules: MapConfig(Data?.rules, { field: "", operator: "", value: "" }),
    ruleCondition: Data?.ruleCondition || "",
    sortOrder: Data?.sortOrder || "",
    image: {
      url: Data?.image?.url || "",
      alt: Data?.image?.alt || "",
    },
    seo: {
      title: Data?.seo?.title || "",
      description: Data?.seo?.description || "",
      date: Data?.seo?.date || "",
    },
    tags: Data?.tags || [],
    isActive: Data?.isActive ?? true,
  };

  const handleSubmit = (values: CollectionFormValues, { resetForm }: FormikHelpers<CollectionFormValues>) => {
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
          <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">Admin {PAGE_TITLE.COLLECTION.BASE} editor</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{pageTitle}</h1>
        </div>
      </div>
      <CommonCard cardProps={{ title: `${PAGE_TITLE.COLLECTION.BASE} Details`, loading: isDataLoading, style: { borderRadius: 10, overflow: "hidden" } }}>
        <div className="flex! flex-col gap-3!">
          <Formik<CollectionFormValues> enableReinitialize initialValues={initialValues} validationSchema={CollectionSchema} onSubmit={handleSubmit}>
            {({ dirty, values }) => (
              <Form className="space-y-5">
                <CommonFormSection title="Basic Details" row={{ gutter: [10, 10] }}>
                  <CommonValidationSelect name="storeId" label="Store" placeholder="Select store" options={GenerateOptions(storesData?.data?.stores)} loading={isStoresLoading} col={{ xs: 24, md: 12 }} required />
                  <CommonValidationTextField name="title" label="Title" placeholder="Enter collection title" col={{ xs: 24, md: 12 }} required />
                  <CommonValidationTextField name="handle" label="Handle" placeholder="Enter handle" col={{ xs: 24, md: 12 }} />
                  <CommonValidationSelect name="type" label="Type" placeholder="Enter collection type" col={{ xs: 24, md: 12 }} options={COLLECTION_TYPE_OPTIONS} />
                  <CommonValidationSelect name="status" label="status" placeholder="Enter status" col={{ xs: 24, md: 12 }} options={COLLECTION_STATUS_OPTIONS} />
                  <CommonValidationDatePicker name="publishedAt" label="Published Date" col={{ xs: 24, md: 12 }} />
                  <CommonValidationSelect name="productIds" label="Products" placeholder="Select products" options={GenerateOptions(productsData?.data?.products)} loading={isProductsLoading} col={{ xs: 24, md: 12 }} />
                  <CommonValidationSelect name="sortOrder" label="Sort Order" placeholder="Enter sort order" col={{ xs: 24, md: 12 }} options={COLLECTION_SORT_ORDER_OPTIONS} />
                  <CommonValidationSelect name="tags" label="Tags" placeholder="Enter tags" options={[]} mode="tags" col={{ xs: 24 }} />
                  <CommonValidationTextField name="description" label="Description" placeholder="Enter description" col={{ xs: 24 }} multiline />
                </CommonFormSection>

                <CommonFormSection title={"Rules"} row={{ gutter: [10, 10] }}>
                  <CommonValidationSelect name="ruleCondition" label="Rule Condition" placeholder="Enter rule condition" col={{ xs: 24 }} options={COLLECTION_RULE_CONDITION_OPTIONS} />
                  <Col xs={24}>
                    <FieldArray name={"rules"}>
                      {({ push, remove }) =>
                        values?.rules?.map((_, index) => (
                          <div key={index}>
                            <Row gutter={[10, 10]} align="bottom" justify="start">
                              <CommonValidationSelect name={`rules.${index}.field`} label="Field" placeholder="Enter key" options={COLLECTION_RULE_FIELD_OPTIONS} col={{ xs: 24, md: 8 }} />
                              <CommonValidationSelect name={`rules.${index}.operator`} label="Operator" placeholder="Enter value" options={COLLECTION_OPERATOR_OPTIONS} col={{ xs: 24, md: 8 }} />
                              <CommonValidationTextField name={`rules.${index}.value`} label="Value" placeholder="Enter value" col={{ flex: "auto" }} />
                              {(values?.rules?.length || 0) > 1 && <CommonButton variant="dashed" color="danger" size="large" icon={<GrClose />} col={{ flex: "none" }} onClick={() => remove(index)} />}
                              <CommonButton variant="dashed" color="primary" size="large" icon={<GrAdd />} col={{ flex: "none" }} onClick={() => push({ field: "", operator: "", value: "" })} />
                            </Row>
                            {index < (values?.rules?.length || 0) - 1 && <Divider className="my-3!" />}
                          </div>
                        ))
                      }
                    </FieldArray>
                  </Col>
                </CommonFormSection>

                <CommonFormSection title="SEO" row={{ gutter: [10, 10] }}>
                  <CommonValidationTextField name="seo.title" label="Seo Title" placeholder="Enter seo title" col={{ xs: 24 }} />
                  <CommonValidationTextField name="seo.description" label="Seo Description" placeholder="Enter seo description" col={{ xs: 24 }} multiline />
                </CommonFormSection>

                <CommonFormSection title="Image" row={{ gutter: [10, 10] }}>
                  <CommonValidationTextField name="image.alt" label="Alt Text" placeholder="Enter alt text" col={{ xs: 24 }} />
                  <CommonFormImageBox name="image.url" label="Image" type="image" col={{ xs: 24, md: 12 }} />
                </CommonFormSection>

                <CommonFormSection title="Features" row={{ gutter: [10, 10] }}>
                  <CommonValidationSwitch name="isPublished" label="Published" syncOppositeFieldName="isDraft" col={{ xs: 24, md: 12 }} />
                  <CommonValidationSwitch name="isActive" label="Active" col={{ xs: 24, md: 12 }} />
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

export default AddEditCollectionsPage;
