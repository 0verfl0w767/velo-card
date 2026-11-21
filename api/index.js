import { handleApiRequest } from "../src/handler.js";

export default async function handler(req, res) {
  const url = new URL(req.url, "http://localhost");
  const result = await handleApiRequest(url, { noCache: Boolean(process.env.LOCAL_DEV) });
  for (const [k, v] of Object.entries(result.headers)) res.setHeader(k, v);
  res.statusCode = result.status;
  return res.end(result.body);
}
