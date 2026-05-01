import { CommonValidationDatePickerProps } from "@/type";
import { Col, DatePicker, Form, TimePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { useField } from "formik";
import { FC, useCallback } from "react";

dayjs.extend(utc);

export const CommonValidationDatePicker: FC<CommonValidationDatePickerProps> = ({ col, label, name, required, disabled, helperText, className, pickerType = "date", dateProps, timeProps, rangePickerProps }) => {
  const [field, meta, helpers] = useField(name);

  const toUTC = (value: Dayjs | Dayjs[] | null) => {
    if (!value) return null;

    if (Array.isArray(value)) {
      return [value[0] ? value[0].utc().toISOString() : null, value[1] ? value[1].utc().toISOString() : null];
    }

    return value.utc().toISOString();
  };

  const fromUTC = (value: string | [string | null, string | null] | null, isRange = false): Dayjs | [Dayjs | null, Dayjs | null] | null => {
    if (!value) return null;

    if (isRange) {
      const range = value as [string | null, string | null];
      return [range[0] ? dayjs.utc(range[0]).local() : null, range[1] ? dayjs.utc(range[1]).local() : null];
    }

    return dayjs.utc(value as string).local();
  };

  const handleChange = useCallback(
    (value: any) => {
      helpers.setValue(toUTC(value));
    },
    [helpers],
  );
  const commonStyle = {
    width: "100%",
    borderRadius: "8px",
  };

  const renderPicker = () => {
    switch (pickerType) {
      case "range":
        return <DatePicker.RangePicker value={fromUTC(field.value, true) as [Dayjs | null, Dayjs | null] | null} onChange={handleChange} size="large" style={commonStyle} disabled={disabled} {...rangePickerProps} />;

      case "time":
        return <TimePicker value={fromUTC(field.value) as Dayjs | null} format="h:mm a" onChange={handleChange} size="large" style={commonStyle} disabled={disabled} {...timeProps} />;

      case "date-time":
        return <DatePicker value={fromUTC(field.value) as Dayjs | null} format="YYYY-MM-DD h:mm A" onChange={handleChange} size="large" style={commonStyle} disabled={disabled} {...dateProps} showTime />;

      default:
        return <DatePicker value={fromUTC(field.value) as Dayjs | null} format="YYYY-MM-DD" onChange={handleChange} size="large" style={commonStyle} disabled={disabled} {...dateProps} />;
    }
  };

  const input = (
    <Form.Item required={required} validateStatus={meta.touched && meta.error ? "error" : ""} help={meta.touched && meta.error ? meta.error : helperText} className={`custom-input ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {renderPicker()}
    </Form.Item>
  );

  return col ? <Col {...col}>{input}</Col> : input;
};
