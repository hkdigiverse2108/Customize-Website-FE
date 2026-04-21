import * as Yup from "yup";
import { Validation } from "./validation";
// import { Primitive } from "@/type";

// const RequiredWhenTrue = (dependentField: string, message: string, baseSchema: Yup.AnySchema) => {
//   return baseSchema.when(dependentField, {
//     is: true,
//     then: (schema) => schema.required(`${message} is required`),
//     otherwise: (schema) => schema.notRequired(),
//   });
// };

// const RequiredWhen = (dependentField: string, requiredValues: Primitive[], label: string, type: "string" | "number" | "array" = "string", options?: { extraRules?: (schema: Yup.AnySchema) => Yup.AnySchema }) => {
//   let schema: Yup.AnySchema;

//   // Base schema by type
//   if (type === "number") schema = Yup.number();
//   else if (type === "array") schema = Yup.array();
//   else schema = Yup.string();

//   // Apply extra rules if provided
//   if (options?.extraRules) schema = options.extraRules(schema);

//   return schema.test("required-when", `${label} is required`, (value, { from }) => {
//     const root = from?.[from.length - 1]?.value;
//     const dependentValue = root?.[dependentField];
//     const match = requiredValues.includes(dependentValue);

//     if (match) {
//       if (type === "array") return Array.isArray(value) && value.length > 0;
//       if (type === "number") return value !== undefined && value !== null;
//       return !!value;
//     }

//     return true;
//   });
// };

/* ========================== Reusable helpers ========================== */
export const PhoneValidation = (label = "Phone No", options?: { requiredCountryCode?: boolean; requiredNumber?: boolean }) =>
  Yup.object({
    countryCode: Validation("string", "Country code", {
      required: options?.requiredCountryCode ?? true,
    }),

    phoneNo: Validation("string", label, {
      required: options?.requiredNumber ?? true,
      extraRules: (s) => s.trim().matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    }),
  });

/* ========================== Auth ========================== */
export const SignupSchema = Yup.object({
  firstName: Validation("string", "First Name"),
  lastName: Validation("string", "Last Name"),
  email: Validation("string", "Email", { extraRules: (s) => s.email("Invalid email address") }),
  password: Validation("string", "Password", { extraRules: (s) => s.matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character") }),
});

export const LoginSchema = Yup.object({
  email: Validation("string", "Email", { extraRules: (s) => s.email("Invalid email address") }),
  password: Validation("string", "Password"),
});

export const VerifyOtpSchema = Yup.object({
  otp: Validation("string", "OTP", { extraRules: (s) => s.trim().length(6, "OTP must be 6 digits") }),
});

export const ForgotPasswordSchema = Yup.object({
  email: Validation("string", "Email", { extraRules: (s) => s.email("Invalid email address") }),
});

export const ResetPasswordSchema = Yup.object({
  password: Validation("string", "New Password", { extraRules: (s) => s.matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character") }),
  confirmPassword: Validation("string", "Confirm Password")
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
