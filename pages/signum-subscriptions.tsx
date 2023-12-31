import { SignumSubscriptionsPage } from "@/features/signumSubscriptions";
import { SEOMetaTags } from "@/lib/components/SEOMetaTags";

import Layout from "@/lib/components/Layout";

export default function Page() {
  return (
    <Layout>
      <SEOMetaTags
        title="Signum Subscriptions - Fomplo"
        description="Manage your Crypto Automatic Payments with ease"
        keywords="signum subscriptions, crypto subscriptions, subscriptions, recurring payments, cryptocurrency recurring payments"
        imgUrl={"/assets/home/subscription-banner.webp"}
      />

      <SignumSubscriptionsPage />
    </Layout>
  );
}
