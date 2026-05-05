import * as Yup from "yup";
import type { FieldOptions, FieldSchemaArgs, FieldTypeMap, FieldType, RequiredWhenOptions, FieldConfig } from "@/type";

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

export const CreateConditionalSchema = (fields: FieldConfig[]) => {
  const shape: Record<string, any> = {};

  fields.forEach((f) => {
    let baseSchema = f.type === "array" ? Yup.array() : Yup.string();

    // 🔥 apply extra rules (regex etc.)
    if (f.extraRules) {
      baseSchema = f.extraRules(baseSchema);
    }

    // 🔥 apply required (independent)
    if (f.required) {
      baseSchema = baseSchema.required(`${f.label || f.name} is required`);
    }

    shape[f.name] = baseSchema;
  });

  return Yup.object()
    .shape(shape)
    .test("all-or-none", "", function (value) {
      if (!value) return true;

      const keys = fields.map((f) => f.name) as (keyof typeof value)[];

      const anyFilled = keys.some((k) => {
        const v = value[k];
        return Array.isArray(v) ? v.length > 0 : v !== "" && v !== null && v !== undefined;
      });

      if (!anyFilled) return true;

      for (const field of fields) {
        const k = field.name as keyof typeof value;
        const v = value[k];

        const isEmpty = Array.isArray(v) ? v.length === 0 : v === "" || v === null || v === undefined;

        // 🔥 Skip required:false fields if needed
        if (isEmpty) {
          return this.createError({
            path: `${this.path}.${String(k)}`,
            message: `${field.label || field.name} is required`,
          });
        }
      }

      return true;
    });
};
