"use client";

import { Queries, Mutations } from "@/api";
import { CommonButton, CommonValidationTextField } from "@/attribute";
import { CommonCard, CommonFormSection } from "@/components/common";
import { PaymentSettingFormValues } from "@/type";
import { PaymentSettingSchema } from "@/utils";
import { Checkbox } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { SiPhonepe, SiRazorpay } from "react-icons/si";
import PaymentSettingOverview from "./PaymentSettingOverview";

const PaymentSettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { data: storeData } = Queries.useGetStore({});
  const activeStore = storeData?.data?.stores?.[0];
  const storeId = activeStore?._id;

  const { data: paymentData, isLoading: isPaymentLoading } = Queries.useGetPaymentSetting(storeId);
  const Data = paymentData?.data;

  const { mutate: upsertPayment, isPending: isUpsertLoading } = Mutations.useUpsertPaymentSetting();

  const initialValues: PaymentSettingFormValues = {
    isGlobal: Data?.isGlobal ?? false,
    isRazorpay: Data?.isRazorpay ?? false,
    razorpayApiKey: Data?.razorpayApiKey ?? "",
    razorpayApiSecret: Data?.razorpayApiSecret ?? "",
    isPhonePe: Data?.isPhonePe ?? false,
    phonePeApiKey: Data?.phonePeApiKey ?? "",
    phonePeApiSecret: Data?.phonePeApiSecret ?? "",
    phonePeVersion: Data?.phonePeVersion ?? "",
    paymentMethods: Data?.paymentMethods ?? [],
  };

  const handleSubmit = (values: PaymentSettingFormValues, { resetForm }: FormikHelpers<PaymentSettingFormValues>) => {
    if (!storeId) return;

    upsertPayment(
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
            <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">Payment Settings</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{isEditing ? "Editing Payment Methods" : "Payment Methods"}</h1>
            <p className="mt-0 text-sm leading-6 text-slate-500">Configure your payment gateways to start accepting payments from customers.</p>
          </div>
        </div>
      </div>

      <CommonCard 
        cardProps={{ 
          title: (
            <div className="flex justify-between items-center w-full pe-2">
              <span>{isEditing ? "Editing Configuration" : "Payment Configuration Overview"}</span>
              {!isEditing && (
                <CommonButton onClick={() => setIsEditing(true)} size="small">
                  <span className="flex items-center gap-1.5"><FiEdit2 size={12} /> Edit Settings</span>
                </CommonButton>
              )}
            </div>
          ), 
          loading: isPaymentLoading, 
          style: { borderRadius: 10, overflow: "hidden" }, 
        }}
      >
        {!isEditing ? (
          <PaymentSettingOverview Data={Data} />
        ) : (
          <Formik<PaymentSettingFormValues> enableReinitialize initialValues={initialValues} validationSchema={PaymentSettingSchema} onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (
              <Form className="space-y-6">
                
                {/* Razorpay Configuration */}
                <CommonFormSection 
                  title="Razorpay Configuration" 
                  row={{ gutter: [16, 16] }}
                >
                  <div className="w-full px-2 mb-4">
                    <div className="flex items-center border border-slate-200 rounded-lg p-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => setFieldValue('isRazorpay', !values.isRazorpay)}>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-slate-900">Enable Razorpay</h4>
                        <p className="text-xs text-slate-500 mt-1">Allow customers to check out using Razorpay.</p>
                      </div>
                      <Checkbox checked={values.isRazorpay} onChange={(e) => setFieldValue('isRazorpay', e.target.checked)} />
                    </div>
                  </div>

                  {values.isRazorpay && (
                    <>
                      <CommonValidationTextField name="razorpayApiKey" label="API Key" placeholder="Enter Razorpay API Key" col={{ xs: 24, md: 12 }} />
                      <CommonValidationTextField name="razorpayApiSecret" label="API Secret" placeholder="Enter Razorpay API Secret" type="password" showPasswordToggle col={{ xs: 24, md: 12 }} />
                    </>
                  )}
                </CommonFormSection>

                {/* PhonePe Configuration */}
                <CommonFormSection 
                  title="PhonePe Configuration" 
                  row={{ gutter: [16, 16] }}
                >
                  <div className="w-full px-2 mb-4">
                    <div className="flex items-center border border-slate-200 rounded-lg p-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => setFieldValue('isPhonePe', !values.isPhonePe)}>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-slate-900">Enable PhonePe</h4>
                        <p className="text-xs text-slate-500 mt-1">Allow customers to check out using PhonePe.</p>
                      </div>
                      <Checkbox checked={values.isPhonePe} onChange={(e) => setFieldValue('isPhonePe', e.target.checked)} />
                    </div>
                  </div>

                  {values.isPhonePe && (
                    <>
                      <CommonValidationTextField name="phonePeApiKey" label="Merchant ID (API Key)" placeholder="Enter Merchant ID" col={{ xs: 24, md: 8 }} />
                      <CommonValidationTextField name="phonePeApiSecret" label="Salt Key (API Secret)" placeholder="Enter Salt Key" type="password" showPasswordToggle col={{ xs: 24, md: 8 }} />
                      <CommonValidationTextField name="phonePeVersion" label="Salt Index" placeholder="e.g. 1" col={{ xs: 24, md: 8 }} />
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

export default PaymentSettingsPage;
