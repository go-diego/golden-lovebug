import { scrape } from "lib/scrape";

export default async function handler(req, res) {
  const { url } = req.query;
  const [error, response] = await scrape(url);

  if (error) {
    res.status(200).json({ error: error || "Error" });
  }
  res.status(200).json(response);
}
