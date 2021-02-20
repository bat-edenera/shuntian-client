import moment from "moment";

export function datetime(value, format = 'YYYY-MM-DD') {
  if (!value) return "";
  if (value === "至今") return value;
  if (value == "0001-01-01 00:00" || value == "0001-01-01") return "";
  return moment(value).format(format);
}
