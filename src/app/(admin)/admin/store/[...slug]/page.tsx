"use client";

import { Queries } from "@/api";
import { Mutations } from "@/api/mutations";
import { CommonFormImageBox, CommonValidationSelect, CommonValidationSwitch, CommonValidationTextField } from "@/attribute";
import { CommonBottomActionBar, CommonCard, CommonFormSection } from "@/components/common";
import { PAGE_TITLE } from "@/constants";
import { KYC_DOCUMENT_TYPE_OPTIONS, KYC_STATUS_OPTIONS, PLAN_DURATION_OPTIONS, SUBSCRIPTION_TYPE_OPTIONS } from "@/data";
import { StoreFormValues } from "@/type";
import { GetChangedFields, StoreSchema, RemoveEmptyFields, useDynamicSlug } from "@/utils";
import { Row } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";

const AddEditStorePage = () => {
  const router = useRouter();

  const { mutate: addData, isPending: isAddLoading } = Mutations.useAddStore();
  const { mutate: editData, isPending: isEditLoading } = Mutations.useEditStore();
  const { mode, id } = useDynamicSlug(["mode", "id"] as const);
  const isEditing = Boolean(id) && mode === "edit";
  const pageMode = isEditing ? "EDIT" : "ADD";

  const { data, isLoading: isDataLoading } = Queries.useGetStoreById(id, !!id);

  const Data = data?.data;
  const pageTitle = PAGE_TITLE.STORE[pageMode];

  const initialValues: StoreFormValues = {
    name: Data?.name || "",
    slug: Data?.slug || "",
    description: Data?.description || "",
    logo: Data?.logo || [],
    banner: Data?.banner || [],
    userId: Data?.userId || "",
    subdomain: Data?.subdomain || "",
    customDomain: Data?.customDomain || "",
    domainVerified: Data?.domainVerified ?? false,
    isActive: Data?.isActive ?? true,
    isPublished: Data?.isPublished ?? false,
    businessName: Data?.businessName || "",
    businessType: Data?.businessType || "",
    gstNumber: Data?.gstNumber || "",
    panNumber: Data?.panNumber || "",
    kycStatus: Data?.kycStatus || "",
    kycDocuments: {
      type: Data?.kycDocuments?.type || "",
      documentUrl: Data?.kycDocuments?.documentUrl || "",
      verified: Data?.kycDocuments?.verified ?? false,
    },
    address: {
      country: Data?.address?.country || "",
      state: Data?.address?.state || "",
      city: Data?.address?.city || "",
      pincode: Data?.address?.pincode || "",
      addressLine1: Data?.address?.addressLine1 || "",
      addressLine2: Data?.address?.addressLine2 || "",
      landmark: Data?.address?.landmark || "",
    },
    email: Data?.email || "",
    phone: Data?.phone || "",
    externalScripts: {
      name: Data?.externalScripts?.name || "",
      src: Data?.externalScripts?.src || "",
      position: Data?.externalScripts?.position || "",
      isActive: Data?.externalScripts?.isActive ?? false,
    },
    socialLinks: {
      facebook: Data?.socialLinks?.facebook || "",
      instagram: Data?.socialLinks?.instagram || "",
      twitter: Data?.socialLinks?.twitter || "",
      youtube: Data?.socialLinks?.youtube || "",
      linkedin: Data?.socialLinks?.linkedin || "",
    },
  };

  const handleSubmit = (values: StoreFormValues, { resetForm }: FormikHelpers<StoreFormValues>) => {
    const cleanedPayload = RemoveEmptyFields(values);
    const changedFields = GetChangedFields(values, Data);
    const handleSuccess = () => {
      resetForm();
      router.back();
    };

    if (isEditing) editData({ id, ...changedFields }, { onSuccess: handleSuccess });
    else addData(cleanedPayload, { onSuccess: handleSuccess });
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 rounded-lg border border-slate-100 bg-white/90 p-5 backdrop-blur">
        <div className="text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">Admin {PAGE_TITLE.STORE.BASE} editor</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{pageTitle}</h1>
          <p className="mt-0 text-sm leading-6 text-slate-500">Manage store details, business information, domain settings, and customer-facing content from a single structured admin interface.</p>{" "}
        </div>
      </div>
      <CommonCard cardProps={{ title: `${PAGE_TITLE.STORE.BASE} Details`, loading: isDataLoading, style: { borderRadius: 10, overflow: "hidden" } }}>
        <Formik<StoreFormValues> enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="space-y-5">
            <CommonFormSection title="Basic Details" row={{ gutter: [10, 10] }}>
              <CommonValidationTextField name="name" label="Store Name" placeholder="Enter store name" col={{ xs: 24, md: 12 }} required />
              <CommonValidationTextField name="slug" label="Slug" placeholder="Enter slug" col={{ xs: 24, md: 12 }} required />
              <CommonValidationTextField name="description" label="Description" placeholder="Enter description" col={{ xs: 24 }} multiline />
            </CommonFormSection>
            <CommonFormSection title="Contact" row={{ gutter: [10, 10] }}>
              <CommonValidationTextField name="email" label="Email" type="email" placeholder="Enter email" col={{ xs: 24, md: 12 }} required />
              <CommonValidationTextField name="phone" label="Phone" placeholder="Enter phone" col={{ xs: 24, md: 12 }} required />
            </CommonFormSection>
            <CommonFormSection title="Domain Settings" row={{ gutter: [10, 10], align: "bottom" }}>
              <CommonValidationTextField name="subdomain" label="Subdomain" placeholder="Enter subdomain" col={{ xs: 24, md: 8 }} required />
              <CommonValidationTextField name="customDomain" label="Custom Domain" placeholder="Enter custom domain" col={{ xs: 24, md: 8 }} />
              <CommonValidationSwitch name="domainVerified" label="Domain Verified" col={{ xs: 24, md: 8 }} />
            </CommonFormSection>
            <CommonFormSection title="Business Details" row={{ gutter: [10, 10] }}>
              <CommonValidationTextField name="businessName" label="Business Name" placeholder="Enter business name" col={{ xs: 24, md: 12 }} required />
              <CommonValidationTextField name="businessType" label="Business Type" placeholder="Enter business type" col={{ xs: 24, md: 12 }} required />
              <CommonValidationTextField name="gstNumber" label="GST Number" placeholder="Enter GST number" col={{ xs: 24, md: 12 }} />
              <CommonValidationTextField name="panNumber" label="PAN Number" placeholder="Enter PAN number" col={{ xs: 24, md: 12 }} />
            </CommonFormSection>
            <CommonFormSection title="KYC Details" row={{ gutter: [10, 10], align: "bottom" }}>
              <CommonValidationSelect name="kycStatus" label="KYC Status" placeholder="Enter KYC status" options={KYC_STATUS_OPTIONS} col={{ xs: 24, md: 8 }} />
              <CommonValidationSelect name="kycDocuments.type" label="Document Type" placeholder="Enter document type" options={KYC_DOCUMENT_TYPE_OPTIONS} col={{ xs: 24, md: 8 }} />
              <CommonValidationSwitch name="kycDocuments.verified" label="Verified" col={{ xs: 24, md: 8 }} />
              <CommonFormImageBox name="kycDocuments.documentUrl" label="Document URL" type="pdf" col={{ flex: "auto" }} />
            </CommonFormSection>
            <CommonFormSection title="Address" row={{ gutter: [10, 10] }}>
              <CommonValidationTextField name="address.country" label="Country" placeholder="Enter country" col={{ xs: 24, md: 6 }} />
              <CommonValidationTextField name="address.state" label="State" placeholder="Enter state" col={{ xs: 24, md: 6 }} />
              <CommonValidationTextField name="address.city" label="City" placeholder="Enter city" col={{ xs: 24, md: 6 }} />
              <CommonValidationTextField name="address.pincode" label="Pincode" placeholder="Enter pincode" col={{ xs: 24, md: 6 }} />
              <CommonValidationTextField name="address.addressLine1" label="Address Line 1" placeholder="Enter address line 1" col={{ xs: 24 }} />
              <CommonValidationTextField name="address.addressLine2" label="Address Line 2" placeholder="Enter address line 2" col={{ xs: 24 }} />
              <CommonValidationTextField name="address.landmark" label="Landmark" placeholder="Enter landmark" col={{ xs: 24 }} />
            </CommonFormSection>
            <CommonFormSection title="Social Links" row={{ gutter: [10, 10] }}>
              <CommonValidationTextField name="socialLinks.facebook" label="Facebook" placeholder="Enter facebook link" col={{ xs: 24, md: 6 }} />
              <CommonValidationTextField name="socialLinks.instagram" label="Instagram" placeholder="Enter instagram link" col={{ xs: 24, md: 6 }} />
              <CommonValidationTextField name="socialLinks.twitter" label="Twitter" placeholder="Enter twitter link" col={{ xs: 24, md: 6 }} />
              <CommonValidationTextField name="socialLinks.youtube" label="YouTube" placeholder="Enter youtube link" col={{ xs: 24, md: 6 }} />
              <CommonValidationTextField name="socialLinks.linkedin" label="LinkedIn" placeholder="Enter linkedin link" col={{ xs: 24, md: 6 }} />
            </CommonFormSection>
            <CommonFormSection title="Media" row={{ gutter: [5, 5] }}>
              <CommonFormImageBox name="logo" label="Logo" type="image" col={{ flex: "auto" }} multiple />
              <CommonFormImageBox name="banner" label="Banner" type="image" col={{ flex: "auto" }} multiple />
            </CommonFormSection>
            <CommonFormSection title="Settings" row={{ gutter: [10, 10] }}>
              <CommonValidationSwitch name="isActive" label="Is Active" col={{ xs: 24, md: 6 }} />
              <CommonValidationSwitch name="isPublished" label="Is Published" col={{ xs: 24, md: 6 }} />
            </CommonFormSection>

            <div className="p-4">
              <CommonBottomActionBar save isLoading={isAddLoading || isEditLoading} />
            </div>
          </Form>
        </Formik>
      </CommonCard>
    </div>
  );
};

export default AddEditStorePage;
