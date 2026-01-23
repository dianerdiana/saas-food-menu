import { appConfig } from "@/configs/app.config";

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat(appConfig.localCurrency, {
    style: "currency",
    currency: appConfig.currency,
    minimumFractionDigits: 0,
  }).format(value);
};
