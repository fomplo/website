import { DonationsPage } from "@/features/donations";
import { SEOMetaTags } from "@/lib/components/SEOMetaTags";

import Layout from "@/lib/components/Layout";

export default function Page() {
  return (
    <Layout>
      <SEOMetaTags title="Donate - Fomplo" imgUrl={"/assets/poolMining.webp"} />

      <DonationsPage />
    </Layout>
  );
}
