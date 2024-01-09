"use server";

import { scrapeTechnodomProduct } from "../scraper";

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    const scrapedProduct = await scrapeTechnodomProduct(productUrl);
  } catch (e: any) {
    throw new Error("Failed to create/update product");
  }
}
