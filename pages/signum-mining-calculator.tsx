import { MiningCalculatorPage } from "@/features/miningCalculator";
import { SEOMetaTags } from "@/lib/components/SEOMetaTags";

import Layout from "@/lib/components/Layout";

export default function Page() {
  return (
    <Layout>
      <SEOMetaTags
        title="Signum Mining Calculator - Fomplo"
        description="Check your potential profits with this simple calculator. Put your available space, your Signa to commit and your hardware budget. This simple tool will tell you your possible profits😀"
        keywords="signum mining profitability calculator, signum miner, signa mining calculator, signum mining rig, signum coin calculator, signum mining calculator, signa mining calculator, mining calculator signum, signum mining, signum mining calculator, SIGNA mining profits, Signa profits, signum mining, mine hard drives"
        imgUrl={"/assets/home/miner.webp"}
      />

      <MiningCalculatorPage />
    </Layout>
  );
}
