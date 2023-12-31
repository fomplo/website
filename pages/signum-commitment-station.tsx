import { CommitmentStationPage } from "@/features/commitmentStation";
import { SEOMetaTags } from "@/lib/components/SEOMetaTags";

import Layout from "@/lib/components/Layout";

export default function Page() {
  return (
    <Layout>
      <SEOMetaTags
        title="Signum Commitment Station - Fomplo"
        description="Easily manage your Signa commitment and increment your effective capacity with this simple tool"
        keywords="signum commitment, how to commit signa, how to commit signum, signum mining, mine hard drives"
        imgUrl={"/assets/home/commitment.webp"}
      />

      <CommitmentStationPage />
    </Layout>
  );
}
