"use client";

import { Mutations } from "@/api";
import { CommonButton, CommonValidationTextField } from "@/attribute";
import { ROUTES, STORAGE_KEYS } from "@/constants";
import { ACCOUNT_TYPE } from "@/data";
import { useAppDispatch } from "@/store/hooks";
import { setSignin } from "@/store/slices/aAuthSlice";
import { VerifyOtpPayload } from "@/type";
import { Cookie, VerifyOtpSchema } from "@/utils";
import { Row } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const OTP_DURATION = 600;

const VerifyOtp = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedExpiry = Cookie.get(STORAGE_KEYS.OTP_EXPIRY_KEY);

    if (savedExpiry) {
      const expiryTime = parseInt(savedExpiry, 10);
      const now = Date.now();
      const remaining = Math.floor((expiryTime - now) / 1000);
      return remaining > 0 ? remaining : 0;
    } else {
      const newExpiry = Date.now() + OTP_DURATION * 1000;
      Cookie.set(STORAGE_KEYS.OTP_EXPIRY_KEY, newExpiry.toString(), 1);
      return OTP_DURATION;
    }
  });

  const email = Cookie.get(STORAGE_KEYS.EMAIL_OTP);
  const type = searchParams.get("type");

  const isForgotPassword = type === "forgot";

  const { mutate: verifyOtp, isPending: isVerifyOtpLoading } = Mutations.useVerifyOtp();
  const { mutate: resendOtp, isPending: isResendOtpLoading } = Mutations.useResendOtp();

  const initialValues: VerifyOtpPayload = {
    email: email ?? "",
    otp: "",
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async (values: VerifyOtpPayload, { resetForm }: FormikHelpers<VerifyOtpPayload>) => {
    verifyOtp(values, {
      onSuccess: async (res) => {
        if (isForgotPassword) {
          router.push(ROUTES.AUTH.RESET_PASSWORD);
        } else {
          dispatch(setSignin(res.data));
          router.push(res.data.user.role === ACCOUNT_TYPE.ADMIN ? ROUTES.ADMIN.DASHBOARD : ROUTES.STORE.DASHBOARD);
          Cookie.remove(STORAGE_KEYS.EMAIL_OTP);
        }
        resetForm();
        Cookie.remove(STORAGE_KEYS.OTP_EXPIRY_KEY);
      },
    });
  };

  const handleResendOtp = () => {
    resendOtp(
      {
        email: email || "",
      },
      {
        onSuccess: () => {
          const newExpiry = Date.now() + OTP_DURATION * 1000;
          Cookie.set(STORAGE_KEYS.OTP_EXPIRY_KEY, newExpiry.toString(), 1);
          setTimeLeft(OTP_DURATION);
        },
      },
    );
  };

  useEffect(() => {
    if (!email) {
      router.push(ROUTES.AUTH.LOGIN);
      // Cookie.removeAll();
    }
  }, [router, email]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50  px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10 border border-slate-100 ">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Verify OTP</h2>
          <p className="text-slate-500 font-medium text-sm">
            We've sent a 6-digit code to <span className="font-bold text-gray-700">{email}</span>.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className={`text-sm font-bold ${timeLeft < 60 ? "text-rose-500 animate-pulse" : "text-gray-600"}`}>OTP Expires in: {formatTime(timeLeft)}</span>
          </div>
        </div>

        <Formik<VerifyOtpPayload> initialValues={initialValues} validationSchema={VerifyOtpSchema} onSubmit={handleSubmit}>
          <Form className="space-y-5!">
            <Row gutter={[16, 8]}>
              <CommonValidationTextField name="otp" label="6-Digit OTP" placeholder="••••••" type="number" required col={{ span: 24 }} isOtp />
            </Row>
            <CommonButton title="Verify OTP" block htmlType="submit" loading={isVerifyOtpLoading} />
          </Form>
        </Formik>

        <div className="mt-8 text-center space-y-4">
          <div className="text-sm font-medium text-slate-500 mb-0">
            Didn't receive the code?
            <button onClick={handleResendOtp} disabled={isResendOtpLoading} className="text-gray-600 ps-1 font-bold hover:underline disabled:opacity-50">
              {isResendOtpLoading ? "Resending..." : "Resend OTP"}
            </button>
          </div>
          <div>
            <Link href={ROUTES.AUTH.LOGIN} onClick={() => Cookie.removeAll()} className="text-slate-400 text-xs font-bold hover:text-gray-600 transition-colors">
              Cancel and Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
