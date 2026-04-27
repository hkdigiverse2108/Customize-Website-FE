"use client";

import { Queries } from "@/api";
import { Mutations } from "@/api/mutations";
import { CommonValidationSelect, CommonValidationSwitch, CommonValidationTextField } from "@/attribute";
import { CommonBottomActionBar, CommonCard, CommonFormSection } from "@/components/common";
import { PAGE_TITLE } from "@/constants";
import { PLAN_DURATION_OPTIONS, SUBSCRIPTION_TYPE_OPTIONS } from "@/data";
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
    themeIds: Data?.themeIds || [],
    themeConfig: Data?.themeConfig || {
      colors: "",
      fonts: "",
      spacing: "",
    },
    userId: Data?.userId || "",
    subdomain: Data?.subdomain || "",
    customDomain: Data?.customDomain || "",
    domainVerified: Data?.domainVerified ?? false,
    isActive: Data?.isActive ?? true,
    isPublished: Data?.isPublished ?? false,
    isBlocked: Data?.isBlocked ?? false,
    businessName: Data?.businessName || "",
    businessType: Data?.businessType || "",
    gstNumber: Data?.gstNumber || "",
    panNumber: Data?.panNumber || "",
    kycStatus: Data?.kycStatus || "",
    kycDocuments: Data?.kycDocuments || {
      type: "",
      documentUrl: "",
      verified: false,
    },
    address: Data?.address || {
      country: "",
      state: "",
      city: "",
      pincode: "",
      addressLine1: "",
      addressLine2: "",
      landmark: "",
    },
    email: Data?.email || "",
    phone: Data?.phone || "",
    totalProducts: Data?.totalProducts || 0,
    totalOrders: Data?.totalOrders || 0,
    totalRevenue: Data?.totalRevenue || 0,
    externalScripts: Data?.externalScripts || {
      name: "",
      src: "",
      position: "",
      isActive: false,
    },
    socialLinks: Data?.socialLinks || {
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
      linkedin: "",
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
      <div className="mb-6 rounded-lg border border-slate-200 bg-white/90 p-5 backdrop-blur">
        <div className="max-w-2xl text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">Admin plan editor</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{pageTitle}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">Define pricing, usage limits, feature access, and domain support in one structured admin form.</p>
        </div>
      </div>

      <CommonCard cardProps={{ title: "Plan Details", loading: isDataLoading, style: { borderRadius: 10, overflow: "hidden" } }}>
        <Formik<StoreFormValues> enableReinitialize initialValues={initialValues} validationSchema={StoreSchema} onSubmit={handleSubmit}>
          <Form className="space-y-5">
            <CommonFormSection title="Plan basics" description="Capture the core commercial details for this subscription tier.">
              <Row gutter={[20, 20]}>
                <CommonValidationSelect name="name" label="Plan Name" placeholder="Select plan name" options={SUBSCRIPTION_TYPE_OPTIONS} col={{ xs: 24, xl: 8 }} required />
                <CommonValidationSelect name="duration" label="Duration" placeholder="Select duration" options={PLAN_DURATION_OPTIONS} col={{ xs: 24, xl: 8 }} required />
                <CommonValidationTextField name="price" label="Price" placeholder="0.00" type="number" col={{ xs: 24, xl: 8 }} required startIcon={<span className="px-1 font-semibold text-slate-500">Rs.</span>} />
              </Row>
            </CommonFormSection>

            <CommonFormSection title="Usage limits" description="Set the quota values that control how much each customer can use.">
              <Row gutter={[20, 20]}>
                <CommonValidationTextField name="themeLimit" label="Theme Limit" placeholder="Enter theme limit" type="number" col={{ xs: 24, sm: 12, xl: 6 }} />
                <CommonValidationTextField name="productLimit" label="Product Limit" placeholder="Enter product limit" type="number" col={{ xs: 24, sm: 12, xl: 6 }} />
                <CommonValidationTextField name="blogLimit" label="Blog Limit" placeholder="Enter blog limit" type="number" col={{ xs: 24, sm: 12, xl: 6 }} />
                <CommonValidationTextField name="orderLimit" label="Order Limit" placeholder="Enter order limit" type="number" col={{ xs: 24, sm: 12, xl: 6 }} />
              </Row>
            </CommonFormSection>

            <CommonFormSection title="Plan features" description="Add every capability included in this plan. Press Enter after each feature.">
              <Row gutter={[20, 20]}>
                <CommonValidationSelect name="features" label="Features" placeholder="Type a feature and press Enter" options={[]} mode="tags" maxTagCount="responsive" col={{ xs: 24 }} />
              </Row>
            </CommonFormSection>

            <CommonFormSection title="Settings" description="Control visibility and platform access for the plan.">
              <Row gutter={[20, 20]}>
                <CommonValidationSwitch name="customDomainSupport" label="Custom Domain Support" col={{ xs: 24, md: 12 }} />
                {!isEditing && <CommonValidationSwitch name="isActive" label="Is Active" col={{ xs: 24, md: 12 }} />}
              </Row>
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
