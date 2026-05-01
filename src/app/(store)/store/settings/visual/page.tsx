"use client";

import { Queries, Mutations } from "@/api";
import { CommonButton, CommonValidationTextField, CommonFormImageBox } from "@/attribute";
import { CommonCard, CommonFormSection } from "@/components/common";
import { VisualSettingFormValues } from "@/type";
import { VisualSettingSchema } from "@/utils";
import { Checkbox, ColorPicker, Divider } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { FiEdit2, FiEye, FiLock, FiLayout, FiCode } from "react-icons/fi";
import VisualSettingOverview from "./VisualSettingOverview";

const VisualSettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { data: storeData } = Queries.useGetStore({});
  const activeStore = storeData?.data?.stores?.[0];
  const storeId = activeStore?._id;

  const { data: visualData, isLoading: isVisualLoading } = Queries.useGetVisualSetting(storeId);
  const Data = visualData?.data;

  const { mutate: upsertVisual, isPending: isUpsertLoading } = Mutations.useUpsertVisualSetting();

  const initialValues: VisualSettingFormValues = {
    favicon: Data?.favicon || "",
    customCSS: Data?.customCSS || "",
    customJS: Data?.customJS || "",
    passwordProtection: {
      enabled: Data?.passwordProtection?.enabled ?? false,
      password: Data?.passwordProtection?.password || "",
      message: Data?.passwordProtection?.message || "Coming Soon",
    },
    checkoutPage: {
      banner: Data?.checkoutPage?.banner || "",
      logo: Data?.checkoutPage?.logo || "",
      accentColor: Data?.checkoutPage?.accentColor || "#000000",
    },
  };

  const handleSubmit = (values: VisualSettingFormValues, { resetForm }: FormikHelpers<VisualSettingFormValues>) => {
    if (!storeId) return;

    upsertVisual(
      { ...values, storeId },
      {
        onSuccess: () => {
          setIsEditing(false);
          resetForm();
        },
      }
    );
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 rounded-lg border border-slate-100 bg-white/90 p-5 backdrop-blur">
        <div className="flex justify-between items-center">
          <div className="text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">Visuals & Branding</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{isEditing ? "Customize Store Appearance" : "Branding & Visuals"}</h1>
            <p className="mt-0 text-sm leading-6 text-slate-500">Manage your store's logo, colors, and extra customizations for a unique identity.</p>
          </div>
        </div>
      </div>

      <CommonCard 
        cardProps={{ 
          title: (
            <div className="flex justify-between items-center w-full pe-2">
              <span className="flex items-center gap-2">
                <FiEye size={18} className="text-slate-400" />
                {isEditing ? "Edit Visual Configuration" : "Visual Identity Overview"}
              </span>
              {!isEditing && (
                <CommonButton onClick={() => setIsEditing(true)} size="small">
                  <span className="flex items-center gap-1.5"><FiEdit2 size={12} /> Customize</span>
                </CommonButton>
              )}
            </div>
          ), 
          loading: isVisualLoading, 
          style: { borderRadius: 10, overflow: "hidden" }, 
        }}
      >
        {!isEditing ? (
          <VisualSettingOverview Data={Data} />
        ) : (
          <Formik<VisualSettingFormValues> enableReinitialize initialValues={initialValues} validationSchema={VisualSettingSchema} onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (
              <Form className="space-y-8">
                
                <CommonFormSection title="Core Branding" row={{ gutter: [24, 24] }}>
                  <CommonFormImageBox name="favicon" label="Store Favicon (32x32)" type="image" col={{ span: 24 }} />
                  <CommonValidationTextField name="customCSS" label="Custom CSS Styles" placeholder=".my-button { color: red; }" multiline col={{ span: 24 }} />
                  <CommonValidationTextField name="customJS" label="Custom JavaScript (Scripts)" placeholder="console.log('hello');" multiline col={{ span: 24 }} />
                </CommonFormSection>

                <CommonFormSection title="Storefront Protection" row={{ gutter: [16, 16] }}>
                  <div className="w-full px-2 mb-4">
                    <div className="flex items-center gap-2" onClick={() => setFieldValue('passwordProtection.enabled', !values.passwordProtection?.enabled)}>
                      <Checkbox checked={values.passwordProtection?.enabled} onChange={(e) => setFieldValue('passwordProtection.enabled', e.target.checked)} />
                      <span className="text-sm font-semibold text-slate-700 cursor-pointer">Enable Password Protection</span>
                    </div>
                  </div>
                  {values.passwordProtection?.enabled && (
                    <>
                      <CommonValidationTextField name="passwordProtection.password" label="Store Password" type="password" placeholder="Set a password" required col={{ xs: 24, md: 12 }} />
                      <CommonValidationTextField name="passwordProtection.message" label="Protection Message" placeholder="e.g. Opening soon!" col={{ xs: 24, md: 12 }} />
                    </>
                  )}
                </CommonFormSection>

                <CommonFormSection title="Checkout Page Customization" row={{ gutter: [24, 24] }}>
                  <CommonFormImageBox name="checkoutPage.logo" label="Checkout Logo" type="image" col={{ xs: 24, md: 12 }} />
                  <CommonFormImageBox name="checkoutPage.banner" label="Checkout Banner" type="image" col={{ xs: 24, md: 12 }} />
                  
                  <div className="w-full px-2 mt-4">
                    <p className="text-sm font-semibold text-slate-700 mb-3">Accent Color (Buttons & Highlights)</p>
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <ColorPicker 
                        value={values.checkoutPage?.accentColor} 
                        onChange={(color) => setFieldValue('checkoutPage.accentColor', color.toHexString())} 
                        showText 
                      />
                      <span className="text-xs text-slate-500">This color will be used for buttons and active states on your checkout page.</span>
                    </div>
                  </div>
                </CommonFormSection>

                <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                  <CommonButton title="Discard" variant="dashed" onClick={() => setIsEditing(false)} />
                  <CommonButton title="Save Customizations" type="primary" htmlType="submit" loading={isUpsertLoading} />
                </div>
              </Form>
            )}
          </Formik>
        )}
      </CommonCard>
    </div>
  );
};

export default VisualSettingsPage;
