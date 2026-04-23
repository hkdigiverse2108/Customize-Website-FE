import { CommonValidationSelectProps } from "@/type";
import { Col, Select } from "antd";
import { useField, useFormikContext } from "formik";
import { FC } from "react";

export const CommonValidationSelect: FC<CommonValidationSelectProps> = ({ name, label, required, options, mode, disabled, syncFieldName, placeholder, onChange, isLoading, col, searchKeys, ...rest }) => {
  const [field, meta, helpers] = useField({ name });
  const { setFieldValue } = useFormikContext();

  // ✅ Normalize value
  const value = mode === "multiple" || mode === "tags" ? (Array.isArray(field.value) ? field.value : []) : field.value || undefined;
  const filteredOptions = options.filter((opt) => (mode === "multiple" || mode === "tags" ? !value.includes(opt.value) : opt.value !== value));

  const handleChange = (val: any) => {
    if (mode === "multiple" || mode === "tags") {
      helpers.setValue(val || []);
      if (syncFieldName) setFieldValue(syncFieldName, val || []);
      onChange?.(val || []);
    } else {
      helpers.setValue(val || "");
      if (syncFieldName) setFieldValue(syncFieldName, val || "");
      onChange?.(val ? [val] : []);
    }
  };

  const SelectComponent = (
    <Select
      mode={mode}
      value={value}
      onChange={handleChange}
      onBlur={() => helpers.setTouched(true)}
      placeholder={placeholder}
      disabled={disabled}
      style={{ width: "100%" }}
      size="large"
      tokenSeparators={[","]}
      status={meta.touched && meta.error ? "error" : ""}
      allowClear
      showSearch={{
        filterOption: (input, option) => {
          if (!option) return false;

          return (searchKeys || ["label"]).some((key) =>
            String(option[key] ?? "")
              .toLowerCase()
              .includes(input.toLowerCase()),
          );
        },
      }}
      loading={isLoading}
      options={filteredOptions} // ✅ correct
      {...rest}
    />
  );

  const SelectComponentWithLabel = (
    <>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {SelectComponent}

      {meta.touched && meta.error && <div style={{ color: "red", fontSize: 12, marginTop: 4 }}>{meta.error}</div>}
    </>
  );

  return col ? <Col {...col}>{SelectComponentWithLabel}</Col> : SelectComponentWithLabel;
};
