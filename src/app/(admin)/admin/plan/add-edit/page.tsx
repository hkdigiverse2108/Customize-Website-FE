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
    <CommonCard cardProps={{ title: PAGE_TITLE.PLAN.BASE }}>
      <Formik<PlanFormValues> enableReinitialize initialValues={initialValues} validationSchema={PlanSchema} onSubmit={handleSubmit}>
        <Form className="space-y-6">
          <Row gutter={[16, 16]} className="mb-2">
            <CommonValidationSelect name="name" label="name" placeholder="Select Plan Name" options={SUBSCRIPTION_TYPE_OPTIONS} col={{ xs: 24, sm: 12 }} required />
            <CommonValidationTextField name="price" label="price" placeholder="Enter Price" type="number" col={{ xs: 24, sm: 12 }} required />
            <CommonValidationSelect name="duration" label="duration" placeholder="Select Duration" options={PLAN_DURATION_OPTIONS} col={{ xs: 24, sm: 12 }} required />
            <CommonValidationTextField name="themeLimit" label="theme Limit" placeholder="Enter Theme Limit" type="number" col={{ xs: 24, sm: 12 }} />
            <CommonValidationTextField name="productLimit" label="product Limit" placeholder="Enter Product Limit" type="number" col={{ xs: 24, sm: 12 }} />
            <CommonValidationTextField name="blogLimit" label="blog Limit" placeholder="Enter Blog Limit" type="number" col={{ xs: 24, sm: 12 }} />
            <CommonValidationTextField name="orderLimit" label="order Limit" placeholder="Enter Order Limit" type="number" col={{ xs: 24, sm: 12 }} />
            <CommonValidationSelect name="features" label="features" placeholder="Select Features" options={[]} mode="tags" col={{ xs: 24, sm: 12 }} />
            <CommonValidationSwitch name="customDomainSupport" label="custom Domain Support" col={{ xs: 24 }} />
            <CommonValidationSwitch name="isActive" label="isActive" col={{ xs: 24 }} />
          </Row>
          <CommonButton title="Submit" htmlType="submit" loading={isAddLoading} />
        </Form>
      </Formik>
    </CommonCard>
  );
};

export default AddEditPlanPage;
