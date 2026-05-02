"use client";

import { Queries } from "@/api";
import { Mutations } from "@/api/mutations";
import { CommonButton } from "@/attribute";
import { CommonBottomActionBar, CommonCard, CommonFormSection } from "@/components/common";
import { PAGE_TITLE } from "@/constants";
import { THEME_SUPPORTED_PAGE_OPTIONS, THEME_TYPE_OPTIONS } from "@/data";
import { ThemeFormValues } from "@/type";
import { GetChangedFields, RemoveEmptyFields, useDynamicSlug } from "@/utils";
import { Col, Divider, Row, Segmented } from "antd";
import { FieldArray, Form, Formik, FormikHelpers } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GrAdd, GrClose } from "react-icons/gr";

const CommonFormImageBox = dynamic(() => import("@/attribute").then((mod) => mod.CommonFormImageBox), { ssr: false });
const CommonValidationSelect = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationSelect), { ssr: false });
const CommonValidationSwitch = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationSwitch), { ssr: false });
const CommonValidationTextField = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationTextField), { ssr: false });
const CommonValidationDatePicker = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationDatePicker), { ssr: false });

const AddEditThemePage = () => {
  const router = useRouter();
  const [type, setType] = useState("basic");

  const { mutate: addData, isPending: isAddLoading } = Mutations.useAddTheme();
  const { mutate: editData, isPending: isEditLoading } = Mutations.useEditTheme();
  const { mode, id } = useDynamicSlug(["mode", "id"] as const);
  const isEditing = Boolean(id) && mode === "edit";
  const pageMode = isEditing ? "EDIT" : "ADD";

  const { data, isLoading: isDataLoading } = Queries.useGetThemeById(id, !!id);

  const Data = data?.data;
  const pageTitle = PAGE_TITLE.THEME[pageMode];

  const initialValues: ThemeFormValues = {
    name: Data?.name || "",
    slug: Data?.slug || "",
    description: Data?.description || "",

    previewImage: Data?.previewImage || "",
    demoUrl: Data?.demoUrl || "",

    category: Data?.category || "",
    tags: Data?.tags || [],
    type: Data?.type || "",

    isGlobal: Data?.isGlobal ?? false,
    isPremium: Data?.isPremium ?? false,
    isActive: Data?.isActive ?? true,
    isResponsive: Data?.isResponsive ?? true,
    seoFriendly: Data?.seoFriendly ?? true,
    lazyLoadEnabled: Data?.lazyLoadEnabled ?? true,

    price: Data?.price || 0,
    performanceScore: Data?.performanceScore || 0,

    supportedComponents: Data?.supportedComponents || [],
    supportedPages: Data?.supportedPages || [],

    version: Data?.version || "",
    changelog: Data?.changelog || [{ version: "", changes: "", date: "" }],
    authorName: Data?.authorName || "",
    breakpoints: Data?.breakpoints || { mobile: 0, tablet: 0, desktop: 0 },
    styles: Data?.styles || [{ key: "", value: "", type: "", label: "", group: "" }],
    defaultConfig: Data?.defaultConfig || { colors: "", fonts: "", spacing: "", buttons: "" },
    layoutJSON: Data?.layoutJSON || {
      header: [{ componentId: "header-1", order: 1, config: {} }],
      footer: [{ componentId: "footer-1", order: 1, config: {} }],
      home: [{ componentId: "header-1", order: 1, config: {} }],
      product: [{ componentId: "header-1", order: 1, config: {} }],
      category: [{ componentId: "header-1", order: 1, config: {} }],
      cart: [{ componentId: "header-1", order: 1, config: {} }],
      checkout: [{ componentId: "header-1", order: 1, config: {} }],
      custom: [{ componentId: "header-1", order: 1, config: {} }],
      collection: [{ componentId: "header-1", order: 1, config: {} }],
      blog: [{ componentId: "blog-1", order: 1, config: {} }],
    },
  };

  const handleSubmit = (values: ThemeFormValues, { resetForm }: FormikHelpers<ThemeFormValues>) => {
    const cleanedPayload = RemoveEmptyFields(values);
    const changedFields = GetChangedFields(values, Data);
    const handleSuccess = () => {
      resetForm();
      router.back();
    };
    console.log("values", values);
    // if (isEditing) editData({ id, ...changedFields }, { onSuccess: handleSuccess });
    // else addData(cleanedPayload, { onSuccess: handleSuccess });
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 rounded-lg border border-slate-100 bg-white/90 p-5 backdrop-blur">
        <div className="text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">Admin {PAGE_TITLE.THEME.BASE} editor</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{pageTitle}</h1>
          <p className="mt-0 text-sm leading-6 text-slate-500">Manage store details, business information, domain settings, and customer-facing content from a single structured admin interface.</p>{" "}
        </div>
      </div>
      <CommonCard cardProps={{ title: `${PAGE_TITLE.THEME.BASE} Details`, loading: isDataLoading, style: { borderRadius: 10, overflow: "hidden" } }}>
        <div className="flex! flex-col gap-3!">
          <Segmented<string>
            className="mb-6"
            size="middle"
            options={[
              { label: "Basic", value: "basic" },
              { label: "Classification", value: "classification" },
              { label: "Pricing & Performance", value: "pricingPerformance" },
              { label: "Supported", value: "supported" },
              { label: "Versioning", value: "versioning" },
              { label: "Breakpoints", value: "breakpoints" },
              { label: "Styles", value: "styles" },
              { label: "Default Config", value: "defaultConfig" },
              { label: "Layout", value: "layout" },
              { label: "Media", value: "media" },
              { label: "Features", value: "features" },
            ]}
            onChange={(value) => {
              setType(value);
            }}
          />
          <Formik<ThemeFormValues> enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values }) => (
              <Form className="space-y-5">
                {type === "basic" && (
                  <CommonFormSection title="Basic Details" row={{ gutter: [10, 10] }}>
                    <CommonValidationTextField name="name" label="Theme Name" placeholder="Enter theme name" col={{ xs: 24, md: 12 }} required />
                    <CommonValidationTextField name="slug" label="Slug" placeholder="Enter slug" col={{ xs: 24, md: 12 }} required />
                    <CommonValidationTextField name="description" label="Description" placeholder="Enter description" col={{ xs: 24 }} multiline />
                  </CommonFormSection>
                )}
                {type === "classification" && (
                  <CommonFormSection title="Classification" row={{ gutter: [10, 10] }}>
                    <CommonValidationTextField name="category" label="Category" placeholder="Enter category" col={{ xs: 24, md: 8 }} />
                    <CommonValidationSelect name="type" label="Type" placeholder="Enter type" options={[]} mode="tags" col={{ xs: 24, md: 8 }} />
                    <CommonValidationSelect name="tags" label="Tags" placeholder="Enter tags" options={THEME_TYPE_OPTIONS} col={{ xs: 24, md: 8 }} />
                  </CommonFormSection>
                )}
                {type === "pricingPerformance" && (
                  <CommonFormSection title="Pricing & Performance" row={{ gutter: [10, 10] }}>
                    <CommonValidationTextField name="price" label="Price" type="number" col={{ xs: 24, md: 12 }} />
                    <CommonValidationTextField name="performanceScore" label="Performance Score" type="number" col={{ xs: 24, md: 12 }} />
                  </CommonFormSection>
                )}
                {type === "supported" && (
                  <CommonFormSection title="Supported" row={{ gutter: [10, 10] }}>
                    <CommonValidationSelect name="supportedComponents" label="Supported Components" placeholder="Comma separated" options={[]} col={{ xs: 24, md: 12 }} />
                    <CommonValidationSelect name="supportedPages" label="Supported Pages" placeholder="Comma separated" options={THEME_SUPPORTED_PAGE_OPTIONS} col={{ xs: 24, md: 12 }} />
                  </CommonFormSection>
                )}
                {type === "versioning" && (
                  <CommonFormSection title="Versioning" row={{ gutter: [10, 10] }}>
                    <CommonValidationTextField name="version" label="Version" placeholder="e.g. 1.0.0" col={{ xs: 24, md: 12 }} />
                    <CommonValidationTextField name="authorName" label="Author Name" placeholder="Enter author name" col={{ xs: 24, md: 12 }} />
                    <Col xs={24}>
                      <CommonFormSection title="Changelog">
                        <FieldArray name="changelog">
                          {({ push, remove }) =>
                            values?.changelog?.map((_, index) => (
                              <div key={index}>
                                <Row key={index} gutter={[10, 10]} align="bottom" justify="start">
                                  <CommonValidationTextField name={`changelog.${index}.version`} label="Version" placeholder="Add new changelog entry" col={{ xs: 24, md: 8, xl: 8 }} />
                                  <CommonValidationTextField name={`changelog.${index}.changes`} label="Changes" placeholder="Select changes" col={{ xs: 24, md: 7, xl: 7, xxl: 8 }} />
                                  <CommonValidationDatePicker name={`changelog.${index}.date`} label="Date" pickerType="date" col={{ xs: 13, sm: 18, md: 5 }} />
                                  {(values?.changelog?.length || 0) > 1 && <CommonButton variant="dashed" color="danger" size="large" icon={<GrClose />} col={{ flex: "none" }} onClick={() => remove(index)} />}
                                  <CommonButton variant="dashed" color="primary" size="large" icon={<GrAdd />} col={{ flex: "none" }} onClick={() => push({ version: "", changes: "", date: "" })} />
                                </Row>
                                {index < (values?.changelog?.length || 0) - 1 && <Divider className="my-3!" />}
                              </div>
                            ))
                          }
                        </FieldArray>
                      </CommonFormSection>
                    </Col>
                  </CommonFormSection>
                )}
                {type === "breakpoints" && (
                  <CommonFormSection title="Breakpoints" row={{ gutter: [10, 10] }}>
                    <CommonValidationTextField name="breakpoints.mobile" label="Mobile" type="number" placeholder="e.g. 375" col={{ xs: 24, md: 8 }} />
                    <CommonValidationTextField name="breakpoints.tablet" label="Tablet" type="number" placeholder="e.g. 768" col={{ xs: 24, md: 8 }} />
                    <CommonValidationTextField name="breakpoints.desktop" label="Desktop" type="number" placeholder="e.g. 1024" col={{ xs: 24, md: 8 }} />
                  </CommonFormSection>
                )}
                {type === "styles" && (
                  <CommonFormSection title="Styles" row={{ gutter: [10, 10] }}>
                    <Col xs={24}>
                      <FieldArray name="styles">
                        {({ push, remove }) =>
                          values?.styles?.map((_, index) => (
                            <div key={index}>
                              <Row key={index} gutter={[10, 10]} align="bottom" justify="start">
                                <CommonValidationTextField name={`styles.${index}.key`} label="Key" placeholder="e.g. primaryColor" col={{ xs: 24, md: 8, xl: 8 }} />
                                <CommonValidationTextField name={`styles.${index}.value`} label="Value" placeholder="e.g. #1a73e8" col={{ xs: 24, md: 7, xl: 7, xxl: 8 }} />
                                <CommonValidationTextField name={`styles.${index}.type`} label="Type" placeholder="e.g. text, background, color" col={{ xs: 24, md: 8, xl: 8 }} />
                                <CommonValidationTextField name={`styles.${index}.label`} label="Label" placeholder="e.g. Primary Color" col={{ xs: 24, md: 7, xl: 7, xxl: 8 }} />
                                <CommonValidationTextField name={`styles.${index}.group`} label="Group" placeholder="e.g. colors, fonts, spacing" col={{ xs: 13, sm: 18, md: 5 }} />
                                {(values?.styles?.length || 0) > 1 && <CommonButton variant="dashed" color="danger" size="large" icon={<GrClose />} col={{ flex: "none" }} onClick={() => remove(index)} />}
                                <CommonButton variant="dashed" color="primary" size="large" icon={<GrAdd />} col={{ flex: "none" }} onClick={() => push({ key: "", value: "", type: "", label: "", group: "" })} />
                              </Row>
                              {index < (values?.styles?.length || 0) - 1 && <Divider className="my-3!" />}
                            </div>
                          ))
                        }
                      </FieldArray>
                    </Col>
                  </CommonFormSection>
                )}
                {type === "defaultConfig" && (
                  <CommonFormSection title="Default Config" row={{ gutter: [10, 10] }}>
                    <CommonValidationTextField name="defaultConfig.colors" label="Colors" placeholder="e.g. #1a73e8" col={{ xs: 24, md: 12 }} isColorPicker />
                    <CommonValidationTextField name="defaultConfig.fonts" label="Fonts" placeholder="e.g. Inter, sans-serif" col={{ xs: 24, md: 12 }} />
                    <CommonValidationTextField name="defaultConfig.spacing" label="Spacing" placeholder="e.g. 12px" col={{ xs: 24, md: 12 }} />
                    <CommonValidationTextField name="defaultConfig.buttons" label="Buttons" placeholder="e.g. primary, secondary, danger" col={{ xs: 24, md: 12 }} />
                  </CommonFormSection>
                )}
                {type === "layout" && (
                  <CommonFormSection title="Layout" row={{ gutter: [10, 10] }}>
                    <Col xs={24}>
                      <CommonFormSection title="header">
                        <FieldArray name="layoutJSON.header">
                          {({ push, remove }) =>
                            values?.layoutJSON?.header?.map((_, index) => (
                              <Row key={index} gutter={[10, 10]} align="bottom" justify="start">
                                <CommonValidationSelect name={`layoutJSON.header.${index}.componentId`} label="component" options={THEME_SUPPORTED_PAGE_OPTIONS} col={{ xs: 24, md: 8, xl: 8 }} />
                                <CommonValidationTextField type="number" name={`layoutJSON.header.${index}.order`} label="order" col={{ xs: 24, md: 7, xl: 7, xxl: 8 }} />
                                <CommonValidationTextField type="text" name={`layoutJSON.header.${index}.config`} label="config" col={{ xs: 13, sm: 18, md: 5 }} />
                                {(values?.layoutJSON?.header?.length || 0) > 1 && <CommonButton variant="dashed" color="danger" size="large" icon={<GrClose />} col={{ flex: "none" }} onClick={() => remove(index)} />}
                                <CommonButton variant="dashed" color="primary" size="large" icon={<GrAdd />} col={{ flex: "none" }} onClick={() => push({ componentId: "", order: "", config: "" })} />
                              </Row>
                            ))
                          }
                        </FieldArray>
                      </CommonFormSection>
                    </Col>
                    <Col xs={24}>
                      <CommonFormSection title="home">
                        <FieldArray name="layoutJSON.home">
                          {({ push, remove }) =>
                            values?.layoutJSON?.home?.map((_, index) => (
                              <Row key={index} gutter={[10, 10]} align="bottom" justify="start">
                                <CommonValidationSelect name={`layoutJSON.home.${index}.componentId`} label="component" options={THEME_SUPPORTED_PAGE_OPTIONS} col={{ xs: 24, md: 8, xl: 8 }} />
                                <CommonValidationTextField type="number" name={`layoutJSON.home.${index}.order`} label="order" col={{ xs: 24, md: 7, xl: 7, xxl: 8 }} />
                                <CommonValidationTextField type="text" name={`layoutJSON.home.${index}.config`} label="config" col={{ xs: 13, sm: 18, md: 5 }} />
                                {(values?.layoutJSON?.home?.length || 0) > 1 && <CommonButton variant="dashed" color="danger" size="large" icon={<GrClose />} col={{ flex: "none" }} onClick={() => remove(index)} />}
                                <CommonButton variant="dashed" color="primary" size="large" icon={<GrAdd />} col={{ flex: "none" }} onClick={() => push({ componentId: "", order: "", config: "" })} />
                              </Row>
                            ))
                          }
                        </FieldArray>
                      </CommonFormSection>
                    </Col>
                    <Col xs={24}>
                      <CommonFormSection title="product">
                        <FieldArray name="layoutJSON.product">
                          {({ push, remove }) =>
                            values?.layoutJSON?.product?.map((_, index) => (
                              <Row key={index} gutter={[10, 10]} align="bottom" justify="start">
                                <CommonValidationSelect name={`layoutJSON.product.${index}.componentId`} label="component" options={THEME_SUPPORTED_PAGE_OPTIONS} col={{ xs: 24, md: 8, xl: 8 }} />
                                <CommonValidationTextField type="number" name={`layoutJSON.product.${index}.order`} label="order" col={{ xs: 24, md: 7, xl: 7, xxl: 8 }} />
                                <CommonValidationTextField type="text" name={`layoutJSON.product.${index}.config`} label="config" col={{ xs: 13, sm: 18, md: 5 }} />
                                {(values?.layoutJSON?.product?.length || 0) > 1 && <CommonButton variant="dashed" color="danger" size="large" icon={<GrClose />} col={{ flex: "none" }} onClick={() => remove(index)} />}
                                <CommonButton variant="dashed" color="primary" size="large" icon={<GrAdd />} col={{ flex: "none" }} onClick={() => push({ componentId: "", order: "", config: "" })} />
                              </Row>
                            ))
                          }
                        </FieldArray>
                      </CommonFormSection>
                    </Col>
                  </CommonFormSection>
                )}
                {type === "media" && (
                  <CommonFormSection title="Media" row={{ gutter: [10, 10] }}>
                    <CommonFormImageBox name="previewImage" label="Preview Image" type="image" col={{ flex: "auto" }} />
                    <CommonValidationTextField name="demoUrl" label="Demo URL" placeholder="Enter demo URL" col={{ xs: 24, md: 12 }} />
                  </CommonFormSection>
                )}
                {type === "features" && (
                  <CommonFormSection title="Features" row={{ gutter: [10, 10] }}>
                    <CommonValidationSwitch name="isGlobal" label="Global Theme" col={{ xs: 24, md: 8 }} />
                    <CommonValidationSwitch name="isPremium" label="Premium" col={{ xs: 24, md: 8 }} />
                    <CommonValidationSwitch name="isActive" label="Active" col={{ xs: 24, md: 8 }} />
                    <CommonValidationSwitch name="isResponsive" label="Responsive" col={{ xs: 24, md: 8 }} />
                    <CommonValidationSwitch name="seoFriendly" label="SEO Friendly" col={{ xs: 24, md: 8 }} />
                    <CommonValidationSwitch name="lazyLoadEnabled" label="Lazy Load Enabled" col={{ xs: 24, md: 8 }} />
                  </CommonFormSection>
                )}
                <CommonBottomActionBar save isLoading={isAddLoading || isEditLoading} />
              </Form>
            )}
          </Formik>
        </div>
      </CommonCard>
    </div>
  );
};

export default AddEditThemePage;
