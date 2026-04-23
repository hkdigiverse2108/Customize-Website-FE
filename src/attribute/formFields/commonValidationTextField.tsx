import { CommonValidationTextFieldProps } from "@/type";
import { CloseOutlined } from "@ant-design/icons";
import { Col, Form, Input } from "antd";
import { useField } from "formik";
import { FC, FocusEvent, useCallback } from "react";

export const CommonValidationTextField: FC<CommonValidationTextFieldProps> = ({ col, label, name, type = "text", placeholder, required, autoComplete = "off", clearable = false, startIcon, endIcon, showPasswordToggle = false, disabled, helperText, multiline, maxDigits, className, isOtp, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const handleClear = useCallback(() => {
    helpers.setValue("");
  }, [helpers]);

  const handleChange = (e: any) => {
    const value = e?.target?.value ?? e; // ✅ FIX
    helpers.setValue(value);
  };

  const prefix = startIcon ? <>{startIcon}</> : undefined;

  const suffix = (
    <>
      {clearable && field.value && <CloseOutlined onClick={handleClear} style={{ cursor: "pointer", marginRight: 8 }} />}

      {endIcon}
    </>
  );

  const commonProps = {
    ...field,
    ...props,
    type: type,
    placeholder,
    autoComplete,
    disabled,
    onChange: handleChange,
    onFocus: props.onFocus,
    onBlur: (e: FocusEvent<HTMLInputElement>) => {
      field.onBlur(e);
      props.onBlur?.(e);
    },
    suffix,
    ...(maxDigits && {
      count: {
        show: true,
        max: maxDigits,
        strategy: (txt: string) => txt.length,
        exceedFormatter: (txt: string, { max }: { max: number }) => txt.slice(0, max),
      },
    }),
  };

  const input = (
    <Form.Item required={required} validateStatus={meta.touched && meta.error ? "error" : ""} className={`custom-input ${className}`} help={meta.touched && meta.error ? meta.error : helperText}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {multiline ? (
        <Input.TextArea {...field} placeholder={placeholder} autoComplete={autoComplete} disabled={disabled} onChange={handleChange} /> //
      ) : showPasswordToggle ? (
        <Input.Password {...commonProps} prefix={prefix} />
      ) : isOtp ? (
        <Input.OTP {...commonProps} />
      ) : (
        <Input {...commonProps} prefix={prefix} />
      )}
    </Form.Item>
  );

  return col ? <Col {...col}>{input}</Col> : input;
};
