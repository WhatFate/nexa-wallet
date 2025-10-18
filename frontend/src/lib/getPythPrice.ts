import { PriceServiceConnection } from "@pythnetwork/price-service-client";

const connection = new PriceServiceConnection("https://hermes.pyth.network", {
  priceFeedRequestConfig: { binary: true },
});

const PRICE_IDS: Record<string, string> = {
  USDC: "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a",
  ETH: "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
  WETH: "0x9d4294bbcd1174d6f2003ec365831e64cc31d9f6f15a2b85399db8d5000960f6",
};

export async function getPythPrice(symbol: string): Promise<number | null> {
  const id = PRICE_IDS[symbol.toUpperCase()];
  if (!id) {
    console.warn(`Unknown token: ${symbol}`);
    return null;
  }

  try {
    const feeds = await connection.getLatestPriceFeeds([id]);
    if (!feeds || feeds.length === 0) return null;

    const feed = feeds[0];
    if (!feed) return null;

    const priceData = feed.getPriceNoOlderThan(60);
    if (!priceData) return null;

    return Number(priceData.price) * 10 ** priceData.expo;
  } catch (err) {
    console.error("Error fetching Pyth price:", err);
    return null;
  }
}

export async function getAllPythPrices(): Promise<Record<string, number>> {
  try {
    const feeds = await connection.getLatestPriceFeeds(
      Object.values(PRICE_IDS)
    );
    if (!feeds) return {};

    const symbols = Object.keys(PRICE_IDS);
    const result: Record<string, number> = {};

    feeds.forEach((feed, i) => {
      const priceData = feed?.getPriceNoOlderThan(60);
      if (priceData) {
        result[symbols[i]] = Number(priceData.price) * 10 ** priceData.expo;
      }
    });

    return result;
  } catch (err) {
    console.error("Error fetching all Pyth prices:", err);
    return {};
  }
}
