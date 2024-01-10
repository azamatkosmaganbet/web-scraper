import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractDescription, extractPrice } from "../utils";
export async function scrapeTechnodomProduct(url: string) {
  if (!url) return;

  //   curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_7c79b2d8-zone-unblocker:394cgyetwn1y -k https://lumtest.com/myip.json

  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);
    const title = $("h1.title__xmedium").text().trim();
    const currentPrice = extractPrice(
      $(".product__main-price-info div.product__price")
    );
    const originalPrice = extractPrice(
      $(".usual-price-block div.product__price-old")
    );
    const imageUrls: string[] = [];
    $(".product__gallery img.image-size-cls").each(function () {
      const src = $(this).attr("src");
      if (src) {
        imageUrls.push(src);
      }
    });

    const description = extractDescription($);
    const stars1 = $(
      "#add-comment div.product__reviews-block-overall-rating-wrapper div.product__reviews-block-overall-rating-value"
    )
      .text()
      .trim();
    const reviewsCount = $(".product__reviews-block-overall-rating-text")
      .text()
      .trim();
    // const currency = extractCurrency($('.a-price-symbol'))
    // const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");

    const data = {
      url,
      currency: "₸",
      image: imageUrls[0],
      title,
      description: description,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(originalPrice) - Number(currentPrice),
      category: "category",
      reviewsCount: reviewsCount,
      stars: Number(stars1),
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    };
    console.log(data);
    
    return data;
  } catch (e: any) {
    console.log(e);
  }
}

// const title = $("h1.Typography.Typography__XL.Typography__XL_Bold")
//       .text()
//       .trim();
//     const currentPrice = extractPrice(
//       $(
//         ".ProductActions_price__OBP_x p.Typography.ProductPrices_accented__pe2rG.Typography__Heading.Typography__Heading_H1"
//       )
//     );
//     const originalPrice = extractPrice(
//       $(
//         ".ProductActions_price__OBP_x p.Typography.ProductPrices_oldPrice__e7R8n.Typography__Body.Typography__Body_Strikethrough"
//       )
//     );
//     const images =
//       $(".Gallery_block__6ZTwh.ProductInfo_gallery__u8lKT img").attr("src") ||
//       $(".LazyImage__Source").attr("src") ||
//       "";
