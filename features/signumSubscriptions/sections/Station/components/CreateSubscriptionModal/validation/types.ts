export type CreateSubscription = {
  receiverAddress: string;
  cost: string;
  billingAmount: string;
  billingFormat: "day" | "week" | "month";
};
