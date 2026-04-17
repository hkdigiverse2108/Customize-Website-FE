"use client";

import { CommonValidationTextField } from "@/attribute";
import { Col, Row } from "antd";
import { Formik, Form } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import { CloseOutlined, UserOutlined } from "@ant-design/icons";

const Signup = () => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //   const { login } = useAuth();

  const handleSubmit = async () => {
    // e.preventDefault();
    setLoading(true);
    setError("");

    try {
      //   const response = await api.request<any>("REGISTER", { body: formData });
      //   if (response.status === 200) {
      // login(response.data);
      //   } else {
      //     setError(response.message || "Failed to register. Please try again.");
      //   }
    } catch (err) {
      setError("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Create an Account</h2>
          <p className="text-gray-500 font-medium">Join thousands of businesses growing with us.</p>
        </div>

        <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl border border-slate-100 dark:border-slate-800 p-10">
          <Formik initialValues={{ firstName: "", password: "" }} onSubmit={handleSubmit}>
            <Form className="space-y-6">
              <Row gutter={[16, 8]}>
                <CommonValidationTextField className="custom-input" name="firstName" label="First Name" placeholder="John" required col={{ span: 12 }} />
                <CommonValidationTextField className="custom-input" name="lastName" label="Last Name" placeholder="Doe" required col={{ span: 12 }} />
                <CommonValidationTextField className="custom-input" name="email" label="Email Address" placeholder="john@example.com" required col={{ span: 24 }} />
                <CommonValidationTextField className="custom-input" name="password" type="password" showPasswordToggle label="Password" placeholder="••••••••" required col={{ span: 24 }} />
              </Row>

              <button type="submit" disabled={loading} className="w-full py-5 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? "Creating account..." : "Create Account"}
              </button>
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
