"use client";

import { CommonButton, CommonValidationSelect, CommonValidationSwitch, CommonValidationTextField } from "@/attribute";
import { CommonCard } from "@/components/common";
import { PAGE_TITLE } from "@/constants";
import { PLAN_DURATION_OPTIONS, SUBSCRIPTION_TYPE_OPTIONS } from "@/data";
import { Row } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Mutations } from "@/api/mutations";
import { PlanFormValues } from "@/type";
import { PlanSchema, RemoveEmptyFields } from "@/utils";

const AddEditPlanPage = () => {
  const { mutate: addData, isPending: isAddLoading } = Mutations.useAddPlan();
  const { mutate: editData, isPending: isEditLoading } = Mutations.useEditPlan();

  const initialValues = {
    name: "",
    price: 0,
    duration: "",
    themeLimit: 0,
    productLimit: 0,
    blogLimit: 0,
    orderLimit: 0,
    features: [],
    customDomainSupport: false,
    isActive: true,
  };

  const handleSubmit = (values: PlanFormValues, { resetForm }: FormikHelpers<PlanFormValues>) => {
    const cleanedPayload = RemoveEmptyFields(values);
    addData(cleanedPayload, { onSuccess: () => resetForm() });
  };

  return (
    <div className="max-w-[83%] mx-auto">
      <CommonCard cardProps={{ title: PAGE_TITLE.PLAN.ADD }}>
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
            <div className="flex justify-end gap-4">
              <CommonButton title="Submit" htmlType="submit" loading={isAddLoading} className="px-8" />
            </div>
          </Form>
        </Formik>
      </CommonCard>
    </div>
  );
};

export default AddEditPlanPage;
