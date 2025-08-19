import type { NextApiRequest, NextApiResponse } from 'next';

const allowedOrigins = ['https://app.exemplo.com', 'http://localhost:3000'];
const expectedToken = process.env.NEXT_PUBLIC_CONFIG_ACCESS_TOKEN;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const rawOrigin = req.headers.origin || req.headers.referer || '';
    let origin = '';

    try {
        origin = new URL(rawOrigin).origin;
    } catch {
        origin = '';
    }
    const token = req.headers['x-config-token'];

    if (!allowedOrigins.includes(origin)) {
        return res.status(403).json({ error: 'Origem não autorizada' });
    }

    if (token !== expectedToken) {
        return res.status(401).json({ error: 'Token inválido' });
    }

    res.status(200).json({
        apiBaseUrl: process.env.API_BASE_URL,
        msClientId: process.env.MS_CLIENT_ID,
        featureFlags: process.env.FEATURE_FLAGS?.split(',') ?? [],
        OTEL_EXPORTER_OTLP_ENDPOINT: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || '',
    });
}
