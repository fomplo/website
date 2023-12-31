import { Subscription } from "@signumjs/core";

export interface ComponentProps {
  loading: boolean;
  accountSubscriptions: Subscription[];
}
