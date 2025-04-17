import { createProxyMiddleware } from 'http-proxy-middleware';
import { NextApiRequest, NextApiResponse } from 'next';

const proxy = createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/api/auth': '/auth',
  },
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return proxy(req, res, (err) => {
    if (err) {
      res.status(500).json({ error: 'Proxy error' });
    }
  });
}
