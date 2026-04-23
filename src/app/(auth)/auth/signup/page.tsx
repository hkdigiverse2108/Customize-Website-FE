"use client";

import { Mutations } from "@/api";
import { CommonButton, CommonValidationTextField } from "@/attribute";
import { SignInWithGoogle } from "@/components/auth";
import { ROUTES } from "@/constants";
import { ACCOUNT_TYPE } from "@/data";
import { SignupPayload } from "@/type";
import { SignupSchema } from "@/utils";
import { Divider, Row } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";

const Signup = () => {
  const { mutate: signup, isPending: isSignupLoading } = Mutations.useSignup();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: ACCOUNT_TYPE.VENDOR,
  };

  const handleSubmit = async (values: SignupPayload, { resetForm }: FormikHelpers<SignupPayload>) => {
    signup(
      { ...values, email: values.email.toLowerCase() },
      {
        onSuccess: () => {
          resetForm();
        },
      },
    );
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-6 relative overflow-hidden">
      {/* Decorative Blur Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-400/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="w-full max-w-md relative">
        <div className="text-center mb-10 space-y-2">
          <Link href="/" className="inline-block mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg mx-auto">
              <span className="text-white font-bold text-xl">CW</span>
            </div>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 ">Create an Account</h2>
          <p className="text-gray-500 font-medium">Join thousands of businesses growing with us.</p>
        </div>

        <div className="bg-white shadow-2xl rounded-3xl border border-slate-100 p-10">
          <Formik<SignupPayload> initialValues={initialValues} validationSchema={SignupSchema} onSubmit={handleSubmit}>
            <Form className="space-y-6">
              <Row gutter={[16, 8]}>
                <CommonValidationTextField name="firstName" label="First Name" placeholder="John" required col={{ xs: 24, sm: 12 }} />
                <CommonValidationTextField name="lastName" label="Last Name" placeholder="Doe" required col={{ xs: 24, sm: 12 }} />
                <CommonValidationTextField name="email" label="Email Address" placeholder="john@example.com" required col={{ span: 24 }} />
                <CommonValidationTextField name="password" type="password" showPasswordToggle label="Password" placeholder="••••••••" required col={{ span: 24 }} />
              </Row>
              <CommonButton title="Create Account" block htmlType="submit" loading={isSignupLoading} />
            </Form>
          </Formik>
          <Divider plain>Or</Divider>
          <div className="grid grid-cols-1 my-3">
            <SignInWithGoogle type="signup" />
          </div>
          <div className="text-center text-gray-500 font-medium">
            Already have an account?{" "}
            <Link href={ROUTES.AUTH.LOGIN} className="text-brand-600 hover:text-brand-700 font-bold underline underline-offset-4 decoration-brand-200">
              Log in
            </Link>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
          By continuing, you agree to our
          <Link href="/" className="hover:underline">
            Terms of Service
          </Link>
          and
          <Link href="/" className="hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Signup;
