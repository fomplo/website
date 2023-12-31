import { SignumRefPage } from "@/features/signumRef";
import { SEOMetaTags } from "@/lib/components/SEOMetaTags";

import Layout from "@/lib/components/Layout";

export default function Page() {
  return (
    <Layout>
      <SEOMetaTags
        title="Signum Ref - Fomplo"
        description="Discover interesting set of data for the Signum Chain 😇"
        keywords="signum node, signum node sync, signum snr, signum network, signum fees"
        imgUrl={"/assets/home/node.webp"}
      />

      <SignumRefPage />
    </Layout>
  );
}
