import * as Yup from "yup";
import type { FieldOptions, FieldSchemaArgs, FieldTypeMap, FieldType, RequiredWhenOptions } from "@/type";

export function Validation<K extends keyof FieldTypeMap>(...args: FieldSchemaArgs<K>): FieldTypeMap[K] {
  let type: K;
  let label: string;
  let options: FieldOptions<FieldTypeMap[K]> | undefined;

  if (typeof args[1] === "string") {
    [type, label, options] = args as [K, string, FieldOptions<FieldTypeMap[K]>?];
  } else {
    [type, options] = args as [K, FieldOptions<FieldTypeMap[K]>?];
    label = "Field";
  }

  const { required = true, extraRules, minItems } = options || {};
  let schema: FieldTypeMap[K];

  switch (type) {
    case "string":
      schema = Yup.string() as FieldTypeMap[K];
      // schema = required ? (schema.required(`${label} is required`) as FieldTypeMap[K]) : (schema.nullable().notRequired() as FieldTypeMap[K]);
      break;

    case "boolean":
      schema = Yup.boolean() as FieldTypeMap[K];
      // schema = required ? (schema.required(`${label} is required`) as FieldTypeMap[K]) : (schema.nullable().notRequired() as FieldTypeMap[K]);
      break;

    case "number":
      schema = Yup.number().typeError(`${label} must be a number`) as FieldTypeMap[K];
      // schema = required ? (schema.required(`${label} is required`) as FieldTypeMap[K]) : (schema.nullable().notRequired() as FieldTypeMap[K]);
      break;

    case "array":
      schema = Yup.array() as FieldTypeMap[K];
      if (minItems && minItems > 0) schema = (schema as Yup.ArraySchema<any[], Yup.AnyObject>).min(minItems, `${label} is required`) as FieldTypeMap[K];
      // schema = required ? (schema.required(`${label} is required`) as FieldTypeMap[K]) : (schema.notRequired() as FieldTypeMap[K]);
      break;

    default:
      throw new Error(`Unsupported field type: ${type}`);
  }

  schema = required ? (schema.required(`${label} is required`) as FieldTypeMap[K]) : (schema.notRequired() as FieldTypeMap[K]);

  return extraRules ? extraRules(schema) : schema;
}

const hasValue = (val: any): boolean => {
  if (typeof val === "string") return val.trim() !== "";
  if (Array.isArray(val)) return val.length > 0;
  return val !== undefined && val !== null;
};

export const RequiredWhen = <T extends Yup.AnySchema = Yup.AnySchema>(dependentField: string, expectedValues: any[] = [], label: string, type: FieldType = "string", options: RequiredWhenOptions<T> = {}): Yup.AnySchema => {
  let schema: Yup.AnySchema;

  switch (type) {
    case "string":
      schema = Yup.string();
      break;
    case "number":
      schema = Yup.number();
      break;
    case "boolean":
      schema = Yup.boolean();
      break;
    case "array":
      schema = Yup.array();
      break;
    default:
      schema = Yup.mixed();
  }

  if (options.extraRules) {
    schema = options.extraRules(schema as T);
  }

  return schema.when(dependentField, {
    is: (value: any) => {
      if (expectedValues.length === 0) {
        return hasValue(value);
      }
      return expectedValues.includes(value);
    },
    then: (s: Yup.AnySchema) => s.required(`${label} is required`),
    otherwise: (s: Yup.AnySchema) => s.notRequired(),
  });
};