import dayjs from "dayjs";

export const getCompanyDateFormat = () => {
  return "DD/MM/YYYY";
};

export const FormatDate = (dateInput: any | Date): string => {
  const format = getCompanyDateFormat();

  return dateInput && dayjs(dateInput).isValid() ? dayjs(dateInput).format(format) : "-";
};

export const FormatTime = (dateInput: any | Date): string => {
  return dayjs(dateInput).isValid() ? dayjs(dateInput).format("hh:mm A") : "";
};

export const FormatDateTime = (dateInput: any | Date): string => {
  const format = getCompanyDateFormat();

  return dayjs(dateInput).isValid() ? dayjs(dateInput).format(`${format} hh:mm A`) : "";
};

