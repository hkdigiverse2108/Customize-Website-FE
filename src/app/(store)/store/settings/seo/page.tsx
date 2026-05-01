"use client";

import { Queries, Mutations } from "@/api";
import { CommonButton, CommonValidationTextField } from "@/attribute";
import { CommonCard, CommonFormSection } from "@/components/common";
import { SEOSettingFormValues } from "@/type";
import { SEOSettingSchema } from "@/utils";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { FiEdit2, FiSearch, FiPlus, FiX } from "react-icons/fi";
import SEOSettingOverview from "./SEOSettingOverview";
import { Tag, Input } from "antd";

const SEOSettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [keywordInput, setKeywordInput] = useState("");

  const { data: storeData } = Queries.useGetStore({});
  const activeStore = storeData?.data?.stores?.[0];
  const storeId = activeStore?._id;

  const { data: seoData, isLoading: isSeoLoading } = Queries.useGetSEOSetting(storeId);
  const Data = seoData?.data;

  const { mutate: upsertSeo, isPending: isUpsertLoading } = Mutations.useUpsertSEOSetting();

  const initialValues: SEOSettingFormValues = {
    metaTitle: Data?.metaTitle || "",
    metaDescription: Data?.metaDescription || "",
    metaKeywords: Data?.metaKeywords || [],
    googleAnalyticsId: Data?.googleAnalyticsId || "",
    facebookPixelId: Data?.facebookPixelId || "",
  };

  const handleSubmit = (values: SEOSettingFormValues, { resetForm }: FormikHelpers<SEOSettingFormValues>) => {
    if (!storeId) return;

    upsertSeo(
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
            <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">Growth & Visibility</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{isEditing ? "SEO Configuration" : "Search Engine Optimization"}</h1>
            <p className="mt-0 text-sm leading-6 text-slate-500">Boost your store's ranking and track visitor behavior with these settings.</p>
          </div>
        </div>
      </div>

      <CommonCard 
        cardProps={{ 
          title: (
            <div className="flex justify-between items-center w-full pe-2">
              <span className="flex items-center gap-2">
                <FiSearch size={18} className="text-slate-400" />
                {isEditing ? "Modify Metadata & Tracking" : "Current Visibility Settings"}
              </span>
              {!isEditing && (
                <CommonButton onClick={() => setIsEditing(true)} size="small">
                  <span className="flex items-center gap-1.5"><FiEdit2 size={12} /> Edit SEO</span>
                </CommonButton>
              )}
            </div>
          ), 
          loading: isSeoLoading, 
          style: { borderRadius: 10, overflow: "hidden" }, 
        }}
      >
        {!isEditing ? (
          <SEOSettingOverview Data={Data} />
        ) : (
          <Formik<SEOSettingFormValues> enableReinitialize initialValues={initialValues} validationSchema={SEOSettingSchema} onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (
              <Form className="space-y-6">
                
                <CommonFormSection title="Search Engine Metadata" row={{ gutter: [16, 16] }}>
                  <CommonValidationTextField name="metaTitle" label="Page Meta Title" placeholder="Your store's main title for Google" col={{ span: 24 }} />
                  <CommonValidationTextField name="metaDescription" label="Page Meta Description" placeholder="Short summary of your store" multiline col={{ span: 24 }} />
                  
                  <div className="w-full px-2 mt-2">
                    <p className="text-sm font-semibold text-slate-700 mb-2">Meta Keywords</p>
                    <div className="flex gap-2 mb-3">
                      <Input placeholder="Add a keyword" value={keywordInput} onChange={(e) => setKeywordInput(e.target.value)}onPressEnter={(e) => {  e.preventDefault();  if (keywordInput.trim() && !values.metaKeywords?.includes(keywordInput.trim())) {    setFieldValue('metaKeywords', [...(values.metaKeywords || []), keywordInput.trim()]);    setKeywordInput("");  }}}/>
                      <CommonButton 
                        type="primary" 
                        onClick={() => {
                          if (keywordInput.trim() && !values.metaKeywords?.includes(keywordInput.trim())) {
                            setFieldValue('metaKeywords', [...(values.metaKeywords || []), keywordInput.trim()]);
                            setKeywordInput("");
                          }
                        }}
                      >
                        <FiPlus />
                      </CommonButton>
                    </div>
                    <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100 min-h-[50px]">
                      {values.metaKeywords?.map((keyword, index) => (
                        <Tag 
                          key={index} 
                          closable 
                          onClose={() => setFieldValue('metaKeywords', values.metaKeywords?.filter((_, i) => i !== index))}
                          className="m-0 bg-white border-brand-200 text-brand-600 px-3 py-1 rounded-full flex items-center gap-1"
                        >
                          {keyword}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </CommonFormSection>

                <CommonFormSection title="Tracking & Analytics" row={{ gutter: [16, 16] }}>
                  <CommonValidationTextField name="googleAnalyticsId" label="Google Analytics Tracking ID" placeholder="e.g. G-B1C2D3E4F5" col={{ xs: 24, md: 12 }} />
                  <CommonValidationTextField name="facebookPixelId" label="Facebook Pixel ID" placeholder="e.g. 123456789012345" col={{ xs: 24, md: 12 }} />
                </CommonFormSection>

                <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                  <CommonButton title="Cancel" variant="dashed" onClick={() => setIsEditing(false)} />
                  <CommonButton title="Save SEO Settings" type="primary" htmlType="submit" loading={isUpsertLoading} />
                </div>
              </Form>
            )}
          </Formik>
        )}
      </CommonCard>
    </div>
  );
};

export default SEOSettingsPage;
