import Head from "next/head";
import { config } from "@/lib/contexts/AppContext";

export interface MetaTagsProps {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
  imgUrl?: string;
  viewport?: string;
}

export const SEOMetaTags = ({
  title,
  description,
  canonical,
  keywords,
  imgUrl,
  viewport,
}: MetaTagsProps) => {
  const canonicalImgUrl = config.CanonicalUrl + imgUrl;

  return (
    <Head>
      {title ? <title>{title}</title> : null}

      {canonical ? (
        <link rel="canonical" href={canonical} key="defaultCanonical" />
      ) : null}

      {description ? (
        <meta
          name="description"
          content={description}
          key="defaultDescription"
        />
      ) : null}

      {keywords ? (
        <meta name="keywords" content={keywords} key="defaultKeywords" />
      ) : null}

      {/* FACEBOOK META-TAGS */}
      <meta property="og:type" content="website" key="defaultWebsite" />
      <meta
        property="og:site_name"
        content="fomplo.com"
        key="defaultSiteName"
      />

      <meta property="og:title" key="defaultOgTitle" content={title} />

      {description ? (
        <meta
          property="og:description"
          key="defaultOgDescription"
          content={description}
        />
      ) : null}

      {canonicalImgUrl ? (
        <meta
          property="og:image"
          content={canonicalImgUrl}
          key="defaultOgImage"
        />
      ) : null}

      {canonical ? (
        <meta property="og:url" content={canonical} key="defaultOgCanonical" />
      ) : null}

      {/* TWITTER META-TAGS */}
      <meta
        name="twitter:card"
        content="summary_large_image"
        key="defaultTwitterCard"
      />

      <meta name="twitter:title" content={title} key="defaultTwitterTitle" />

      {description ? (
        <meta
          name="twitter:description"
          content={description}
          key="defaultTwitterDescription"
        />
      ) : null}

      {canonicalImgUrl ? (
        <meta
          property="twitter:image"
          content={canonicalImgUrl}
          key="defaultTwitterImage"
        />
      ) : null}

      {viewport ? <meta name="viewport" content={viewport} /> : null}

      {/* DEFAULT META-TAGS */}
      <meta name="author" content="" key="defaultAuthor" />
      <meta name="robots" content="all" key="defaultRobots" />
      <meta name="distribution" content="global" key="defaultDistribution" />

      {/* Website */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            alternateName: "Fomplo",
            url: "https://fomplo.com/",
          }),
        }}
      />
    </Head>
  );
};
