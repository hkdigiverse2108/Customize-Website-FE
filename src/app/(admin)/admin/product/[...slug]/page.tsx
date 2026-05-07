"use client";

import { Queries } from "@/api";
import { Mutations } from "@/api/mutations";
import { CommonButton } from "@/attribute";
import { CommonBottomActionBar, CommonCard, CommonFormSection } from "@/components/common";
import { PAGE_TITLE } from "@/constants";
import { PRODUCT_EDIT_MODE_OPTIONS, PRODUCT_MEDIA_TYPE_OPTIONS, PRODUCT_STATUS_OPTIONS } from "@/data";
import { ProductFormValues } from "@/type";
import { GenerateOptions, GetChangedFields, MapConfig, ProductSchema, RemoveEmptyFields, useDynamicSlug } from "@/utils";
import { Col, Divider, Row, Segmented } from "antd";
import { FieldArray, Form, Formik, FormikHelpers } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GrAdd, GrClose } from "react-icons/gr";

const CommonValidationSelect = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationSelect), { ssr: false });
const CommonValidationSwitch = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationSwitch), { ssr: false });
const CommonValidationTextField = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationTextField), { ssr: false });
const CommonValidationDatePicker = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationDatePicker), { ssr: false });
const CommonFormImageBox = dynamic(() => import("@/attribute").then((mod) => mod.CommonFormImageBox), { ssr: false });

const AddEditProductPage = () => {
  const router = useRouter();
  const [type, setType] = useState("basic");

  const { mutate: addData, isPending: isAddLoading } = Mutations.useAddProduct();
  const { mutate: editData, isPending: isEditLoading } = Mutations.useEditProduct();
  const { mode, id } = useDynamicSlug(["mode", "id"] as const);
  const isEditing = Boolean(id) && mode === "edit";
  const pageMode = isEditing ? "EDIT" : "ADD";

  const { data, isLoading: isDataLoading } = Queries.useGetProductById(id, !!id);
  const { data: storesData, isLoading: isStoresLoading } = Queries.useGetStore({});
  const { data: collectionsData, isLoading: isCollectionsLoading } = Queries.useGetCollection({});
  const { data: categoriesData, isLoading: isCategoriesLoading } = Queries.useGetCategory({});

  const Data = data?.data;
  const pageTitle = PAGE_TITLE.PRODUCT[pageMode];

  const initialValues: ProductFormValues = {
    storeId: Data?.storeId || "",
    title: Data?.title || "",
    slug: Data?.slug || "",
    description: Data?.description || "",
    shortDescription: Data?.shortDescription || "",
    status: Data?.status || "",
    vendor: Data?.vendor || "",
    productType: Data?.productType || "",
    tags: Data?.tags || [],
    price: Data?.price || 0,
    comparePrice: Data?.comparePrice || 0,
    costPrice: Data?.costPrice || 0,
    currency: Data?.currency || "",
    options: MapConfig(Data?.options, { name: "", values: [] }),
    variants: MapConfig(Data?.variants, {
      title: "",
      sku: "",
      barcode: "",
      image: "",
      price: "",
      comparePrice: "",
      costPrice: "",
      optionValues: [{ name: "", value: "" }],
      inventory: { quantity: "", lowStockThreshold: "", trackQuantity: false, allowBackorder: false },
      isActive: true,
    }).map((item) => ({ ...item, optionValues: MapConfig(item?.optionValues, { name: "", value: "" }) })),
    hasVariants: Data?.hasVariants ?? false,
    media: MapConfig(Data?.media, { name: "", type: "", alt: "", position: "" }),
    thumbnail: Data?.thumbnail || "",
    categoryIds: Data?.categoryIds || [],
    collectionIds: Data?.collectionIds || [],
    seo: {
      title: Data?.seo?.title || "",
      description: Data?.seo?.description || "",
    },
    rating: Data?.rating || 0,
    reviewCount: Data?.reviewCount || 0,
    publishedAt: Data?.publishedAt || "",
    isActive: Data?.isActive ?? true,
  };

  const handleSubmit = (values: ProductFormValues, { resetForm }: FormikHelpers<ProductFormValues>) => {
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
          <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">Admin {PAGE_TITLE.PRODUCT.BASE} editor</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{pageTitle}</h1>
        </div>
      </div>
      <CommonCard cardProps={{ title: `${PAGE_TITLE.PRODUCT.BASE} Details`, loading: isDataLoading, style: { borderRadius: 10, overflow: "hidden" } }}>
        <div className="flex! flex-col gap-3!">
          <Segmented<string> className="mb-6 custom-scrollbar overflow-y-auto" size="large" options={PRODUCT_EDIT_MODE_OPTIONS} onChange={(value) => setType(value)} />
          <Formik<ProductFormValues> enableReinitialize initialValues={initialValues} validationSchema={ProductSchema} onSubmit={handleSubmit}>
            {({ dirty, values }) => (
              <Form className="space-y-5">
                {type === "basic" && (
                  <CommonFormSection title="Basic Details" row={{ gutter: [10, 10] }}>
                    <CommonValidationSelect name="storeId" label="Store" placeholder="Select store" options={GenerateOptions(storesData?.data?.stores)} loading={isStoresLoading} col={{ xs: 24, md: 8 }} required />
                    <CommonValidationTextField name="title" label="Title" placeholder="Enter collection title" col={{ xs: 24, md: 8 }} required />
                    <CommonValidationTextField name="slug" label="Slug" placeholder="Enter slug" col={{ xs: 24, md: 8 }} />
                    <CommonValidationSelect name="status" label="status" placeholder="Enter status" col={{ xs: 24, md: 8 }} options={PRODUCT_STATUS_OPTIONS} />
                    <CommonValidationTextField name="vendor" label="Vendor" placeholder="Enter vendor" col={{ xs: 24, md: 8 }} />
                    <CommonValidationTextField name="productType" label="Product Type" placeholder="Enter product type" col={{ xs: 24, md: 8 }} />
                    <CommonValidationSelect name="tags" label="Tags" placeholder="Enter tags" options={[]} mode="tags" col={{ xs: 24, md: 8 }} />
                    <CommonValidationTextField name="price" label="Price" placeholder="Enter price" col={{ xs: 24, md: 8 }} />
                    <CommonValidationTextField name="comparePrice" label="Compare Price" placeholder="Enter compare price" col={{ xs: 24, md: 8 }} />
                    <CommonValidationTextField name="costPrice" label="Cost Price" placeholder="Enter cost price" col={{ xs: 24, md: 8 }} />
                    <CommonValidationSelect name="categoryIds" label="Categories" placeholder="Enter categories" options={GenerateOptions(categoriesData?.data?.categories)} loading={isCategoriesLoading} col={{ xs: 24, md: 8 }} />
                    <CommonValidationSelect name="collectionIds" label="Collections" placeholder="Enter collections" options={GenerateOptions(collectionsData?.data?.collections)} loading={isCollectionsLoading} col={{ xs: 24, md: 8 }} />
                    <CommonValidationTextField name="rating" label="Rating" placeholder="Enter rating" col={{ xs: 24, md: 8 }} />
                    <CommonValidationTextField name="reviewCount" label="Review Count" placeholder="Enter review count" col={{ xs: 24, md: 8 }} />
                    <CommonValidationDatePicker name="publishedAt" label="Published At" col={{ xs: 24, md: 8 }} />
                    <CommonValidationTextField name="description" label="Description" placeholder="Enter description" col={{ xs: 24 }} multiline />
                    <CommonValidationTextField name="shortDescription" label="Short Description" placeholder="Enter short description" col={{ xs: 24 }} multiline />
                  </CommonFormSection>
                )}
                {type === "options" && (
                  <CommonFormSection title={"options"} row={{ gutter: [10, 10] }}>
                    <Col xs={24}>
                      <FieldArray name={"options"}>
                        {({ push, remove }) =>
                          values?.options?.map((_, index) => (
                            <div key={index}>
                              <Row gutter={[10, 10]} align="bottom" justify="start">
                                <CommonValidationTextField name={`options.${index}.name`} label="Name" placeholder="Enter name" col={{ xs: 24, md: 12 }} />
                                <CommonValidationSelect name={`options.${index}.values`} label="Values" placeholder="Enter values" options={[]} mode="tags" col={{ flex: "auto" }} />
                                {(values?.options?.length || 0) > 1 && <CommonButton variant="dashed" color="danger" size="large" icon={<GrClose />} col={{ flex: "none" }} onClick={() => remove(index)} />}
                                <CommonButton variant="dashed" color="primary" size="large" icon={<GrAdd />} col={{ flex: "none" }} onClick={() => push({ name: "", values: [] })} />
                              </Row>
                              {index < (values?.options?.length || 0) - 1 && <Divider className="my-3!" />}
                            </div>
                          ))
                        }
                      </FieldArray>
                    </Col>
                  </CommonFormSection>
                )}
                {type === "variants" && (
                  <CommonFormSection title={"variants"} row={{ gutter: [10, 10] }}>
                    <Col xs={24}>
                      <FieldArray name={"variants"}>
                        {({ push, remove }) =>
                          values?.variants?.map((_, index) => (
                            <div key={index}>
                              <Row gutter={[10, 10]} align="bottom" justify="start">
                                <CommonValidationTextField name={`variants.${index}.title`} label="Title" placeholder="Enter title" col={{ xs: 24, md: 8 }} />
                                <CommonValidationTextField name={`variants.${index}.sku`} label="SKU" placeholder="Enter SKU" col={{ xs: 24, md: 8 }} />
                                <CommonValidationTextField name={`variants.${index}.barcode`} label="Barcode" placeholder="Enter barcode" col={{ xs: 24, md: 8 }} />
                                <CommonValidationTextField name={`variants.${index}.price`} label="Price" placeholder="Enter price" col={{ xs: 24, md: 6 }} />
                                <CommonValidationTextField name={`variants.${index}.comparePrice`} label="Compare Price" placeholder="Enter compare price" col={{ xs: 24, md: 6 }} />
                                <CommonValidationTextField name={`variants.${index}.costPrice`} label="Cost Price" placeholder="Enter cost price" col={{ xs: 24, md: 6 }} />
                                <CommonValidationSwitch name={`variants.${index}.isActive`} label="Active" col={{ xs: 24, md: 6 }} />
                                <Col xs={24}>
                                  <CommonFormSection title="inventory" row={{ gutter: [10, 10] }}>
                                    <CommonValidationTextField name={`variants.${index}.inventory.quantity`} label="Inventory Quantity" placeholder="Enter inventory quantity" col={{ xs: 24, md: 12 }} />
                                    <CommonValidationTextField name={`variants.${index}.inventory.lowStockThreshold`} label="Low stock threshold" placeholder="Enter low stock threshold" col={{ xs: 24, md: 12 }} />
                                    <CommonValidationSwitch name={`variants.${index}.inventory.trackQuantity`} label="Track Quantity" col={{ xs: 24, md: 12 }} />
                                    <CommonValidationSwitch name={`variants.${index}.inventory.allowBackorder`} label="Allow Backorder" col={{ xs: 24, md: 12 }} />
                                  </CommonFormSection>
                                </Col>
                                <Col xs={24}>
                                  <CommonFormSection title="option" row={{ gutter: [10, 10] }}>
                                    <Col xs={24}>
                                      <FieldArray name={`variants.${index}.optionValues`}>
                                        {({ push, remove }) =>
                                          values?.variants?.[index]?.optionValues?.map((_, idx) => (
                                            <div key={idx}>
                                              <Row gutter={[10, 10]} align="bottom" justify="start">
                                                <CommonValidationTextField name={`variants.${index}.optionValues.${idx}.name`} label="Name" placeholder="Enter name" col={{ xs: 24, md: 12 }} />
                                                <CommonValidationTextField name={`variants.${index}.optionValues.${idx}.value`} label="Value" placeholder="Enter value" col={{ flex: "auto" }} />
                                                {(values?.variants?.[index]?.optionValues?.length || 0) > 1 && <CommonButton variant="dashed" color="danger" size="large" icon={<GrClose />} col={{ flex: "none" }} onClick={() => remove(idx)} />}
                                                <CommonButton variant="dashed" color="primary" size="large" icon={<GrAdd />} col={{ flex: "none" }} onClick={() => push({ name: "", value: "" })} />
                                              </Row>
                                              {idx < (values?.variants?.[index]?.optionValues?.length || 0) - 1 && <Divider className="my-3!" />}
                                            </div>
                                          ))
                                        }
                                      </FieldArray>
                                    </Col>
                                  </CommonFormSection>
                                </Col>
                                <CommonFormImageBox name={`variants.${index}.image`} label="Image" type="image" col={{ flex: "none" }} />
                                {(values?.variants?.length || 0) > 1 && <CommonButton variant="dashed" color="danger" size="large" icon={<GrClose />} col={{ flex: "none" }} onClick={() => remove(index)} />}
                                <CommonButton variant="dashed" color="primary" size="large" icon={<GrAdd />} col={{ flex: "none" }} onClick={() => push({ title: "", sku: "", barcode: "", image: "", price: "", comparePrice: "", costPrice: "", optionValues: [{ name: "", value: "" }], inventory: { quantity: "", lowStockThreshold: "", trackQuantity: false, allowBackorder: false }, isActive: true })} />
                              </Row>
                              {index < (values?.variants?.length || 0) - 1 && <Divider className="my-3!" />}
                            </div>
                          ))
                        }
                      </FieldArray>
                    </Col>
                  </CommonFormSection>
                )}
                {type === "media" && (
                  <CommonFormSection title={"media"} row={{ gutter: [10, 10] }}>
                    <CommonFormImageBox name="thumbnail" label="Thumbnail" type="image" col={{ xs: 24, md: 12 }} />
                    <Col xs={24}>
                      <FieldArray name={"media"}>
                        {({ push, remove }) =>
                          values?.media?.map((_, index) => (
                            <div key={index}>
                              <Row gutter={[10, 10]} align="bottom" justify="start">
                                <CommonFormImageBox name={`media.${index}.url`} label="Image" type="image" col={{ flex: "none" }} />
                                <CommonValidationTextField name={`media.${index}.alt`} label="Alt Text" placeholder="Enter alt text" col={{ flex: "auto" }} />
                                <CommonValidationSelect name={`media.${index}.type`} label="type" placeholder="Enter type" col={{ flex: "auto" }} options={PRODUCT_MEDIA_TYPE_OPTIONS} />
                                <CommonValidationTextField name={`media.${index}.position`} label="position" placeholder="Enter position" col={{ flex: "auto" }} />
                                {(values?.media?.length || 0) > 1 && <CommonButton variant="dashed" color="danger" size="large" icon={<GrClose />} col={{ flex: "none" }} onClick={() => remove(index)} />}
                                <CommonButton variant="dashed" color="primary" size="large" icon={<GrAdd />} col={{ flex: "none" }} onClick={() => push({ name: "", values: [] })} />
                              </Row>
                              {index < (values?.media?.length || 0) - 1 && <Divider className="my-3!" />}
                            </div>
                          ))
                        }
                      </FieldArray>
                    </Col>
                  </CommonFormSection>
                )}
                {type === "seo" && (
                  <CommonFormSection title="SEO" row={{ gutter: [10, 10] }}>
                    <CommonValidationTextField name="seo.title" label="Seo Title" placeholder="Enter seo title" col={{ xs: 24 }} />
                    <CommonValidationTextField name="seo.description" label="Seo Description" placeholder="Enter seo description" col={{ xs: 24 }} multiline />
                  </CommonFormSection>
                )}
                {type === "features" && (
                  <CommonFormSection title="Features" row={{ gutter: [10, 10] }}>
                    <CommonValidationSwitch name="hasVariants" label="hasVariants" col={{ xs: 24, md: 12 }} />
                    <CommonValidationSwitch name="isActive" label="Active" col={{ xs: 24, md: 12 }} />
                  </CommonFormSection>
                )}
                <CommonBottomActionBar save isLoading={isAddLoading || isEditLoading} disabled={!dirty} />
              </Form>
            )}
          </Formik>
        </div>
      </CommonCard>
    </div>
  );
};

export default AddEditProductPage;
