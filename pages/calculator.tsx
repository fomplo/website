import { GetServerSideProps } from "next";
import { getCookie } from "cookies-next";
import { CalculatorPage } from "@/features/calculator";
import { CalculatorProps } from "@/features/calculator/types";
import { SEOMetaTags } from "@/lib/components/SEOMetaTags";
import { getAsString } from "@/lib/utils/functions";
import { currencies } from "@/lib/utils/currencies";

import Layout from "@/lib/components/Layout";

const calculator = ({ cryptoKey, sValueKey }: CalculatorProps) => {
  return (
    <Layout>
      {cryptoKey && sValueKey && (
        <SEOMetaTags
          // @ts-ignore
          title={`${currencies[cryptoKey]} Converter Calculator - Fomplo`}
          // @ts-ignore
          description={`Use the Fomplo ${currencies[cryptoKey]} Converter Calculator 😀 Convert amounts to or from different currencies with this simple converter calculator. It is easier to convert or calculate ${currencies[cryptoKey]}`}
          // @ts-ignore
          keywords={`${currencies[cryptoKey]} калькулятор, калькулятор ${currencies[cryptoKey]}, ${cryptoKey} to ${sValueKey}, ${currencies[cryptoKey]} to ${sValueKey} calculator, ${currencies[cryptoKey]} to ${sValueKey} converter, ${currencies[cryptoKey]} converter, ${currencies[cryptoKey]} calculator`}
          imgUrl={"/assets/home/crypto.webp"}
        />
      )}

      <CalculatorPage cryptoKey={cryptoKey} sValueKey={sValueKey} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  let cryptoKey = getCookie("crypto", { req, res }) || "BTC";
  let sValueKey = getCookie("svalue", { req, res }) || "USD";

  // Check if user wants to use different crypto from url
  // @ts-ignore
  if (query && query?.crypto && currencies[query?.crypto]) {
    cryptoKey = getAsString(query.crypto);
  }

  // Check if user has not selected currencies that exists in fomplo
  // @ts-ignore
  if (!currencies[cryptoKey] || !currencies[sValueKey]) {
    cryptoKey = "BTC";
    sValueKey = "USD";
  }

  return {
    props: { cryptoKey, sValueKey },
  };
};

export default calculator;
