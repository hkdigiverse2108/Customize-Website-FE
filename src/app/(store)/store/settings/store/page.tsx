"use client";

import { Queries } from "@/api";
import { Mutations } from "@/api/mutations";
import { CommonBottomActionBar, CommonCard, CommonFormSection } from "@/components/common";
import { PAGE_TITLE } from "@/constants";
import { StoreSettingFormValues } from "@/type";
import { StoreSettingSchema } from "@/utils";
import { Form, Formik, FormikHelpers } from "formik";
import dynamic from "next/dynamic";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { CommonButton } from "@/attribute";
import { StoreSettingOverview } from "./StoreSettingOverview";
const CommonFormImageBox = dynamic(() => import("@/attribute").then((mod) => mod.CommonFormImageBox), { ssr: false });
const CommonValidationTextField = dynamic(() => import("@/attribute").then((mod) => mod.CommonValidationTextField), { ssr: false });

const StoreSettingsPage = () => {
  const { data: storeData } = Queries.useGetStore({});
  const activeStore = storeData?.data?.stores?.[0];
  const storeId = activeStore?._id;
  const { data: settingData, isLoading: isStoreLoading } = Queries.useGetStoreSetting(storeId);
  const Data = settingData?.data;
  const { mutate: upsertData, isPending: isEditLoading } = Mutations.useUpsertStoreSetting();
  const [isEditing, setIsEditing] = useState(false);
  const pageTitle = Data ? `Edit ${PAGE_TITLE.STORE.SETTINGS.STORE}` : `Add ${PAGE_TITLE.STORE.SETTINGS.STORE}`;

  const initialValues: StoreSettingFormValues = {
    name: Data?.name || activeStore?.name || "",
    email: Data?.email || activeStore?.email || "",
    phone: Data?.phone || activeStore?.phone || "",
    logo: Data?.logo ? [Data.logo] : activeStore?.logo ? activeStore.logo : [],
    banner: Data?.banner ? [Data.banner] : activeStore?.banner ? activeStore.banner : [],
    favicon: Data?.favicon ? [Data.favicon] : [],
    address: {
      line1: Data?.address?.line1 || activeStore?.address?.addressLine1 || "",
      line2: Data?.address?.line2 || activeStore?.address?.addressLine2 || "",
      city: Data?.address?.city || activeStore?.address?.city || "",
      state: Data?.address?.state || activeStore?.address?.state || "",
      zipCode: Data?.address?.zipCode || activeStore?.address?.pincode || "",
      country: Data?.address?.country || activeStore?.address?.country || "",
    },
    socialLinks: {
      facebook: Data?.socialLinks?.facebook || activeStore?.socialLinks?.facebook || "",
      instagram: Data?.socialLinks?.instagram || activeStore?.socialLinks?.instagram || "",
      twitter: Data?.socialLinks?.twitter || activeStore?.socialLinks?.twitter || "",
      youtube: Data?.socialLinks?.youtube || activeStore?.socialLinks?.youtube || "",
      linkedin: Data?.socialLinks?.linkedin || activeStore?.socialLinks?.linkedin || "",
    },
  };

  const handleSubmit = (values: StoreSettingFormValues, { resetForm }: FormikHelpers<StoreSettingFormValues>) => {
    if (!storeId) return;
    const payload: any = { ...values, storeId };

    // Format images
    if (values.logo && values.logo.length > 0) payload.logo = values.logo[0];
    else payload.logo = "";

    if (values.banner && values.banner.length > 0) payload.banner = values.banner[0];
    else payload.banner = "";

    if (values.favicon && values.favicon.length > 0) payload.favicon = values.favicon[0];
    else payload.favicon = "";

    const handleSuccess = () => {
      resetForm({ values });
      setIsEditing(false); // Switch to View mode after saving
    };

    upsertData(payload, { onSuccess: handleSuccess });
  };



  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 rounded-lg border border-slate-100 bg-white/90 p-5 backdrop-blur">
        <div className="flex justify-between items-center">
          <div className="text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">Store Settings</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{isEditing ? pageTitle : "Store Settings"}</h1>
            <p className="mt-0 text-sm leading-6 text-slate-500">Manage your store details, business information, domain settings, and customer-facing content.</p>
          </div>
          {!isEditing && (<CommonButton onClick={() => setIsEditing(true)} size="middle"><span className="flex items-center gap-1.5"><FiEdit2 /> Edit Settings</span></CommonButton>)}
        </div>
      </div>
      <CommonCard cardProps={{ title: isEditing ? "Editing Store Settings" : "Store Settings Overview", loading: isStoreLoading, style: { borderRadius: 10, overflow: "hidden" }, }}>
        {!isEditing ? (
          <StoreSettingOverview Data={Data} activeStore={activeStore} />
        ) : (
          <Formik<StoreSettingFormValues> enableReinitialize initialValues={initialValues} validationSchema={StoreSettingSchema} onSubmit={handleSubmit}>
            <Form className="space-y-5">
              <CommonFormSection title="Basic Details" row={{ gutter: [10, 10] }}>
                <CommonValidationTextField name="name" label="Store Name" placeholder="Enter store name" col={{ xs: 24 }} required />
              </CommonFormSection>
              <CommonFormSection title="Contact" row={{ gutter: [10, 10] }}>
                <CommonValidationTextField name="email" label="Email" type="email" placeholder="Enter email" col={{ xs: 24, md: 12 }} />
                <CommonValidationTextField name="phone" label="Phone" placeholder="Enter phone" col={{ xs: 24, md: 12 }} />
              </CommonFormSection>
              <CommonFormSection title="Address" row={{ gutter: [10, 10] }}>
                <CommonValidationTextField name="address.country" label="Country" placeholder="Enter country" col={{ xs: 24, md: 6 }} />
                <CommonValidationTextField name="address.state" label="State" placeholder="Enter state" col={{ xs: 24, md: 6 }} />
                <CommonValidationTextField name="address.city" label="City" placeholder="Enter city" col={{ xs: 24, md: 6 }} />
                <CommonValidationTextField name="address.zipCode" label="Zip Code" placeholder="Enter zip code" col={{ xs: 24, md: 6 }} />
                <CommonValidationTextField name="address.line1" label="Address Line 1" placeholder="Enter address line 1" col={{ xs: 24 }} />
                <CommonValidationTextField name="address.line2" label="Address Line 2" placeholder="Enter address line 2" col={{ xs: 24 }} />
              </CommonFormSection>
              <CommonFormSection title="Social Links" row={{ gutter: [10, 10] }}>
                <CommonValidationTextField name="socialLinks.facebook" label="Facebook" placeholder="Enter facebook link" col={{ xs: 24, md: 6 }} />
                <CommonValidationTextField name="socialLinks.instagram" label="Instagram" placeholder="Enter instagram link" col={{ xs: 24, md: 6 }} />
                <CommonValidationTextField name="socialLinks.twitter" label="Twitter" placeholder="Enter twitter link" col={{ xs: 24, md: 6 }} />
                <CommonValidationTextField name="socialLinks.youtube" label="YouTube" placeholder="Enter youtube link" col={{ xs: 24, md: 6 }} />
                <CommonValidationTextField name="socialLinks.linkedin" label="LinkedIn" placeholder="Enter linkedin link" col={{ xs: 24, md: 6 }} />
              </CommonFormSection>
              <CommonFormSection title="Media" row={{ gutter: [5, 5] }}>
                <CommonFormImageBox name="logo" label="Logo" type="image" col={{ flex: "auto" }} />
                <CommonFormImageBox name="banner" label="Banner" type="image" col={{ flex: "auto" }} />
                <CommonFormImageBox name="favicon" label="Favicon" type="image" col={{ flex: "auto" }} />
              </CommonFormSection>

              <div className="p-4 flex justify-end gap-3">
                <CommonButton onClick={() => setIsEditing(false)} title="Cancel" variant="dashed" color="default" />
                <CommonBottomActionBar save isLoading={isEditLoading} />
              </div>
            </Form>
          </Formik>
        )}
      </CommonCard>
    </div>
  );
};

export default StoreSettingsPage;
