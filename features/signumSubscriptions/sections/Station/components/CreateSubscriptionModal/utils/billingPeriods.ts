const amounts = Array.from(Array(32).keys());
amounts.shift();

export const billingAmounts = amounts;

export const billingPeriods = [
  { label: "Days", value: "day" },
  { label: "Weeks", value: "week" },
  { label: "Months", value: "month" },
];
