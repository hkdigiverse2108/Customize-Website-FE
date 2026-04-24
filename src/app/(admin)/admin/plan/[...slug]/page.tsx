"use client";

import { Queries } from "@/api";
import { Mutations } from "@/api/mutations";
import { CommonValidationSelect, CommonValidationSwitch, CommonValidationTextField } from "@/attribute";
import { CommonBottomActionBar, CommonCard } from "@/components/common";
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
    <div className="max-w-[83%] mx-auto">
      <CommonCard cardProps={{ title: PAGE_TITLE.PLAN[pageMode], loading: planLoading }}>
        <Formik<PlanFormValues> enableReinitialize initialValues={initialValues} validationSchema={PlanSchema} onSubmit={handleSubmit}>
          <Form className="space-y-6">
            <Row gutter={[24, 20]} className="mb-4">
              <CommonValidationSelect name="name" label="Plan Name" placeholder="Select Plan Name" options={SUBSCRIPTION_TYPE_OPTIONS} col={{ xs: 24, md: 12 }} required />
              <CommonValidationTextField name="price" label="Price" placeholder="0.00" type="number" col={{ xs: 24, md: 12 }} required startIcon={<span className="text-gray-500 font-medium px-1">₹</span>} />
              <CommonValidationSelect name="duration" label="Duration" placeholder="Select Duration" options={PLAN_DURATION_OPTIONS} col={{ xs: 24, md: 12 }} required />
              <CommonValidationTextField name="themeLimit" label="Theme Limit" placeholder="Enter Theme Limit" type="number" col={{ xs: 24, md: 12 }} />
              <CommonValidationTextField name="productLimit" label="Product Limit" placeholder="Enter Product Limit" type="number" col={{ xs: 24, md: 12 }} />
              <CommonValidationTextField name="blogLimit" label="Blog Limit" placeholder="Enter Blog Limit" type="number" col={{ xs: 24, md: 12 }} />
              <CommonValidationTextField name="orderLimit" label="Order Limit" placeholder="Enter Order Limit" type="number" col={{ xs: 24, md: 12 }} />
              <CommonValidationSelect name="features" label="Plan Features" placeholder="Type and press Enter to add features" options={[]} mode="tags" col={{ xs: 24, md: 12 }} />
              <CommonValidationSwitch name="customDomainSupport" label="Custom Domain Support" col={{ xs: 24, sm: 12 }} />
              <CommonValidationSwitch name="isActive" label="Is Active" col={{ xs: 24, sm: 12 }} />
            </Row>
            <CommonBottomActionBar save isLoading={isAddLoading || isEditLoading} />
          </Form>
        </Formik>
      </CommonCard>
    </div>
  );
};

export default AddEditPlanPage;
