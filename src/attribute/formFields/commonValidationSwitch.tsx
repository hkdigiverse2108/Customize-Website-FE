import { CommonValidationSwitchProps } from "@/type";
import { Col, Switch } from "antd";
import { useField, useFormikContext } from "formik";
import { FC } from "react";

export const CommonValidationSwitch: FC<CommonValidationSwitchProps> = ({ name, label, disabled, required, syncFieldName, onChange, col }) => {
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
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Switch id={name} size="middle" checked={checked} onChange={handleChange} disabled={disabled} />

      {label && (
        <label className="block text-sm font-semibold text-gray-700 capitalize" htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
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
