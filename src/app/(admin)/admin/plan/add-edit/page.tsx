"use client";

import { CommonButton, CommonValidationSelect, CommonValidationSwitch, CommonValidationTextField } from "@/attribute";
import { CommonCard } from "@/components/common";
import { PAGE_TITLE } from "@/constants";
import { PLAN_DURATION_OPTIONS, SUBSCRIPTION_TYPE_OPTIONS } from "@/data";
import { Row } from "antd";
import { Form, Formik } from "formik";

const AddEditPlanPage = () => {
  const initialValues = {};

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <CommonCard cardProps={{ title: PAGE_TITLE.PLAN.BASE }}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className="space-y-6">
          <Row gutter={[16, 16]} className="mb-2">
            <CommonValidationSelect name="name" label="name" options={SUBSCRIPTION_TYPE_OPTIONS} col={{ xs: 24, sm: 12 }} />
            <CommonValidationTextField name="price" type="number" label="price" required col={{ xs: 24, sm: 12 }} />
            <CommonValidationSelect name="duration" label="duration" options={PLAN_DURATION_OPTIONS} col={{ xs: 24, sm: 12 }} />
            <CommonValidationTextField name="themeLimit" type="number" label="theme Limit" required col={{ xs: 24, sm: 12 }} />
            <CommonValidationTextField name="productLimit" type="number" label="product Limit" required col={{ xs: 24, sm: 12 }} />
            <CommonValidationTextField name="blogLimit" type="number" label="blog Limit" required col={{ xs: 24, sm: 12 }} />
            <CommonValidationTextField name="orderLimit" type="number" label="order Limit" required col={{ xs: 24, sm: 12 }} />
            <CommonValidationSelect name="features" label="features" options={[]} mode="tags" col={{ xs: 24, sm: 12 }} />
            <CommonValidationSwitch name="customDomainSupport" label="custom Domain Support" col={{ xs: 24 }} />
            <CommonValidationSwitch name="isActive" label="isActive" col={{ xs: 24 }} />
          </Row>
          <CommonButton title="Submit" htmlType="submit" loading={false} />
        </Form>
      </Formik>
    </CommonCard>
  );
};

export default AddEditPlanPage;
