"use client";

import { Queries } from "@/api";
import { Mutations } from "@/api/mutations";
import { CommonButton } from "@/attribute";
import { CommonBottomActionBar, CommonCard, CommonFormSection } from "@/components/common";
import { PAGE_TITLE } from "@/constants";
import { THEME_EDIT_MODE_OPTIONS, THEME_SETTING_GROUP_OPTIONS, THEME_SETTING_TYPE, THEME_SETTING_TYPE_OPTIONS, THEME_SUPPORTED_PAGE_OPTIONS, THEME_TYPE_OPTIONS } from "@/data";
import { ThemeFormValues } from "@/type";
import { GetChangedFields, RemoveEmptyFields, ThemeSchema, useDynamicSlug } from "@/utils";
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
    breakpoints: Data?.breakpoints || [{ key: "", value: "", type: "", label: "", group: "" }],
    styles: Data?.styles || [{ key: "", value: "", type: "", label: "", group: "" }],
    defaultConfig: Data?.defaultConfig || [{ key: "", value: "", type: "", label: "", group: "" }],
    componentSchema: Data?.componentSchema || [{ key: "", type: "", label: "", group: "", options: [], placeholder: "", validation: "" }],
    settingsSchema: Data?.settingsSchema || [{ key: "", type: "", label: "", group: "", options: [], placeholder: "", validation: "" }],
    layoutJSON: Data?.layoutJSON || [{ page: "", sections: [{ componentId: "", order: 1, config: [{ key: "", value: "", type: "", label: "", group: "" }] }] }],
    draftLayoutJSON: Data?.draftLayoutJSON || [{ page: "", sections: [{ componentId: "", order: 1, config: [{ key: "", value: "", type: "", label: "", group: "" }] }] }],
  };

  const handleSubmit = (values: ThemeFormValues, { resetForm }: FormikHelpers<ThemeFormValues>) => {
    const cleanedPayload = RemoveEmptyFields(values);
    const changedFields = GetChangedFields(values, Data);
    const handleSuccess = () => {
      resetForm();
      router.back();
    };
    if (isEditing) editData({ id, ...changedFields }, { onSuccess: handleSuccess });
    else addData(cleanedPayload, { onSuccess: handleSuccess });
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
          <Segmented<string> className="mb-6 custom-scrollbar overflow-y-auto" size="large" options={THEME_EDIT_MODE_OPTIONS} onChange={(value) => setType(value)} />
          <Formik<ThemeFormValues> enableReinitialize initialValues={initialValues} validationSchema={ThemeSchema} onSubmit={handleSubmit}>
            {({ values }) => (
              <Form className="space-y-5">
                {type === "basic" && (
                  <>
                    <CommonFormSection title="Basic Details" row={{ gutter: [10, 10] }}>
                      <CommonValidationTextField name="name" label="Theme Name" placeholder="Enter theme name" col={{ xs: 24, md: 12 }} required />
                      <CommonValidationTextField name="slug" label="Slug" placeholder="Enter slug" col={{ xs: 24, md: 12 }} required />
                      <CommonValidationTextField name="description" label="Description" placeholder="Enter description" col={{ xs: 24 }} multiline />
                    </CommonFormSection>
                    <CommonFormSection title="Classification" row={{ gutter: [10, 10] }}>
                      <CommonValidationTextField name="category" label="Category" placeholder="Enter category" col={{ xs: 24, md: 8 }} />
                      <CommonValidationSelect name="type" label="Type" placeholder="Enter type" options={[]} mode="tags" col={{ xs: 24, md: 8 }} />
                      <CommonValidationSelect name="tags" label="Tags" placeholder="Enter tags" options={THEME_TYPE_OPTIONS} mode="multiple" col={{ xs: 24, md: 8 }} />
                    </CommonFormSection>
                    <CommonFormSection title="Pricing & Performance" row={{ gutter: [10, 10] }}>
                      <CommonValidationTextField name="price" label="Price" type="number" col={{ xs: 24, md: 12 }} />
                      <CommonValidationTextField name="performanceScore" label="Performance Score" type="number" col={{ xs: 24, md: 12 }} />
                    </CommonFormSection>
                  </>
                )}
                {type === "supported" && (
                  <CommonFormSection title="Supported" row={{ gutter: [10, 10] }}>
                    <CommonValidationSelect name="supportedComponents" label="Supported Components" placeholder="Comma separated" options={[]} mode="tags" col={{ xs: 24, md: 12 }} />
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
                                  <CommonValidationDatePicker name={`changelog.${index}.date`} label="Date" pickerType="date" col={{ xs: 24, md: 7, xl: 7, xxl: 8 }} />
                                  <CommonValidationTextField name={`changelog.${index}.changes`} label="Changes" placeholder="Select changes" col={{ flex: "auto" }} />
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
                    <Col xs={24}>
                      <FieldArray name="breakpoints">
                        {({ push, remove }) =>
                          values?.breakpoints?.map((_, index) => (
                            <div key={index}>
                              <Row key={index} gutter={[10, 10]} align="bottom" justify="start">
                                <CommonValidationTextField name={`breakpoints.${index}.key`} label="Key" placeholder="e.g. primaryColor" col={{ xs: 24, md: 8 }} />
                                <CommonValidationTextField name={`breakpoints.${index}.value`} label="Value" placeholder="e.g. #1a73e8" isColorPicker={THEME_SETTING_TYPE.COLOR === values?.breakpoints?.[index].type} col={{ xs: 24, md: 8 }} />
                                <CommonValidationSelect name={`breakpoints.${index}.type`} label="Type" placeholder="e.g. text, background, color" options={THEME_SETTING_TYPE_OPTIONS} col={{ xs: 24, md: 8 }} />
                                <CommonValidationTextField name={`breakpoints.${index}.label`} label="Label" placeholder="e.g. Primary Color" col={{ xs: 24, md: 12 }} />
                                <CommonValidationSelect name={`breakpoints.${index}.group`} label="Group" placeholder="e.g. colors" options={THEME_SETTING_GROUP_OPTIONS} col={{ flex: "auto" }} />
                                {(values?.breakpoints?.length || 0) > 1 && <CommonButton variant="dashed" color="danger" size="large" icon={<GrClose />} col={{ flex: "none" }} onClick={() => remove(index)} />}
                                <CommonButton variant="dashed" color="primary" size="large" icon={<GrAdd />} col={{ flex: "none" }} onClick={() => push({ key: "", value: "", type: "", label: "", group: "" })} />
                              </Row>
                              {index < (values?.breakpoints?.length || 0) - 1 && <Divider className="my-3!" />}
                            </div>
                          ))
                        }
                      </FieldArray>
                    </Col>
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
                                <CommonValidationTextField name={`styles.${index}.key`} label="Key" placeholder="e.g. primaryColor" col={{ xs: 24, md: 8 }} />
                                <CommonValidationTextField name={`styles.${index}.value`} label="Value" placeholder="e.g. #1a73e8" isColorPicker={THEME_SETTING_TYPE.COLOR === values?.styles?.[index].type} col={{ xs: 24, md: 8 }} />
                                <CommonValidationSelect name={`styles.${index}.type`} label="Type" placeholder="e.g. text, background, color" options={THEME_SETTING_TYPE_OPTIONS} col={{ xs: 24, md: 8 }} />
                                <CommonValidationTextField name={`styles.${index}.label`} label="Label" placeholder="e.g. Primary Color" col={{ xs: 24, md: 12 }} />
                                <CommonValidationSelect name={`styles.${index}.group`} label="Group" placeholder="e.g. colors" options={THEME_SETTING_GROUP_OPTIONS} col={{ flex: "auto" }} />
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
                    <Col xs={24}>
                      <FieldArray name="defaultConfig">
                        {({ push, remove }) =>
                          values?.defaultConfig?.map((_, index) => (
                            <div key={index}>
                              <Row key={index} gutter={[10, 10]} align="bottom" justify="start">
                                <CommonValidationTextField name={`defaultConfig.${index}.key`} label="Key" placeholder="e.g. primaryColor" col={{ xs: 24, md: 8 }} />
                                <CommonValidationTextField name={`defaultConfig.${index}.value`} label="Value" placeholder="e.g. #1a73e8" isColorPicker={THEME_SETTING_TYPE.COLOR === values?.defaultConfig?.[index].type} col={{ xs: 24, md: 8 }} />
                                <CommonValidationSelect name={`defaultConfig.${index}.type`} label="Type" placeholder="e.g. text, background, color" options={THEME_SETTING_TYPE_OPTIONS} col={{ xs: 24, md: 8 }} />
                                <CommonValidationTextField name={`defaultConfig.${index}.label`} label="Label" placeholder="e.g. Primary Color" col={{ xs: 24, md: 12 }} />
                                <CommonValidationSelect name={`defaultConfig.${index}.group`} label="Group" placeholder="e.g. colors" options={THEME_SETTING_GROUP_OPTIONS} col={{ flex: "auto" }} />
                                {(values?.defaultConfig?.length || 0) > 1 && <CommonButton variant="dashed" color="danger" size="large" icon={<GrClose />} col={{ flex: "none" }} onClick={() => remove(index)} />}
                                <CommonButton variant="dashed" color="primary" size="large" icon={<GrAdd />} col={{ flex: "none" }} onClick={() => push({ key: "", value: "", type: "", label: "", group: "" })} />
                              </Row>
                              {index < (values?.defaultConfig?.length || 0) - 1 && <Divider className="my-3!" />}
                            </div>
                          ))
                        }
                      </FieldArray>
                    </Col>
                  </CommonFormSection>
                )}
                {type === "layout" && (
                  <CommonFormSection title="Layout" row={{ gutter: [10, 10] }}>
                    <Col xs={24}>
                      <FieldArray name="layoutJSON">
                        {({ push, remove }) =>
                          values?.layoutJSON?.map((_, index) => (
                            <div key={index}>
                              <Row gutter={[10, 10]} align="bottom" justify="start">
                                <CommonValidationTextField name={`layoutJSON.${index}.page`} label="Page" placeholder="e.g. home" col={{ flex: "auto" }} />
                                {(values?.layoutJSON?.length || 0) > 1 && <CommonButton variant="dashed" color="danger" size="large" icon={<GrClose />} col={{ flex: "none" }} onClick={() => remove(index)} />}
                                <CommonButton variant="dashed" color="primary" size="large" icon={<GrAdd />} col={{ flex: "none" }} onClick={() => push({ page: "", sections: [{ componentId: "", order: index + 2, config: [{ key: "", value: "", type: "", label: "", group: "" }] }] })} />
                                <Col xs={24}>
                                  <CommonFormSection title="Sections">
                                    <FieldArray name={`layoutJSON.${index}.sections`}>
                                      {({ push, remove }) =>
                                        values?.layoutJSON?.[index]?.sections?.map((_, idx) => (
                                          <div key={idx}>
                                            <Row gutter={[10, 10]} align="bottom" justify="start">
                                              <CommonValidationTextField name={`layoutJSON.${index}.sections.${idx}.componentId`} label="Section ID" placeholder="e.g. section-1" col={{ flex: "auto" }} />
                                              <CommonValidationTextField name={`layoutJSON.${index}.sections.${idx}.order`} label="Order" type="number" placeholder="e.g. 1" col={{ xs: 13, sm: 18, md: 8 }} />
                                              {(values?.layoutJSON?.[index]?.sections?.length || 0) > 1 && <CommonButton variant="dashed" color="danger" size="large" icon={<GrClose />} col={{ flex: "none" }} onClick={() => remove(idx)} />}
                                              <CommonButton variant="dashed" color="primary" size="large" icon={<GrAdd />} col={{ flex: "none" }} onClick={() => push({ componentId: "", order: 1, config: [{ key: "", value: "", type: "", label: "", group: "" }] })} />
                                              <Col xs={24}>
                                                <CommonFormSection title="Config">
                                                  <FieldArray name={`layoutJSON.${index}.sections.${idx}.config`}>
                                                    {({ push, remove }) =>
                                                      values?.layoutJSON?.[index]?.sections?.[idx]?.config?.map((_, id) => (
                                                        <div key={id}>
                                                          <Row gutter={[10, 10]} align="bottom" justify="start">
                                                            <CommonValidationTextField name={`layoutJSON.${index}.sections.${idx}.config.${id}.key`} label="Key" placeholder="e.g. title" col={{ xs: 24, md: 8 }} />
                                                            <CommonValidationTextField name={`layoutJSON.${index}.sections.${idx}.config.${id}.value`} label="Value" placeholder="e.g. Welcome to our Store" isColorPicker={THEME_SETTING_TYPE.COLOR === values?.layoutJSON?.[index].sections?.[idx].config?.[id].type} col={{ xs: 24, md: 8 }} />
                                                            <CommonValidationSelect name={`layoutJSON.${index}.sections.${idx}.config.${id}.type`} label="Type" placeholder="e.g. text, background, color" options={THEME_SETTING_TYPE_OPTIONS} col={{ xs: 24, md: 8 }} />
                                                            <CommonValidationTextField name={`layoutJSON.${index}.sections.${idx}.config.${id}.label`} label="Label" placeholder="e.g. Hero Section Title" col={{ xs: 24, md: 12 }} />
                                                            <CommonValidationSelect name={`layoutJSON.${index}.sections.${idx}.config.${id}.group`} label="Group" placeholder="e.g. General" options={THEME_SETTING_GROUP_OPTIONS} col={{ flex: "auto" }} />
                                                            {(values?.layoutJSON?.[index]?.sections?.[idx]?.config?.length || 0) > 1 && <CommonButton variant="dashed" color="danger" size="large" icon={<GrClose />} col={{ flex: "none" }} onClick={() => remove(id)} />}
                                                            <CommonButton variant="dashed" color="primary" size="large" icon={<GrAdd />} col={{ flex: "none" }} onClick={() => push({ key: "", value: "", type: "", label: "", group: "" })} />
                                                          </Row>
                                                          {id < (values?.layoutJSON?.[index]?.sections?.[idx]?.config?.length || 0) - 1 && <Divider className="my-3!" />}
                                                        </div>
                                                      ))
                                                    }
                                                  </FieldArray>
                                                </CommonFormSection>
                                              </Col>
                                            </Row>
                                            {idx < (values?.layoutJSON?.[index]?.sections?.length || 0) - 1 && <Divider className="my-3!" />}
                                          </div>
                                        ))
                                      }
                                    </FieldArray>
                                  </CommonFormSection>
                                </Col>
                              </Row>
                              {index < (values?.layoutJSON?.length || 0) - 1 && <Divider className="my-3!" />}
                            </div>
                          ))
                        }
                      </FieldArray>
                    </Col>
                  </CommonFormSection>
                )}
                {type === "draftLayoutJSON" && (
                  <CommonFormSection title="Draft Layout" row={{ gutter: [10, 10] }}>
                    <Col xs={24}>
                      <FieldArray name="draftLayoutJSON">
                        {({ push, remove }) =>
                          values?.draftLayoutJSON?.map((_, index) => (
                            <div key={index}>
                              <Row gutter={[10, 10]} align="bottom" justify="start">
                                <CommonValidationTextField name={`draftLayoutJSON.${index}.page`} label="Page" placeholder="e.g. home" col={{ flex: "auto" }} />
                                {(values?.draftLayoutJSON?.length || 0) > 1 && <CommonButton variant="dashed" color="danger" size="large" icon={<GrClose />} col={{ flex: "none" }} onClick={() => remove(index)} />}
                                <CommonButton variant="dashed" color="primary" size="large" icon={<GrAdd />} col={{ flex: "none" }} onClick={() => push({ page: "", sections: [{ componentId: "", order: index + 2, config: [{ key: "", value: "", type: "", label: "", group: "" }] }] })} />
                                <Col xs={24}>
                                  <CommonFormSection title="Sections">
                                    <FieldArray name={`draftLayoutJSON.${index}.sections`}>
                                      {({ push, remove }) =>
                                        values?.draftLayoutJSON?.[index]?.sections?.map((_, idx) => (
                                          <div key={idx}>
                                            <Row gutter={[10, 10]} align="bottom" justify="start">
                                              <CommonValidationTextField name={`draftLayoutJSON.${index}.sections.${idx}.componentId`} label="Section ID" placeholder="e.g. section-1" col={{ flex: "auto" }} />
                                              <CommonValidationTextField name={`draftLayoutJSON.${index}.sections.${idx}.order`} label="Order" type="number" placeholder="e.g. 1" col={{ xs: 13, sm: 18, md: 8 }} />
                                              {(values?.draftLayoutJSON?.[index]?.sections?.length || 0) > 1 && <CommonButton variant="dashed" color="danger" size="large" icon={<GrClose />} col={{ flex: "none" }} onClick={() => remove(idx)} />}
                                              <CommonButton variant="dashed" color="primary" size="large" icon={<GrAdd />} col={{ flex: "none" }} onClick={() => push({ componentId: "", order: 1, config: [{ key: "", value: "", type: "", label: "", group: "" }] })} />
                                              <Col xs={24}>
                                                <CommonFormSection title="Config">
                                                  <FieldArray name={`draftLayoutJSON.${index}.sections.${idx}.config`}>
                                                    {({ push, remove }) =>
                                                      values?.draftLayoutJSON?.[index]?.sections?.[idx]?.config?.map((_, id) => (
                                                        <div key={id}>
                                                          <Row gutter={[10, 10]} align="bottom" justify="start">
                                                            <CommonValidationTextField name={`draftLayoutJSON.${index}.sections.${idx}.config.${id}.key`} label="Key" placeholder="e.g. title" col={{ xs: 24, md: 8 }} />
                                                            <CommonValidationTextField name={`draftLayoutJSON.${index}.sections.${idx}.config.${id}.value`} label="Value" placeholder="e.g. Welcome to our Store" isColorPicker={THEME_SETTING_TYPE.COLOR === values?.draftLayoutJSON?.[index].sections?.[idx].config?.[id].type} col={{ xs: 24, md: 8 }} />
                                                            <CommonValidationSelect name={`draftLayoutJSON.${index}.sections.${idx}.config.${id}.type`} label="Type" placeholder="e.g. text, background, color" options={THEME_SETTING_TYPE_OPTIONS} col={{ xs: 24, md: 8 }} />
                                                            <CommonValidationTextField name={`draftLayoutJSON.${index}.sections.${idx}.config.${id}.label`} label="Label" placeholder="e.g. Hero Section Title" col={{ xs: 24, md: 12 }} />
                                                            <CommonValidationSelect name={`draftLayoutJSON.${index}.sections.${idx}.config.${id}.group`} label="Group" placeholder="e.g. General" options={THEME_SETTING_GROUP_OPTIONS} col={{ flex: "auto" }} />
                                                            {(values?.draftLayoutJSON?.[index]?.sections?.[idx]?.config?.length || 0) > 1 && <CommonButton variant="dashed" color="danger" size="large" icon={<GrClose />} col={{ flex: "none" }} onClick={() => remove(id)} />}
                                                            <CommonButton variant="dashed" color="primary" size="large" icon={<GrAdd />} col={{ flex: "none" }} onClick={() => push({ key: "", value: "", type: "", label: "", group: "" })} />
                                                          </Row>
                                                          {id < (values?.draftLayoutJSON?.[index]?.sections?.[idx]?.config?.length || 0) - 1 && <Divider className="my-3!" />}
                                                        </div>
                                                      ))
                                                    }
                                                  </FieldArray>
                                                </CommonFormSection>
                                              </Col>
                                            </Row>
                                            {idx < (values?.draftLayoutJSON?.[index]?.sections?.length || 0) - 1 && <Divider className="my-3!" />}
                                          </div>
                                        ))
                                      }
                                    </FieldArray>
                                  </CommonFormSection>
                                </Col>
                              </Row>
                              {index < (values?.draftLayoutJSON?.length || 0) - 1 && <Divider className="my-3!" />}
                            </div>
                          ))
                        }
                      </FieldArray>
                    </Col>
                  </CommonFormSection>
                )}
                {type === "componentSchema" && (
                  <CommonFormSection title="component Schema" row={{ gutter: [10, 10] }}>
                    <Col xs={24}>
                      <FieldArray name="componentSchema">
                        {({ push, remove }) =>
                          values?.componentSchema?.map((_, index) => (
                            <div key={index}>
                              <Row key={index} gutter={[10, 10]} align="bottom" justify="start">
                                <CommonValidationTextField name={`componentSchema.${index}.key`} label="Key" placeholder="Enter key" col={{ xs: 24, md: 8 }} />
                                <CommonValidationTextField name={`componentSchema.${index}.label`} label="Label" placeholder="Enter label" col={{ xs: 24, md: 8 }} />
                                <CommonValidationTextField name={`componentSchema.${index}.placeholder`} label="Place holder" placeholder="Enter place holder" col={{ xs: 24, md: 8 }} />
                                <CommonValidationSelect name={`componentSchema.${index}.options`} label="options" placeholder="Enter options" options={[]} mode="tags" col={{ xs: 24, md: 8 }} />
                                <CommonValidationSelect name={`componentSchema.${index}.type`} label="Type" placeholder="Enter type" options={THEME_SETTING_TYPE_OPTIONS} col={{ xs: 24, md: 8 }} />
                                <CommonValidationSelect name={`componentSchema.${index}.group`} label="Group" placeholder="Enter group" options={THEME_SETTING_GROUP_OPTIONS} col={{ flex: "auto" }} />
                                {(values?.componentSchema?.length || 0) > 1 && <CommonButton variant="dashed" color="danger" size="large" icon={<GrClose />} col={{ flex: "none" }} onClick={() => remove(index)} />}
                                <CommonButton variant="dashed" color="primary" size="large" icon={<GrAdd />} col={{ flex: "none" }} onClick={() => push({ key: "", value: "", type: "", label: "", group: "" })} />
                              </Row>
                              {index < (values?.componentSchema?.length || 0) - 1 && <Divider className="my-3!" />}
                            </div>
                          ))
                        }
                      </FieldArray>
                    </Col>
                  </CommonFormSection>
                )}
                {type === "settingsSchema" && (
                  <CommonFormSection title="settings Schema" row={{ gutter: [10, 10] }}>
                    <Col xs={24}>
                      <FieldArray name="settingsSchema">
                        {({ push, remove }) =>
                          values?.settingsSchema?.map((_, index) => (
                            <div key={index}>
                              <Row key={index} gutter={[10, 10]} align="bottom" justify="start">
                                <CommonValidationTextField name={`settingsSchema.${index}.key`} label="Key" placeholder="Enter key" col={{ xs: 24, md: 8 }} />
                                <CommonValidationTextField name={`settingsSchema.${index}.label`} label="Label" placeholder="Enter label" col={{ xs: 24, md: 8 }} />
                                <CommonValidationTextField name={`settingsSchema.${index}.placeholder`} label="Place holder" placeholder="Enter place holder" col={{ xs: 24, md: 8 }} />
                                <CommonValidationSelect name={`settingsSchema.${index}.options`} label="options" placeholder="Enter options" options={[]} mode="tags" col={{ xs: 24, md: 8 }} />
                                <CommonValidationSelect name={`settingsSchema.${index}.type`} label="Type" placeholder="Enter type" options={THEME_SETTING_TYPE_OPTIONS} col={{ xs: 24, md: 8 }} />
                                <CommonValidationSelect name={`settingsSchema.${index}.group`} label="Group" placeholder="Enter group" options={THEME_SETTING_GROUP_OPTIONS} col={{ flex: "auto" }} />
                                {(values?.settingsSchema?.length || 0) > 1 && <CommonButton variant="dashed" color="danger" size="large" icon={<GrClose />} col={{ flex: "none" }} onClick={() => remove(index)} />}
                                <CommonButton variant="dashed" color="primary" size="large" icon={<GrAdd />} col={{ flex: "none" }} onClick={() => push({ key: "", value: "", type: "", label: "", group: "" })} />
                              </Row>
                              {index < (values?.settingsSchema?.length || 0) - 1 && <Divider className="my-3!" />}
                            </div>
                          ))
                        }
                      </FieldArray>
                    </Col>
                  </CommonFormSection>
                )}
                {type === "features" && (
                  <>
                    <CommonFormSection title="Media" row={{ gutter: [10, 10] }}>
                      <CommonFormImageBox name="previewImage" label="Preview Image" type="image" col={{ flex: "auto" }} />
                      <CommonValidationTextField name="demoUrl" label="Demo URL" placeholder="Enter demo URL" col={{ xs: 24, md: 12 }} />
                    </CommonFormSection>
                    <CommonFormSection title="Features" row={{ gutter: [10, 10] }}>
                      <CommonValidationSwitch name="isGlobal" label="Global Theme" col={{ xs: 24, md: 8 }} />
                      <CommonValidationSwitch name="isPremium" label="Premium" col={{ xs: 24, md: 8 }} />
                      <CommonValidationSwitch name="isActive" label="Active" col={{ xs: 24, md: 8 }} />
                      <CommonValidationSwitch name="isResponsive" label="Responsive" col={{ xs: 24, md: 8 }} />
                      <CommonValidationSwitch name="seoFriendly" label="SEO Friendly" col={{ xs: 24, md: 8 }} />
                      <CommonValidationSwitch name="lazyLoadEnabled" label="Lazy Load Enabled" col={{ xs: 24, md: 8 }} />
                    </CommonFormSection>
                  </>
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
