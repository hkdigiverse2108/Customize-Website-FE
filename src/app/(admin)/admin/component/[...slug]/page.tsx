"use client";

import { Queries } from "@/api";
import { Mutations } from "@/api/mutations";
import { CommonButton } from "@/attribute";
import { CommonBottomActionBar, CommonCard, CommonFormSection } from "@/components/common";
import { PAGE_TITLE } from "@/constants";
import { COMPONENT_CATEGORY_OPTIONS, COMPONENT_EDIT_MODE_OPTIONS, COMPONENT_TYPE_OPTIONS, THEME_SETTING_GROUP_OPTIONS, THEME_SETTING_TYPE, THEME_SETTING_TYPE_OPTIONS, THEME_SUPPORTED_PAGE_OPTIONS } from "@/data";
import { ComponentFormValues, ThemeSectionProps } from "@/type";
import { ComponentSchema, GenerateOptions, GetChangedFields, MapConfig, RemoveEmptyFields, useDynamicSlug } from "@/utils";
import { Col, Divider, Row, Segmented } from "antd";
import { FieldArray, Form, Formik, FormikHelpers } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { GrAdd, GrClose } from "react-icons/gr";

const CommonFormImageBox = dynamic(() => import("@/attribute").then((mod) => mod.CommonFormImageBox), { ssr: false });
const CommonValidationSelect = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationSelect), { ssr: false });
const CommonValidationSwitch = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationSwitch), { ssr: false });
const CommonValidationTextField = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationTextField), { ssr: false });

const AddEditComponentPage = () => {
  const router = useRouter();
  const [type, setType] = useState("basic");

  const { mutate: addData, isPending: isAddLoading } = Mutations.useAddComponent();
  const { mutate: editData, isPending: isEditLoading } = Mutations.useEditComponent();
  const { mode, id } = useDynamicSlug(["mode", "id"] as const);
  const isEditing = Boolean(id) && mode === "edit";
  const pageMode = isEditing ? "EDIT" : "ADD";

  const { data, isLoading: isDataLoading } = Queries.useGetComponentById(id, !!id);
  const { data: storesData, isLoading: isStoresLoading } = Queries.useGetStore({});
  const { data: componentsData, isLoading: isComponentsLoading } = Queries.useGetComponent({});

  const Data = data?.data;
  const pageTitle = PAGE_TITLE.COMPONENT[pageMode];

  const initialValues: ComponentFormValues = {
    storeId: Data?.storeId || "",
    sourceComponentId: Data?.sourceComponentId || "",
    name: Data?.name || "",
    type: Data?.type || "",
    category: Data?.category || "",
    label: Data?.label || "",
    icon: Data?.icon || "",
    previewImage: Data?.previewImage || "",
    isReusable: Data?.isReusable ?? false,
    isGlobal: Data?.isGlobal ?? false,
    isActive: Data?.isActive ?? true,
    supportedPages: Data?.supportedPages || [],
    supportedThemes: Data?.supportedThemes || [],
    version: Data?.version || "",
    isDeprecated: Data?.isDeprecated ?? false,
    configJSON: MapConfig(Data?.configJSON, { key: "", value: "", type: "", label: "", group: "" }),
    defaultConfig: MapConfig(Data?.defaultConfig, { key: "", value: "", type: "", label: "", group: "" }),
    configSchema: MapConfig(Data?.configSchema, { key: "", type: "", label: "", group: "", options: [], placeholder: "" }),
  };
  const handleSubmit = (values: ComponentFormValues, { resetForm }: FormikHelpers<ComponentFormValues>) => {
    const changedFields = GetChangedFields(values, Data);
    const handleSuccess = () => {
      resetForm();
      router.back();
    };
    if (isEditing) editData({ id, ...changedFields }, { onSuccess: handleSuccess });
    else addData(RemoveEmptyFields(values), { onSuccess: handleSuccess });
  };

  const ThemeSection: FC<ThemeSectionProps> = ({ title, name, values }) => {
    const data = values?.[name] || [];
    return (
      <CommonFormSection title={title} row={{ gutter: [10, 10] }}>
        <Col xs={24}>
          <FieldArray name={name}>
            {({ push, remove }) =>
              data.map((_: any, index: number) => (
                <div key={index}>
                  {["configSchema"].includes(name) ? (
                    <Row key={index} gutter={[10, 10]} align="top" justify="start">
                      <CommonValidationTextField name={`${name}.${index}.key`} label="Key" placeholder="Enter key" col={{ xs: 24, md: 8 }} />
                      <CommonValidationTextField name={`${name}.${index}.label`} label="Label" placeholder="Enter label" col={{ xs: 24, md: 8 }} />
                      <CommonValidationTextField name={`${name}.${index}.placeholder`} label="Place holder" placeholder="Enter place holder" col={{ xs: 24, md: 8 }} />
                      <CommonValidationSelect name={`${name}.${index}.options`} label="options" placeholder="Enter options" options={[]} mode="tags" col={{ xs: 24, md: 8 }} />
                      <CommonValidationSelect name={`${name}.${index}.type`} label="Type" placeholder="Enter type" options={THEME_SETTING_TYPE_OPTIONS} col={{ xs: 24, md: 8 }} />
                      <CommonValidationSelect name={`${name}.${index}.group`} label="Group" placeholder="Enter group" options={THEME_SETTING_GROUP_OPTIONS} col={{ flex: "auto" }} />
                      {(data?.length || 0) > 1 && <CommonButton variant="dashed" color="danger" size="large" icon={<GrClose />} col={{ flex: "none" }} onClick={() => remove(index)} />}
                      <CommonButton variant="dashed" color="primary" size="large" icon={<GrAdd />} col={{ flex: "none" }} onClick={() => push({ key: "", value: "", type: "", label: "", group: "" })} />
                    </Row>
                  ) : (
                    <Row gutter={[10, 10]} align="top">
                      <CommonValidationTextField name={`${name}.${index}.key`} label="Key" placeholder="Enter key" col={{ xs: 24, md: 8 }} />
                      <CommonValidationTextField name={`${name}.${index}.value`} label="Value" placeholder="Enter value" isColorPicker={THEME_SETTING_TYPE.COLOR === data[index]?.type} col={{ xs: 24, md: 8 }} />
                      <CommonValidationSelect name={`${name}.${index}.type`} label="Type" placeholder="Enter type" options={THEME_SETTING_TYPE_OPTIONS} col={{ xs: 24, md: 8 }} />
                      <CommonValidationTextField name={`${name}.${index}.label`} label="Label" placeholder="Enter label" col={{ xs: 24, md: 12 }} />
                      <CommonValidationSelect name={`${name}.${index}.group`} label="Group" placeholder="Enter group" options={THEME_SETTING_GROUP_OPTIONS} col={{ flex: "auto" }} />
                      {data.length > 1 && <CommonButton variant="dashed" color="danger" icon={<GrClose />} col={{ flex: "none" }} onClick={() => remove(index)} />}
                      <CommonButton variant="dashed" color="primary" icon={<GrAdd />} col={{ flex: "none" }} onClick={() => push({ key: "", value: "", type: "", label: "", group: "" })} />
                    </Row>
                  )}
                  {index < data.length - 1 && <Divider className="my-3!" />}
                </div>
              ))
            }
          </FieldArray>
        </Col>
      </CommonFormSection>
    );
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 rounded-lg border border-slate-100 bg-white/90 p-5 backdrop-blur">
        <div className="text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">Admin {PAGE_TITLE.COMPONENT.BASE} editor</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{pageTitle}</h1>
          <p className="mt-0 text-sm leading-6 text-slate-500">Manage store details, business information, domain settings, and customer-facing content from a single structured admin interface.</p>{" "}
        </div>
      </div>
      <CommonCard cardProps={{ title: `${PAGE_TITLE.COMPONENT.BASE} Details`, loading: isDataLoading, style: { borderRadius: 10, overflow: "hidden" } }}>
        <div className="flex! flex-col gap-3!">
          <Segmented<string> className="mb-6 custom-scrollbar overflow-y-auto" size="large" options={COMPONENT_EDIT_MODE_OPTIONS} onChange={(value) => setType(value)} />
          <Formik<ComponentFormValues> enableReinitialize initialValues={initialValues} validationSchema={ComponentSchema} onSubmit={handleSubmit}>
            {({ values }) => (
              <Form className="space-y-5">
                {type === "basic" && (
                  <>
                    <CommonFormSection title="Basic Details" row={{ gutter: [10, 10] }}>
                      <CommonValidationSelect name="storeId" label="Store" placeholder="Select store" options={GenerateOptions(storesData?.data?.stores)} loading={isStoresLoading} col={{ xs: 24, md: 12 }} />
                      <CommonValidationSelect name="sourceComponentId" label="Source Component" placeholder="Select source component" options={GenerateOptions(componentsData?.data?.components)} loading={isComponentsLoading} col={{ xs: 24, md: 12 }} />
                      <CommonValidationTextField name="name" label="Component Name" placeholder="Enter component name" col={{ xs: 24, md: 12 }} required />
                      <CommonValidationSelect name="type" label="Type" placeholder="Enter type" options={COMPONENT_TYPE_OPTIONS} col={{ xs: 24, md: 12 }} required />
                      <CommonValidationSelect name="category" label="Category" placeholder="Enter category" options={COMPONENT_CATEGORY_OPTIONS} col={{ xs: 24, md: 12 }} />
                      <CommonValidationTextField name="label" label="Label" placeholder="Enter label" col={{ xs: 24, md: 12 }} />
                      <CommonValidationTextField name="icon" label="Icon" placeholder="Enter icon" col={{ xs: 24, md: 12 }} />
                      <CommonValidationTextField name="version" label="Version" placeholder="e.g. 1.0.0" col={{ xs: 24, md: 12 }} />
                      <CommonFormImageBox name="previewImage" label="Preview Image" type="image" col={{ xs: 24, md: 12 }} />
                    </CommonFormSection>
                  </>
                )}
                {type === "configJSON" && <ThemeSection title="configJSON" name="configJSON" values={values} />}
                {type === "defaultConfig" && <ThemeSection title="Default Config" name="defaultConfig" values={values} />}
                {type === "configSchema" && <ThemeSection title="configSchema" name="configSchema" values={values} />}
                {type === "supported" && (
                  <CommonFormSection title="Supported" row={{ gutter: [10, 10] }}>
                    <CommonValidationSelect name="supportedThemes" label="Supported Themes (not working)" placeholder="Comma separated" options={[]} mode="multiple" col={{ xs: 24, md: 12 }} />
                    <CommonValidationSelect name="supportedPages" label="Supported Pages" placeholder="Comma separated" options={THEME_SUPPORTED_PAGE_OPTIONS} mode="multiple" col={{ xs: 24, md: 12 }} />
                  </CommonFormSection>
                )}
                {type === "features" && (
                  <>
                    <CommonFormSection title="Features" row={{ gutter: [10, 10] }}>
                      <CommonValidationSwitch name="isGlobal" label="Global Component" col={{ xs: 24, md: 12 }} />
                      <CommonValidationSwitch name="isReusable" label="Reusable Component" col={{ xs: 24, md: 12 }} />
                      <CommonValidationSwitch name="isActive" label="Active" col={{ xs: 24, md: 12 }} />
                      <CommonValidationSwitch name="isDeprecated" label="Deprecated" col={{ xs: 24, md: 12 }} />
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

export default AddEditComponentPage;
