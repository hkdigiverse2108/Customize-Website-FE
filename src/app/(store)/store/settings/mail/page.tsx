"use client";

import { Queries, Mutations } from "@/api";
import { CommonButton, CommonValidationSelect, CommonValidationTextField } from "@/attribute";
import { CommonCard, CommonFormSection } from "@/components/common";
import { EMAIL_PROVIDER } from "@/data";
import { MailSettingFormValues } from "@/type";
import { MailSettingSchema } from "@/utils";
import { Checkbox } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { FiEdit2, FiMail, FiServer } from "react-icons/fi";
import MailSettingOverview from "./MailSettingOverview";

const MailSettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { data: storeData } = Queries.useGetStore({});
  const activeStore = storeData?.data?.stores?.[0];
  const storeId = activeStore?._id;

  const { data: mailData, isLoading: isMailLoading } = Queries.useGetMailSetting(storeId);
  const Data = mailData?.data;

  const { mutate: upsertMail, isPending: isUpsertLoading } = Mutations.useUpsertMailSetting();

  const initialValues: MailSettingFormValues = {
    provider: Data?.provider || EMAIL_PROVIDER.SMTP,
    host: Data?.host || "",
    port: Data?.port || 465,
    secure: Data?.secure ?? true,
    auth: {
      user: Data?.auth?.user || "",
      pass: Data?.auth?.pass || "",
    },
    fromEmail: Data?.fromEmail || "",
    fromName: Data?.fromName || "",
  };

  const handleSubmit = (values: MailSettingFormValues, { resetForm }: FormikHelpers<MailSettingFormValues>) => {
    if (!storeId) return;

    upsertMail(
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
            <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">Mail Settings</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{isEditing ? "Configure Mail Server" : "Email Settings"}</h1>
            <p className="mt-0 text-sm leading-6 text-slate-500">Set up how your store sends transactional and marketing emails.</p>
          </div>
        </div>
      </div>

      <CommonCard 
        cardProps={{ 
          title: (
            <div className="flex justify-between items-center w-full pe-2">
              <span className="flex items-center gap-2">
                <FiMail size={18} className="text-slate-400" />
                {isEditing ? "Edit Mail Configuration" : "Email Server Overview"}
              </span>
              {!isEditing && (
                <CommonButton onClick={() => setIsEditing(true)} size="small">
                  <span className="flex items-center gap-1.5"><FiEdit2 size={12} /> Edit Configuration</span>
                </CommonButton>
              )}
            </div>
          ), 
          loading: isMailLoading, 
          style: { borderRadius: 10, overflow: "hidden" }, 
        }}
      >
        {!isEditing ? (
          <MailSettingOverview Data={Data} />
        ) : (
          <Formik<MailSettingFormValues> enableReinitialize initialValues={initialValues} validationSchema={MailSettingSchema} onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (
              <Form className="space-y-6">
                
                <CommonFormSection title="Sender Information" row={{ gutter: [16, 16] }}>
                  <CommonValidationTextField name="fromName" label="From Name" placeholder="e.g. My Store Team" required col={{ xs: 24, md: 12 }} />
                  <CommonValidationTextField name="fromEmail" label="From Email" placeholder="e.g. hello@mystore.com" required col={{ xs: 24, md: 12 }} />
                </CommonFormSection>

                <CommonFormSection title="Email Provider" row={{ gutter: [16, 16] }}>
                  <CommonValidationSelect 
                    name="provider" 
                    label="Choose Service Provider"
                    col={{ span: 24 }}
                    options={[
                      { label: "SMTP Server", value: EMAIL_PROVIDER.SMTP },
                      { label: "Gmail", value: EMAIL_PROVIDER.GMAIL },
                      { label: "Resend", value: EMAIL_PROVIDER.RESEND },
                      { label: "SendGrid", value: EMAIL_PROVIDER.SENDGRID },
                    ]}
                  />

                  {values.provider === EMAIL_PROVIDER.SMTP && (
                    <>
                      <CommonValidationTextField name="host" label="SMTP Host" placeholder="e.g. smtp.gmail.com" required col={{ xs: 24, md: 16 }} />
                      <CommonValidationTextField name="port" label="Port" type="number" placeholder="465" required col={{ xs: 24, md: 8 }} />
                      <div className="w-full px-2 mt-2 mb-4">
                        <div className="flex items-center" onClick={() => setFieldValue('secure', !values.secure)}>
                          <Checkbox checked={values.secure} onChange={(e) => setFieldValue('secure', e.target.checked)} className="mr-2" />
                          <span className="text-sm text-slate-700 cursor-pointer">Use SSL/TLS Security</span>
                        </div>
                      </div>
                    </>
                  )}

                  <CommonValidationTextField name="auth.user" label="Username / API Key" placeholder="Your email or API user" required col={{ xs: 24, md: 12 }} />
                  <CommonValidationTextField name="auth.pass" label="Password / Secret Key" type="password" placeholder="••••••••••••" required col={{ xs: 24, md: 12 }} />
                </CommonFormSection>

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

export default MailSettingsPage;
