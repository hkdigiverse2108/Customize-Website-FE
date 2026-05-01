"use client";

import { Queries, Mutations } from "@/api";
import { CommonButton, CommonValidationTextField } from "@/attribute";
import { CommonCard, CommonFormSection } from "@/components/common";
import { TaxSettingFormValues } from "@/type";
import { TaxSettingSchema } from "@/utils";
import { Checkbox } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { FiEdit2, FiPercent } from "react-icons/fi";
import TaxSettingOverview from "./TaxSettingOverview";

const TaxSettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { data: storeData } = Queries.useGetStore({});
  const activeStore = storeData?.data?.stores?.[0];
  const storeId = activeStore?._id;

  const { data: taxData, isLoading: isTaxLoading } = Queries.useGetTaxSetting(storeId);
  const Data = taxData?.data;

  const { mutate: upsertTax, isPending: isUpsertLoading } = Mutations.useUpsertTaxSetting();

  const initialValues: TaxSettingFormValues = {
    taxEnabled: Data?.taxEnabled ?? false,
    taxName: Data?.taxName ?? "GST",
    taxPercentage: Data?.taxPercentage ?? 0,
    isTaxIncluded: Data?.isTaxIncluded ?? false,
    gstNumber: Data?.gstNumber ?? "",
  };

  const handleSubmit = (values: TaxSettingFormValues, { resetForm }: FormikHelpers<TaxSettingFormValues>) => {
    if (!storeId) return;

    upsertTax(
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
            <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">Tax Settings</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{isEditing ? "Editing Tax Rules" : "Tax Rules"}</h1>
            <p className="mt-0 text-sm leading-6 text-slate-500">Configure how taxes are collected and displayed to your customers.</p>
          </div>
        </div>
      </div>

      <CommonCard 
        cardProps={{ 
          title: (
            <div className="flex justify-between items-center w-full pe-2">
              <span>{isEditing ? "Editing Configuration" : "Tax Configuration Overview"}</span>
              {!isEditing && (
                <CommonButton onClick={() => setIsEditing(true)} size="small">
                  <span className="flex items-center gap-1.5"><FiEdit2 size={12} /> Edit Settings</span>
                </CommonButton>
              )}
            </div>
          ), 
          loading: isTaxLoading, 
          style: { borderRadius: 10, overflow: "hidden" }, 
        }}
      >
        {!isEditing ? (<TaxSettingOverview Data={Data} />) : (<Formik<TaxSettingFormValues> enableReinitialize initialValues={initialValues} validationSchema={TaxSettingSchema} onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (
              <Form className="space-y-6">
                <CommonFormSection title="" row={{ gutter: [16, 16] }}>
                  <div className="w-full px-2 mb-4">
                    <div className="flex items-center border border-slate-200 rounded-lg p-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => setFieldValue('taxEnabled', !values.taxEnabled)}>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-slate-900">Enable Tax Collection</h4>
                        <p className="text-xs text-slate-500 mt-1">Automatically calculate and collect taxes on orders.</p>
                      </div>
                      <Checkbox checked={values.taxEnabled} onChange={(e) => setFieldValue('taxEnabled', e.target.checked)} />
                    </div>
                  </div>

                  {values.taxEnabled && (
                    <>
                      <CommonValidationTextField name="taxName" label="Tax Name" placeholder="e.g. GST, VAT, Sales Tax" required col={{ xs: 24, md: 12 }} />
                      <CommonValidationTextField name="taxPercentage" label="Tax Percentage (%)" type="number" placeholder="e.g. 18" required col={{ xs: 24, md: 12 }} />
                      
                      <div className="w-full px-2 mt-2 mb-4">
                        <div className="flex items-center border border-slate-200 rounded-lg p-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => setFieldValue('isTaxIncluded', !values.isTaxIncluded)}>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-slate-900">Prices Include Tax</h4>
                            <p className="text-xs text-slate-500 mt-1">If enabled, product prices are considered inclusive of tax. Otherwise, tax is added at checkout.</p>
                          </div>
                          <Checkbox checked={values.isTaxIncluded} onChange={(e) => setFieldValue('isTaxIncluded', e.target.checked)} />
                        </div>
                      </div>

                      <CommonValidationTextField name="gstNumber" label="GST / Tax ID Number (Optional)" placeholder="e.g. 22AAAAA0000A1Z5" col={{ span: 24 }} />
                    </>
                  )}
                </CommonFormSection>

                <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                  <CommonButton title="Cancel" variant="dashed" onClick={() => setIsEditing(false)} />
                  <CommonButton title="Save Changes" type="primary" htmlType="submit" loading={isUpsertLoading} />
                </div>
              </Form>
            )}
          </Formik>
        )}
      </CommonCard>
    </div>
  );
};

export default TaxSettingsPage;
