const isEmpty = (v: any) => v === "" || v === null || v === undefined;

export const RemoveEmptyFields = <T extends Record<string, any>>(obj: T): Partial<T> => {
  const result: Partial<T> = {};

  Object.entries(obj).forEach(([key, value]) => {
    // Skip empty primitive values
    if (isEmpty(value)) return;

    // ✅ Handle Array
    if (Array.isArray(value)) {
      const cleanedArray = value
        .map((item) => {
          if (typeof item === "object" && item !== null) {
            return RemoveEmptyFields(item);
          }
          return item;
        })
        .filter((item) => {
          if (typeof item === "object" && item !== null) {
            return Object.keys(item).length > 0;
          }
          return !isEmpty(item);
        });

      if (cleanedArray.length > 0) {
        result[key as keyof T] = cleanedArray as T[keyof T];
      }

      return;
    }

    // ✅ Handle Object
    if (typeof value === "object") {
      const cleaned = RemoveEmptyFields(value);
      if (Object.keys(cleaned).length > 0) {
        result[key as keyof T] = cleaned as T[keyof T];
      }
      return;
    }

    // ✅ Normal values
    result[key as keyof T] = value;
  });

  return result;
};

const isEqual = (a: any, b: any): boolean => JSON.stringify(a) === JSON.stringify(b);

const isObjectEmpty = (obj: any) => obj && typeof obj === "object" && !Array.isArray(obj) && Object.values(obj).every(isEmpty);

export const GetChangedFields = (newVal: Record<string, any>, oldVal: Record<string, any> = {}): Record<string, any> => {
  const changed: Record<string, any> = {};

  Object.keys(newVal).forEach((key) => {
    const newValue = newVal[key];
    const oldValue = oldVal[key];

    // both empty
    if (isEmpty(newValue) && isEmpty(oldValue)) return;

    // ARRAY
    if (Array.isArray(newValue)) {
      const cleanedArray = newValue.filter((item) => {
        // object item
        if (typeof item === "object" && item !== null) {
          return !isObjectEmpty(item);
        }

        // primitive item (string, number, boolean)
        return !isEmpty(item);
      });

      if (!isEqual(cleanedArray, oldValue || [])) {
        changed[key] = cleanedArray;
      }
      return;
    }

    // OBJECT
    if (typeof newValue === "object" && newValue !== null && !Array.isArray(newValue)) {
      const nestedChanged = GetChangedFields(newValue, oldValue ?? {});

      if (Object.keys(nestedChanged).length > 0) {
        changed[key] = newValue;
      }
      return;
    }

    // PRIMITIVE
    if (!isEqual(newValue, oldValue)) {
      changed[key] = newValue;
    }
  });

  return changed;
};

export const SanitizePayload = (input: any): any => {
  // 🛑 handle null / undefined
  if (input === null || input === undefined) {
    return input;
  }

  // 🟡 handle array
  if (Array.isArray(input)) {
    return input.map((item) => SanitizePayload(item));
  }

  // 🟢 handle object
  if (typeof input === "object") {
    return Object.entries(input || {}).reduce((acc: any, [key, value]) => {
      let newValue = value;

      // 🔥 "" → null
      if (newValue === "") {
        newValue = null;
      }

      // 🔁 recursion
      newValue = SanitizePayload(newValue);

      acc[key] = newValue;
      return acc;
    }, {});
  }

  // 🔹 primitive (string, number, boolean)
  return input;
};
