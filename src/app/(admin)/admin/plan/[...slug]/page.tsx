"use client";

import { Queries } from "@/api";
import { Mutations } from "@/api/mutations";
import { CommonValidationSelect, CommonValidationSwitch, CommonValidationTextField } from "@/attribute";
import { CommonBottomActionBar, CommonCard, CommonFormSection } from "@/components/common";
import { PAGE_TITLE } from "@/constants";
import { PLAN_DURATION_OPTIONS, SUBSCRIPTION_TYPE_OPTIONS } from "@/data";
import { PlanFormValues } from "@/type";
import { GetChangedFields, PlanSchema, RemoveEmptyFields, useDynamicSlug } from "@/utils";
import { Row } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";

const AddEditPlanPage = () => {
  const router = useRouter();

  const { mutate: addData, isPending: isAddLoading } = Mutations.useAddPlan();
  const { mutate: editData, isPending: isEditLoading } = Mutations.useEditPlan();
  const { mode, id } = useDynamicSlug(["mode", "id"] as const);
  const isEditing = Boolean(id) && mode === "edit";
  const pageMode = isEditing ? "EDIT" : "ADD";

  const { data, isLoading: planLoading } = Queries.useGetPlanById(id, !!id);

  const planData = data?.data;
  const pageTitle = PAGE_TITLE.PLAN[pageMode];

  const initialValues: PlanFormValues = {
    name: planData?.name || "",
    price: planData?.price || 0,
    duration: planData?.duration || "",
    themeLimit: planData?.themeLimit || 0,
    productLimit: planData?.productLimit || 0,
    blogLimit: planData?.blogLimit || 0,
    orderLimit: planData?.orderLimit || 0,
    features: planData?.features || [],
    customDomainSupport: planData?.customDomainSupport ?? false,
    isActive: planData?.isActive ?? true,
  };

  const handleSubmit = (values: PlanFormValues, { resetForm }: FormikHelpers<PlanFormValues>) => {
    const cleanedPayload = RemoveEmptyFields(values);
    const changedFields = GetChangedFields(values, planData);
    const handleSuccess = () => {
      resetForm();
      router.back();
    };

    if (isEditing) editData({ id, ...changedFields }, { onSuccess: handleSuccess });
    else addData(cleanedPayload, { onSuccess: handleSuccess });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 lg:px-6">
      <div className="mb-6 rounded-lg border border-slate-200 bg-white/90 p-5 backdrop-blur">
        <div className="max-w-2xl text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.075em] text-brand-600">Admin plan editor</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{pageTitle}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Define pricing, usage limits, feature access, and domain support in one structured admin form.
          </p>
        </div>
      </div>

      <CommonCard cardProps={{ title: "Plan Details", loading: planLoading, style: { borderRadius: 10, overflow: "hidden" } }}>
        <Formik<PlanFormValues> enableReinitialize initialValues={initialValues} validationSchema={PlanSchema} onSubmit={handleSubmit}>
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
                <CommonValidationSwitch name="isActive" label="Is Active" col={{ xs: 24, md: 12 }} />
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

export default AddEditPlanPage;
