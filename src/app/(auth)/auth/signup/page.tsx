"use client";

import { CommonButton, CommonValidationTextField } from "@/attribute";
import { CommonNotification } from "@/attribute/notification";
import { notification, Row } from "antd";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  //   const { login } = useAuth();
  const [api, contextHolder] = notification.useNotification();

  const handleSubmit = async () => {
    CommonNotification("success", "This is a success notification");
    // e.preventDefault();
    // setLoading(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-20 relative overflow-hidden">
      {/* Decorative Blur Background */}
      {contextHolder}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gray-500/30 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-500/30 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="w-full max-w-md relative">
        <div className="text-center mb-10 space-y-2">
          <Link href="/" className="text-3xl font-bold font-inter gradient-text tracking-tighter inline-block mb-4">
            CW
          </Link>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Create an Account</h2>
          <p className="text-gray-500 font-medium">Join thousands of businesses growing with us.</p>
        </div>

        <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl border border-slate-100 dark:border-slate-800 p-10">
          <Formik initialValues={{ firstName: "", password: "" }} onSubmit={handleSubmit}>
            <Form className="space-y-6">
              <Row gutter={[16, 8]}>
                <CommonValidationTextField name="firstName" label="First Name" placeholder="John" required col={{ span: 12 }} />
                <CommonValidationTextField name="lastName" label="Last Name" placeholder="Doe" required col={{ span: 12 }} />
                <CommonValidationTextField name="email" label="Email Address" placeholder="john@example.com" required col={{ span: 24 }} />
                <CommonValidationTextField name="password" type="password" showPasswordToggle label="Password" placeholder="••••••••" required col={{ span: 24 }} />
              </Row>
              <CommonButton title="Create Account" block htmlType="submit" />
            </Form>
          </Formik>
          <div className="mt-8 text-center text-gray-500 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-gray-600 hover:text-gray-900 font-bold underline underline-offset-4 decoration-gray-200">
              Log in
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

export default Signup;
