"use client";

import { Mutations } from "@/api";
import { CommonButton, CommonValidationTextField } from "@/attribute";
import { ROUTES, STORAGE_KEYS } from "@/constants";
import { ForgotPasswordPayload } from "@/type";
import { Cookie, ForgotPasswordSchema } from "@/utils";
import { Row } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
  const { mutate: forgotPassword, isPending: isForgotPasswordLoading } = Mutations.useForgotPassword();
  const router = useRouter();

  const initialValues = {
    email: "",
  };

  const handleSubmit = async (values: ForgotPasswordPayload, { resetForm }: FormikHelpers<ForgotPasswordPayload>) => {
    Cookie.removeAll();
    forgotPassword(
      { email: values.email.toLowerCase() },
      {
        onSuccess: async () => {
          Cookie.set(STORAGE_KEYS.EMAIL_OTP, values.email, 1);
          router.push(`${ROUTES.AUTH.VERIFY_OTP}?type=forgot`);
          resetForm();
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50  px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10 border border-gray-100 ">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900  mb-2">Forgot Password?</h2>
          <p className="text-gray-500 font-medium text-sm">Enter your email and we'll send you an OTP to reset your password.</p>
        </div>
        <Formik<ForgotPasswordPayload> initialValues={initialValues} validationSchema={ForgotPasswordSchema} onSubmit={handleSubmit}>
          <Form className="space-y-6">
            <Row gutter={[16, 8]}>
              <CommonValidationTextField name="email" label="Email Address" placeholder="john@example.com" required col={{ span: 24 }} />
            </Row>
            <CommonButton title="Send OTP" block htmlType="submit" loading={isForgotPasswordLoading} />
          </Form>
        </Formik>

        <div className="mt-8 text-center">
          <Link href={ROUTES.AUTH.LOGIN} className="text-gray-600 font-bold hover: underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
