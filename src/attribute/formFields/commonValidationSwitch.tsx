import { CommonValidationSwitchProps } from "@/type";
import { Col, Switch } from "antd";
import { useField, useFormikContext } from "formik";
import { FC } from "react";

export const CommonValidationSwitch: FC<CommonValidationSwitchProps> = ({ name, label, disabled, required, syncFieldName, onChange, col, loading }) => {
  const [field, meta, helpers] = useField<boolean>({ name });
  const { setFieldValue } = useFormikContext();

  // ✅ Normalize value
  const checked = Boolean(field.value);

  const handleChange = (val: boolean) => {
    helpers.setValue(val);
    if (syncFieldName) setFieldValue(syncFieldName, val);
    onChange?.(val);
  };

  const SwitchComponent = (
    <div className="flex items-center justify-between px-3 py-2 rounded-lg border border-black/20 hover:border-brand-500 transition-all duration-200">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 capitalize cursor-pointer" htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Switch id={name} size="middle" checked={checked} onChange={handleChange} disabled={disabled} loading={loading} />
    </div>
  );

  const ComponentWithError = (
    <>
      {SwitchComponent}
      {meta.touched && meta.error && <div style={{ color: "red", fontSize: 12, marginTop: 4 }}>{meta.error}</div>}
    </>
  );

  return col ? <Col {...col}>{ComponentWithError}</Col> : ComponentWithError;
};
