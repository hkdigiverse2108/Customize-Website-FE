"use client";

import { Mutations } from "@/api";
import { CommonButton, CommonValidationTextField } from "@/attribute";
import { SignInWithGoogle } from "@/components/auth";
import { ROUTES, STORAGE_KEYS } from "@/constants";
import { LoginPayload } from "@/type";
import { Cookie, LoginSchema } from "@/utils";
import { Divider, Row } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const { mutate: login, isPending: isLoginLoading } = Mutations.useLogin();
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginPayload, { resetForm }: FormikHelpers<LoginPayload>) => {
    Cookie.removeAll();
    login(
      { ...values, email: values.email.toLowerCase() },
      {
        onSuccess: async () => {
          Cookie.set(STORAGE_KEYS.EMAIL_OTP, values.email, 1);
          router.push(ROUTES.AUTH.VERIFY_OTP);
          resetForm();
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-20 relative overflow-hidden">
      {/* Decorative Blur Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gray-500/30 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-500/30 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="w-full max-w-md relative">
        <div className="text-center mb-10 space-y-2">
          <Link href="/" className="text-3xl font-bold font-inter gradient-text tracking-tighter inline-block mb-4">
            CW
          </Link>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome Back</h2>
          <p className="text-gray-500 font-medium">Please enter your details to sign in.</p>
        </div>

        <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl border border-slate-100 dark:border-slate-800 p-10">
          <Formik<LoginPayload> initialValues={initialValues} validationSchema={LoginSchema} onSubmit={handleSubmit}>
            <Form className="space-y-6">
              <Row gutter={[16, 8]} className="mb-2">
                <CommonValidationTextField name="email" label="Email Address" placeholder="john@example.com" required col={{ span: 24 }} />
                <CommonValidationTextField name="password" type="password" showPasswordToggle label="Password" placeholder="••••••••" required col={{ span: 24 }} />
              </Row>
              <Link href={ROUTES.AUTH.FORGOT_PASSWORD} className="text-xs mb-4 float-right font-bold text-gray-600 hover:text-gray-900 decoration-gray-200">
                Forgot password?
              </Link>

              <CommonButton title="Sign In" block htmlType="submit" loading={isLoginLoading} />
            </Form>
          </Formik>
          <Divider plain>Or</Divider>
          <div className="grid grid-cols-1 my-3">
            <SignInWithGoogle type="signin" />
          </div>
          <div className="text-center text-gray-500 font-medium">
            Don't have an account?
            <Link href={ROUTES.AUTH.SIGNUP} className="text-gray-600 hover:text-gray-900 font-bold underline underline-offset-4 decoration-gray-200 ps-1">
              Sign up
            </Link>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
          By continuing, you agree to our{" "}
          <Link href="/" className="hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/" className="hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
