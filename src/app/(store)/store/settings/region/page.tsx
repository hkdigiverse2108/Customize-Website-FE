"use client";

import { Queries, Mutations } from "@/api";
import { CommonButton, CommonValidationSelect, CommonValidationTextField } from "@/attribute";
import { CommonCard, CommonFormSection } from "@/components/common";
import { MEASUREMENT_SYSTEM } from "@/data";
import { RegionSettingFormValues } from "@/type";
import { RegionSettingSchema } from "@/utils";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { FiEdit2, FiGlobe } from "react-icons/fi";
import RegionSettingOverview from "./RegionSettingOverview";

const RegionSettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { data: storeData } = Queries.useGetStore({});
  const activeStore = storeData?.data?.stores?.[0];
  const storeId = activeStore?._id;

  const { data: regionData, isLoading: isRegionLoading } = Queries.useGetRegionSetting(storeId);
  const Data = regionData?.data;

  const { mutate: upsertRegion, isPending: isUpsertLoading } = Mutations.useUpsertRegionSetting();

  const initialValues: RegionSettingFormValues = {
    currency: Data?.currency || "INR",
    currencySymbol: Data?.currencySymbol || "₹",
    timezone: Data?.timezone || "Asia/Kolkata",
    unitSystem: Data?.unitSystem || MEASUREMENT_SYSTEM.METRIC,
    weightUnit: Data?.weightUnit || "kg",
    lengthUnit: Data?.lengthUnit || "cm",
  };

  const handleSubmit = (values: RegionSettingFormValues, { resetForm }: FormikHelpers<RegionSettingFormValues>) => {
    if (!storeId) return;

    upsertRegion(
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
            <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">Localization</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{isEditing ? "Modify Region Settings" : "Regional Standards"}</h1>
            <p className="mt-0 text-sm leading-6 text-slate-500">Configure your store's currency, units, and timezone for better customer reach.</p>
          </div>
        </div>
      </div>

      <CommonCard 
        cardProps={{ 
          title: (
            <div className="flex justify-between items-center w-full pe-2">
              <span className="flex items-center gap-2">
                <FiGlobe size={18} className="text-slate-400" />
                {isEditing ? "Edit Regional Formats" : "Current Store Localization"}
              </span>
              {!isEditing && (
                <CommonButton onClick={() => setIsEditing(true)} size="small">
                  <span className="flex items-center gap-1.5"><FiEdit2 size={12} /> Edit Region</span>
                </CommonButton>
              )}
            </div>
          ), 
          loading: isRegionLoading, 
          style: { borderRadius: 10, overflow: "hidden" }, 
        }}
      >
        {!isEditing ? (
          <RegionSettingOverview Data={Data} />
        ) : (
          <Formik<RegionSettingFormValues> enableReinitialize initialValues={initialValues} validationSchema={RegionSettingSchema} onSubmit={handleSubmit}>
            {() => (
              <Form className="space-y-6">
                
                <CommonFormSection title="Currency & Time" row={{ gutter: [16, 16] }}>
                  <CommonValidationTextField name="currency" label="Currency Code" placeholder="e.g. INR, USD" required col={{ xs: 24, md: 8 }} />
                  <CommonValidationTextField name="currencySymbol" label="Currency Symbol" placeholder="e.g. ₹, $" required col={{ xs: 24, md: 8 }} />
                  <CommonValidationTextField name="timezone" label="Store Timezone" placeholder="e.g. Asia/Kolkata" required col={{ xs: 24, md: 8 }} />
                </CommonFormSection>

                <CommonFormSection title="Measurements & Units" row={{ gutter: [16, 16] }}>
                  <CommonValidationSelect 
                    name="unitSystem" 
                    label="Unit System"
                    col={{ span: 24 }}
                    options={[
                      { label: "Metric System (kg, cm, etc.)", value: MEASUREMENT_SYSTEM.METRIC },
                      { label: "Imperial System (lb, in, etc.)", value: MEASUREMENT_SYSTEM.IMPERIAL },
                    ]}
                  />
                  <CommonValidationTextField name="weightUnit" label="Default Weight Unit" placeholder="e.g. kg, lb" required col={{ xs: 24, md: 12 }} />
                  <CommonValidationTextField name="lengthUnit" label="Default Length Unit" placeholder="e.g. cm, in" required col={{ xs: 24, md: 12 }} />
                </CommonFormSection>

                <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                  <CommonButton title="Cancel" variant="dashed" onClick={() => setIsEditing(false)} />
                  <CommonButton title="Save Regional Settings" type="primary" htmlType="submit" loading={isUpsertLoading} />
                </div>
              </Form>
            )}
          </Formik>
        )}
      </CommonCard>
    </div>
  );
};

export default RegionSettingsPage;
