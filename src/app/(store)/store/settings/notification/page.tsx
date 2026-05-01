"use client";

import { Queries, Mutations } from "@/api";
import { CommonButton, CommonValidationTextField } from "@/attribute";
import { CommonCard, CommonFormSection } from "@/components/common";
import { NotificationSettingFormValues } from "@/type";
import { NotificationSettingSchema } from "@/utils";
import { Checkbox, Divider } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { FiEdit2, FiMail, FiMessageSquare } from "react-icons/fi";
import NotificationSettingOverview from "./NotificationSettingOverview";

const NotificationSettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { data: storeData } = Queries.useGetStore({});
  const activeStore = storeData?.data?.stores?.[0];
  const storeId = activeStore?._id;

  const { data: notificationData, isLoading: isNotificationLoading } = Queries.useGetNotificationSetting(storeId);
  const Data = notificationData?.data;

  const { mutate: upsertNotification, isPending: isUpsertLoading } = Mutations.useUpsertNotificationSetting();

  const initialValues: NotificationSettingFormValues = {
    senderEmail: Data?.senderEmail || "",
    senderName: Data?.senderName || "",
    emailNotifications: {
      orderPlaced: Data?.emailNotifications?.orderPlaced ?? true,
      orderCancelled: Data?.emailNotifications?.orderCancelled ?? true,
      orderShipped: Data?.emailNotifications?.orderShipped ?? true,
      paymentSuccess: Data?.emailNotifications?.paymentSuccess ?? true,
      lowStockAlert: Data?.emailNotifications?.lowStockAlert ?? false,
    },
    smsNotifications: {
      orderPlaced: Data?.smsNotifications?.orderPlaced ?? true,
      orderCancelled: Data?.smsNotifications?.orderCancelled ?? true,
      orderShipped: Data?.smsNotifications?.orderShipped ?? true,
      paymentSuccess: Data?.smsNotifications?.paymentSuccess ?? true,
      lowStockAlert: Data?.smsNotifications?.lowStockAlert ?? false,
    },
  };

  const handleSubmit = (values: NotificationSettingFormValues, { resetForm }: FormikHelpers<NotificationSettingFormValues>) => {
    if (!storeId) return;

    upsertNotification(
      { ...values, storeId },
      {
        onSuccess: () => {
          setIsEditing(false);
          resetForm();
        },
      }
    );
  };

  const renderToggleField = (type: "emailNotifications" | "smsNotifications", field: string, label: string, setFieldValue: any, values: any) => (
    <div 
      className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer mb-2"
      onClick={() => setFieldValue(`${type}.${field}`, !values[type][field])}
    >
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <Checkbox checked={values[type][field]} onChange={(e) => setFieldValue(`${type}.${field}`, e.target.checked)} />
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 rounded-lg border border-slate-100 bg-white/90 p-5 backdrop-blur">
        <div className="flex justify-between items-center">
          <div className="text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">Notification Settings</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{isEditing ? "Customize Alerts" : "Notification Preferences"}</h1>
            <p className="mt-0 text-sm leading-6 text-slate-500">Configure how you and your customers get notified about orders and store activity.</p>
          </div>
        </div>
      </div>

      <CommonCard 
        cardProps={{ 
          title: (
            <div className="flex justify-between items-center w-full pe-2">
              <span>{isEditing ? "Edit Notification Rules" : "Overview of Active Notifications"}</span>
              {!isEditing && (
                <CommonButton onClick={() => setIsEditing(true)} size="small">
                  <span className="flex items-center gap-1.5"><FiEdit2 size={12} /> Edit Rules</span>
                </CommonButton>
              )}
            </div>
          ), 
          loading: isNotificationLoading, 
          style: { borderRadius: 10, overflow: "hidden" }, 
        }}
      >
        {!isEditing ? (
          <NotificationSettingOverview Data={Data} />
        ) : (
          <Formik<NotificationSettingFormValues> enableReinitialize initialValues={initialValues} validationSchema={NotificationSettingSchema} onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (
              <Form className="space-y-6">
                
                <CommonFormSection title="Sender Identity" row={{ gutter: [16, 16] }}>
                  <CommonValidationTextField name="senderName" label="Sender Display Name" placeholder="e.g. My Store" col={{ xs: 24, md: 12 }} />
                  <CommonValidationTextField name="senderEmail" label="Sender Email Address" placeholder="e.g. no-reply@mystore.com" col={{ xs: 24, md: 12 }} />
                </CommonFormSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <FiMail className="text-indigo-500" />
                      <h3 className="font-bold text-slate-800">Email Alerts</h3>
                    </div>
                    {renderToggleField("emailNotifications", "orderPlaced", "New Order Placed", setFieldValue, values)}
                    {renderToggleField("emailNotifications", "orderShipped", "Order Shipped", setFieldValue, values)}
                    {renderToggleField("emailNotifications", "orderCancelled", "Order Cancelled", setFieldValue, values)}
                    {renderToggleField("emailNotifications", "paymentSuccess", "Payment Success", setFieldValue, values)}
                    {renderToggleField("emailNotifications", "lowStockAlert", "Low Stock Alert", setFieldValue, values)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <FiMessageSquare className="text-emerald-500" />
                      <h3 className="font-bold text-slate-800">SMS Alerts</h3>
                    </div>
                    {renderToggleField("smsNotifications", "orderPlaced", "New Order Placed", setFieldValue, values)}
                    {renderToggleField("smsNotifications", "orderShipped", "Order Shipped", setFieldValue, values)}
                    {renderToggleField("smsNotifications", "orderCancelled", "Order Cancelled", setFieldValue, values)}
                    {renderToggleField("smsNotifications", "paymentSuccess", "Payment Success", setFieldValue, values)}
                    {renderToggleField("smsNotifications", "lowStockAlert", "Low Stock Alert", setFieldValue, values)}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                  <CommonButton title="Cancel" variant="dashed" onClick={() => setIsEditing(false)} />
                  <CommonButton title="Save Preferences" type="primary" htmlType="submit" loading={isUpsertLoading} />
                </div>
              </Form>
            )}
          </Formik>
        )}
      </CommonCard>
    </div>
  );
};

export default NotificationSettingsPage;
