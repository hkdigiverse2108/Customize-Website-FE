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
    <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-400/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="w-full max-w-md relative bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-10 border border-slate-100 dark:border-slate-800">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">New Password</h2>
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
          <Link href={ROUTES.AUTH.LOGIN} className="text-brand-600 font-bold hover:text-brand-700 hover:underline transition-colors">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
