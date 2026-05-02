"use client";

import { Queries, Mutations } from "@/api";
import { CommonButton, CommonValidationSelect } from "@/attribute";
import { CommonCard, CommonFormSection } from "@/components/common";
import { ThemeSettingFormValues, ThemeSettingItem } from "@/type";
import { ThemeSettingSchema } from "@/utils";
import { Form, Formik, FormikHelpers } from "formik";
import { useState, useMemo } from "react";
import { FiEdit2, FiLayout, FiZap, FiSettings } from "react-icons/fi";
import ThemeSettingOverview from "./ThemeSettingOverview";
import { ColorPicker, Divider, message, Slider } from "antd";

// Helper to convert array of {key, value} to a nested object
const arrayToNestedObject = (arr: ThemeSettingItem[] = []) => {
  const result: any = {};
  arr.forEach(item => {
    const keys = item.key.split('.');
    keys.reduce((acc, key, index) => {
      if (index === keys.length - 1) {
        acc[key] = item.value;
      } else {
        acc[key] = acc[key] || {};
      }
      return acc[key];
    }, result);
  });
  return result;
};

// Helper to convert a nested object to a flat array of {key, value}
const nestedObjectToFlatArray = (obj: any, prefix = ''): ThemeSettingItem[] => {
  return Object.keys(obj).reduce((acc: ThemeSettingItem[], k: string) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      acc.push(...nestedObjectToFlatArray(obj[k], pre + k));
    } else {
      acc.push({ key: pre + k, value: obj[k] });
    }
    return acc;
  }, []);
};

const ThemeSettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { data: storeData } = Queries.useGetStore({});
  const activeStore = storeData?.data?.stores?.[0];
  const storeId = activeStore?._id;

  const { data: themeData, isLoading: isThemeLoading } = Queries.useGetThemeSetting(storeId);
  const Data = themeData?.data;

  const { mutate: upsertTheme, isPending: isUpsertLoading } = Mutations.useUpsertThemeSetting();
  const { mutate: publishTheme, isPending: isPublishLoading } = Mutations.usePublishTheme();

  const initialValues = useMemo(() => ({
    themeId: Data?.themeId || "662646271c062c3e449f8b1a",
    customStyles: arrayToNestedObject(Data?.customStyles || []),
    customSettings: arrayToNestedObject(Data?.customSettings || []),
  }), [Data]);

  const handleSubmit = (values: any, { resetForm }: FormikHelpers<any>) => {
    if (!storeId) return;

    const payload: ThemeSettingFormValues = {
      themeId: values.themeId,
      customStyles: nestedObjectToFlatArray(values.customStyles || {}),
      customSettings: nestedObjectToFlatArray(values.customSettings || {}),
    };

    upsertTheme(
      { ...payload, storeId },
      {
        onSuccess: () => {
          setIsEditing(false);
          resetForm();
          message.success("Theme configuration saved successfully!");
        },
      }
    );
  };

  const handlePublish = () => {
    if (!storeId || !Data?.themeId) return;

    publishTheme(
      { storeId, themeId: Data.themeId },
      {
        onSuccess: () => {
          message.success("Theme published to your live storefront!");
        },
      }
    );
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 rounded-lg border border-slate-100 bg-white/90 p-5 backdrop-blur">
        <div className="flex justify-between items-center">
          <div className="text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">Storefront Management</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{isEditing ? "Modify Theme Layout" : "Store Themes"}</h1>
            <p className="mt-0 text-sm leading-6 text-slate-500">Choose and configure the layout that best represents your brand.</p>
          </div>
          {!isEditing && (
            <CommonButton type="primary" onClick={handlePublish} loading={isPublishLoading} disabled={!Data?.themeId}>
              <span className="flex items-center gap-1.5"><FiZap size={14} /> Publish Theme</span>
            </CommonButton>
          )}
        </div>
      </div>

      <CommonCard
        cardProps={{
          title: (
            <div className="flex justify-between items-center w-full pe-2">
              <span className="flex items-center gap-2">
                <FiLayout size={18} className="text-slate-400" />
                {isEditing ? "Configuration Panel" : "Active Theme Details"}
              </span>
              {!isEditing && (
                <CommonButton onClick={() => setIsEditing(true)} size="small">
                  <span className="flex items-center gap-1.5"><FiEdit2 size={12} /> Customize Theme</span>
                </CommonButton>
              )}
            </div>
          ),
          loading: isThemeLoading,
          style: { borderRadius: 10, overflow: "hidden" },
        }}
      >
        {!isEditing ? (
          <ThemeSettingOverview Data={Data} />
        ) : (
          <Formik enableReinitialize initialValues={initialValues} validationSchema={ThemeSettingSchema} onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (
              <Form className="space-y-6">

                <CommonFormSection title="Theme Selection" row={{ gutter: [16, 16] }}>
                  <CommonValidationSelect
                    name="themeId"
                    label="Choose Active Theme"
                    col={{ span: 24 }}
                    options={[
                      { label: "Modern Minimalist (Default)", value: "662646271c062c3e449f8b1a" },
                      { label: "Classic Retail", value: "662646271c062c3e449f8b1b" },
                      { label: "Dark Elegance", value: "662646271c062c3e449f8b1c" },
                    ]}
                  />
                </CommonFormSection>

                <Divider className="my-0 border-slate-100" />

                <div className="space-y-8">
                  <CommonFormSection title="Custom Brand Colors" row={{ gutter: [24, 24] }}>
                    <div className="col-span-24 md:col-span-6">
                      <p className="text-xs font-bold text-slate-500 uppercase mb-2">Primary Color</p>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <ColorPicker 
                          value={values.customStyles?.colors?.primary || "#000000"} 
                          onChange={(color) => setFieldValue('customStyles.colors.primary', color.toHexString())} 
                          showText 
                        />
                      </div>
                    </div>
                    <div className="col-span-24 md:col-span-6">
                      <p className="text-xs font-bold text-slate-500 uppercase mb-2">Secondary Color</p>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <ColorPicker 
                          value={values.customStyles?.colors?.secondary || "#475569"} 
                          onChange={(color) => setFieldValue('customStyles.colors.secondary', color.toHexString())} 
                          showText 
                        />
                      </div>
                    </div>
                    <div className="col-span-24 md:col-span-6">
                      <p className="text-xs font-bold text-slate-500 uppercase mb-2">Background</p>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <ColorPicker 
                          value={values.customStyles?.colors?.background || "#ffffff"} 
                          onChange={(color) => setFieldValue('customStyles.colors.background', color.toHexString())} 
                          showText 
                        />
                      </div>
                    </div>
                    <div className="col-span-24 md:col-span-6">
                      <p className="text-xs font-bold text-slate-500 uppercase mb-2">Text Color</p>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <ColorPicker 
                          value={values.customStyles?.colors?.text || "#0f172a"} 
                          onChange={(color) => setFieldValue('customStyles.colors.text', color.toHexString())} 
                          showText 
                        />
                      </div>
                    </div>
                  </CommonFormSection>

                  <CommonFormSection title="Custom Typography" row={{ gutter: [24, 24] }}>
                    <CommonValidationSelect 
                      name="customStyles.fonts.heading" 
                      label="Heading Font"
                      col={{ span: 12 }}
                      options={[
                        { label: "Inter", value: "Inter" },
                        { label: "Roboto", value: "Roboto" },
                        { label: "Poppins", value: "Poppins" },
                        { label: "Playfair Display", value: "Playfair Display" },
                      ]}
                    />
                    <CommonValidationSelect 
                      name="customStyles.fonts.body" 
                      label="Body Font"
                      col={{ span: 12 }}
                      options={[
                        { label: "Inter", value: "Inter" },
                        { label: "Roboto", value: "Roboto" },
                        { label: "Open Sans", value: "Open Sans" },
                        { label: "Lato", value: "Lato" },
                      ]}
                    />
                  </CommonFormSection>

                  <CommonFormSection title="Layout & Buttons" row={{ gutter: [24, 24] }}>
                    <div className="col-span-24 md:col-span-12">
                      <p className="text-sm font-semibold text-slate-700 mb-3 text-left">Base Spacing (px)</p>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <Slider 
                          min={0} max={64} step={4}
                          value={values.customStyles?.layout?.spacing || 16}
                          onChange={(val) => setFieldValue('customStyles.layout.spacing', val)}
                          marks={{ 0: '0', 16: '16', 32: '32', 64: '64' }}
                        />
                      </div>
                    </div>
                    <div className="col-span-24 md:col-span-12">
                      <p className="text-sm font-semibold text-slate-700 mb-3 text-left">Button Roundness (Radius)</p>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <Slider 
                          min={0} max={24} step={2}
                          value={values.customSettings?.buttons?.borderRadius || 8}
                          onChange={(val) => setFieldValue('customSettings.buttons.borderRadius', val)}
                          marks={{ 0: 'Square', 8: '8px', 24: 'Full' }}
                        />
                      </div>
                    </div>
                  </CommonFormSection>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                  <CommonButton title="Cancel" variant="dashed" onClick={() => setIsEditing(false)} />
                  <CommonButton title="Save Configuration" type="primary" htmlType="submit" loading={isUpsertLoading} />
                </div>
              </Form>
            )}
          </Formik>
        )}
      </CommonCard>
    </div>
  );
};

export default ThemeSettingsPage;
