import { createProxyMiddleware } from 'http-proxy-middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import LRU from 'lru-cache';

const cache = new LRU({
  max: 100,
  maxAge: 1000 * 60 * 5, // 5 minutes
});

const proxy = createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/api/buses': '/buses',
  },
  onProxyRes(proxyRes, req, res) {
    let body = '';
    proxyRes.on('data', (chunk) => {
      body += chunk;
    });
    proxyRes.on('end', () => {
      cache.set(req.url, body);
    });
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cachedResponse = cache.get(req.url);
  if (cachedResponse) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(cachedResponse);
    return;
  }

  return proxy(req, res, (err) => {
    if (err) {
      res.status(500).json({ error: 'Proxy error' });
    }
  });
}
