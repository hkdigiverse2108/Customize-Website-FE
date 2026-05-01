"use client";

import { Queries, Mutations } from "@/api";
import { CommonButton, CommonValidationSelect, CommonValidationTextField } from "@/attribute";
import { CommonCard, CommonFormSection } from "@/components/common";
import { AUTH_METHOD, SETTING_FIELD_STATUS, VISIBILITY_STATUS } from "@/data";
import { CheckoutSettingFormValues } from "@/type";
import { CheckoutSettingSchema } from "@/utils";
import { Checkbox } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import CheckoutSettingOverview from "./CheckoutSettingOverview";

const CheckoutSettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { data: storeData } = Queries.useGetStore({});
  const activeStore = storeData?.data?.stores?.[0];
  const storeId = activeStore?._id;

  const { data: checkoutData, isLoading: isCheckoutLoading } = Queries.useGetCheckoutSetting(storeId);
  const Data = checkoutData?.data;

  const { mutate: upsertCheckout, isPending: isUpsertLoading } = Mutations.useUpsertCheckoutSetting();

  const initialValues: CheckoutSettingFormValues = {
    customerAccounts: Data?.customerAccounts || SETTING_FIELD_STATUS.OPTIONAL,
    contactMethod: Data?.contactMethod || AUTH_METHOD.EMAIL,
    allowGuestCheckout: Data?.allowGuestCheckout ?? true,
    requirePhoneNumber: Data?.requirePhoneNumber ?? false,
    companyNameField: Data?.companyNameField || VISIBILITY_STATUS.OPTIONAL,
    addressLine2Field: Data?.addressLine2Field || VISIBILITY_STATUS.OPTIONAL,
    orderProcessing: {
      useShippingAsBillingByDefault: Data?.orderProcessing?.useShippingAsBillingByDefault ?? true,
      enableAddressAutocompletion: Data?.orderProcessing?.enableAddressAutocompletion ?? false,
    },
    abandonedCart: {
      enabled: Data?.abandonedCart?.enabled ?? false,
      sendEmailAfterHours: Data?.abandonedCart?.sendEmailAfterHours || 10,
    },
  };

  const handleSubmit = (values: CheckoutSettingFormValues, { resetForm }: FormikHelpers<CheckoutSettingFormValues>) => {
    if (!storeId) return;

    upsertCheckout(
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
            <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">Checkout Settings</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{isEditing ? "Editing Checkout" : "Checkout Experience"}</h1>
            <p className="mt-0 text-sm leading-6 text-slate-500">Manage how customers interact with your store's checkout page.</p>
          </div>
        </div>
      </div>

      <CommonCard 
        cardProps={{ 
          title: (
            <div className="flex justify-between items-center w-full pe-2">
              <span>{isEditing ? "Editing Configuration" : "Checkout Configuration Overview"}</span>
              {!isEditing && (
                <CommonButton onClick={() => setIsEditing(true)} size="small">
                  <span className="flex items-center gap-1.5"><FiEdit2 size={12} /> Edit Settings</span>
                </CommonButton>
              )}
            </div>
          ), 
          loading: isCheckoutLoading, 
          style: { borderRadius: 10, overflow: "hidden" }, 
        }}
      >
        {!isEditing ? (
          <CheckoutSettingOverview Data={Data} />
        ) : (
          <Formik<CheckoutSettingFormValues> enableReinitialize initialValues={initialValues} validationSchema={CheckoutSettingSchema} onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (
              <Form className="space-y-6">
                
                <CommonFormSection title="Customer Contact Method" row={{ gutter: [16, 16] }}>
                  <CommonValidationSelect 
                    name="contactMethod" 
                    label="Select what contact method customers use to check out"
                    col={{ span: 24 }}
                    options={[
                      { label: "Email", value: AUTH_METHOD.EMAIL },
                      { label: "Phone number or email", value: AUTH_METHOD.PHONE_OR_EMAIL },
                    ]}
                  />
                  <div className="w-full px-2 mt-2">
                    <div className="flex items-center" onClick={() => setFieldValue('requirePhoneNumber', !values.requirePhoneNumber)}>
                      <Checkbox checked={values.requirePhoneNumber} onChange={(e) => setFieldValue('requirePhoneNumber', e.target.checked)} className="mr-2" />
                      <span className="text-sm text-slate-700 cursor-pointer">Require a phone number at checkout</span>
                    </div>
                  </div>
                </CommonFormSection>

                <CommonFormSection title="Customer Information" row={{ gutter: [16, 16] }}>
                  <CommonValidationSelect 
                    name="customerAccounts" 
                    label="Customer Accounts"
                    col={{ xs: 24, md: 12 }}
                    options={[
                      { label: "Accounts are disabled", value: SETTING_FIELD_STATUS.DISABLED },
                      { label: "Accounts are optional", value: SETTING_FIELD_STATUS.OPTIONAL },
                      { label: "Accounts are required", value: SETTING_FIELD_STATUS.REQUIRED },
                    ]}
                  />
                  <CommonValidationSelect 
                    name="companyNameField" 
                    label="Company Name"
                    col={{ xs: 24, md: 12 }}
                    options={[
                      { label: "Hidden", value: VISIBILITY_STATUS.HIDDEN },
                      { label: "Optional", value: VISIBILITY_STATUS.OPTIONAL },
                      { label: "Required", value: VISIBILITY_STATUS.REQUIRED },
                    ]}
                  />
                  <CommonValidationSelect 
                    name="addressLine2Field" 
                    label="Address Line 2 (Apartment, suite, etc.)"
                    col={{ xs: 24, md: 12 }}
                    options={[
                      { label: "Hidden", value: VISIBILITY_STATUS.HIDDEN },
                      { label: "Optional", value: VISIBILITY_STATUS.OPTIONAL },
                      { label: "Required", value: VISIBILITY_STATUS.REQUIRED },
                    ]}
                  />
                  <div className="w-full px-2 mt-2">
                    <div className="flex items-center" onClick={() => setFieldValue('allowGuestCheckout', !values.allowGuestCheckout)}>
                      <Checkbox checked={values.allowGuestCheckout} onChange={(e) => setFieldValue('allowGuestCheckout', e.target.checked)} className="mr-2" />
                      <span className="text-sm text-slate-700 cursor-pointer">Allow guest checkout</span>
                    </div>
                  </div>
                </CommonFormSection>

                <CommonFormSection title="Order Processing" row={{ gutter: [16, 16] }}>
                  <div className="w-full px-2 mb-2">
                    <div className="flex items-center" onClick={() => setFieldValue('orderProcessing.useShippingAsBillingByDefault', !values.orderProcessing?.useShippingAsBillingByDefault)}>
                      <Checkbox checked={values.orderProcessing?.useShippingAsBillingByDefault} onChange={(e) => setFieldValue('orderProcessing.useShippingAsBillingByDefault', e.target.checked)} className="mr-2" />
                      <span className="text-sm text-slate-700 cursor-pointer">Use the shipping address as the billing address by default</span>
                    </div>
                  </div>
                  <div className="w-full px-2">
                    <div className="flex items-center" onClick={() => setFieldValue('orderProcessing.enableAddressAutocompletion', !values.orderProcessing?.enableAddressAutocompletion)}>
                      <Checkbox checked={values.orderProcessing?.enableAddressAutocompletion} onChange={(e) => setFieldValue('orderProcessing.enableAddressAutocompletion', e.target.checked)} className="mr-2" />
                      <span className="text-sm text-slate-700 cursor-pointer">Enable address autocompletion</span>
                    </div>
                  </div>
                </CommonFormSection>

                <CommonFormSection title="Abandoned Cart Recovery" row={{ gutter: [16, 16] }}>
                  <div className="w-full px-2 mb-4">
                    <div className="flex items-center" onClick={() => setFieldValue('abandonedCart.enabled', !values.abandonedCart?.enabled)}>
                      <Checkbox checked={values.abandonedCart?.enabled} onChange={(e) => setFieldValue('abandonedCart.enabled', e.target.checked)} className="mr-2" />
                      <span className="text-sm text-slate-700 cursor-pointer">Automatically send abandoned checkout emails</span>
                    </div>
                  </div>
                  
                  {values.abandonedCart?.enabled && (
                    <CommonValidationTextField name="abandonedCart.sendEmailAfterHours" label="Send email after (hours)" type="number"placeholder="10" col={{ span: 12 }} />
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

export default CheckoutSettingsPage;
