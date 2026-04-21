"use client";

import { Mutations } from "@/api";
import { CommonButton, CommonValidationTextField } from "@/attribute";
import { ROUTES, STORAGE_KEYS } from "@/constants";
import { ResetPasswordPayload } from "@/type";
import { Cookie, ResetPasswordSchema } from "@/utils";
import { Row } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ResetPassword = () => {
  const { mutate: resetPassword, isPending: isResetPasswordLoading } = Mutations.useResetPassword();
  const router = useRouter();
  const email = Cookie.get(STORAGE_KEYS.EMAIL_OTP);

  const initialValues: ResetPasswordPayload = {
    email: email || "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: ResetPasswordPayload, { resetForm }: FormikHelpers<ResetPasswordPayload>) => {
    const { confirmPassword, ...payload } = values;
    if (confirmPassword !== payload.password) {
      return;
    }
    resetPassword(payload, {
      onSuccess: async () => {
        router.push(ROUTES.AUTH.LOGIN);
        Cookie.removeAll();
        resetForm();
      },
    });
  };

  useEffect(() => {
    if (!email) {
      router.push(ROUTES.AUTH.LOGIN);
      Cookie.removeAll();
    }
  }, [router, email]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50  px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10 border border-gray-100 ">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900  mb-2">New Password</h2>
          <p className="text-gray-500 font-medium text-sm">Please enter a new strong password for your account.</p>
        </div>
        <Formik<ResetPasswordPayload> initialValues={initialValues} validationSchema={ResetPasswordSchema} onSubmit={handleSubmit}>
          <Form className="space-y-6">
            <Row gutter={[16, 8]}>
              <CommonValidationTextField name="password" type="password" showPasswordToggle label="New Password" placeholder="••••••••" required col={{ span: 24 }} />
              <CommonValidationTextField name="confirmPassword" type="password" showPasswordToggle label="Confirm Password" placeholder="••••••••" required col={{ span: 24 }} />
            </Row>
            <CommonButton title="Reset Password" block htmlType="submit" loading={isResetPasswordLoading} />
          </Form>
        </Formik>

        <div className="mt-6 text-center">
          <Link href={ROUTES.AUTH.LOGIN} className="text-gray-600 font-bold hover: underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
