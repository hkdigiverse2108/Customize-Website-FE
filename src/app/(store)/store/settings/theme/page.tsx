"use client";

import { Queries, Mutations } from "@/api";
import { CommonButton, CommonValidationSelect } from "@/attribute";
import { CommonCard, CommonFormSection } from "@/components/common";
import { ThemeSettingFormValues } from "@/type";
import { ThemeSettingSchema } from "@/utils";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { FiEdit2, FiLayout, FiZap, FiSettings } from "react-icons/fi";
import ThemeSettingOverview from "./ThemeSettingOverview";
import { Divider, message } from "antd";

const ThemeSettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { data: storeData } = Queries.useGetStore({});
  const activeStore = storeData?.data?.stores?.[0];
  const storeId = activeStore?._id;

  const { data: themeData, isLoading: isThemeLoading } = Queries.useGetThemeSetting(storeId);
  const Data = themeData?.data;

  // Ideally we should have a query to fetch all available themes
  // const { data: allThemesData } = Queries.useGetAllThemes(); 
  
  const { mutate: upsertTheme, isPending: isUpsertLoading } = Mutations.useUpsertThemeSetting();
  const { mutate: publishTheme, isPending: isPublishLoading } = Mutations.usePublishTheme();

  const initialValues: ThemeSettingFormValues = {
    themeId: Data?.themeId || "662646271c062c3e449f8b1a", // Example fallback
    themeConfig: Data?.themeConfig || {},
  };

  const handleSubmit = (values: ThemeSettingFormValues, { resetForm }: FormikHelpers<ThemeSettingFormValues>) => {
    if (!storeId) return;

    upsertTheme(
      { ...values, storeId },
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
          <Formik<ThemeSettingFormValues> enableReinitialize initialValues={initialValues} validationSchema={ThemeSettingSchema} onSubmit={handleSubmit}>
            {() => (
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

                <div className="bg-slate-50/50 p-6 rounded-xl border border-dashed border-slate-200 text-center">
                  <div className="h-12 w-12 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto mb-3 shadow-sm text-slate-400">
                    <FiSettings />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">Advanced Theme Configuration</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Specific theme variables (like grid sizes, section toggles, etc.) will appear here based on the selected theme's capabilities.
                  </p>
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
