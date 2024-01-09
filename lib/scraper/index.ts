import axios from "axios";
import * as cheerio from 'cheerio'
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
    const title = $('.title__xmedium').text().trim();
    console.log({title});
    
  } catch(e: any) {
    console.log(e);
  }
}
