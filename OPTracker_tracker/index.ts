import { config } from './config.ts';
import Redis from 'ioredis';
import qs from 'qs';
import bencode from 'bencode';
import axios from 'axios';

const redis = new Redis({
  host: 'redis',
  port: 6379,
});

redis.on('connect', () => console.log('Connected to Redis!'));
redis.on('error', (err) => console.error('Redis connection error:', err));

const binaryToHex = (b: string): string =>
  Buffer.from(b, 'binary').toString('hex');

Bun.serve({
  port: config.PORT,
  hostname: '0.0.0.0',
  debug: true,
  async fetch(req: Request) {
    const url = new URL(req.url);
    const query = url.search.substring(1);
    const params = qs.parse(query, { decoder: unescape });

    if (url.pathname === '/' || url.pathname === '/home') {
      return new Response('Welcome to OPTracker!', {
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    if (url.pathname.endsWith('/announce')) {
      const requiredParams = ['info_hash', 'peer_id', 'port'];
      for (const param of requiredParams) {
        if (!params[param]) {
          return new Response(
            bencode.encode({ 'failure reason': `Missing parameter: ${param}` }),
            { status: 400 },
          );
        }
      }

      const infoHash = binaryToHex(params.info_hash as string);
      const ipClient =
        req.headers.get('cf-connecting-ip') ||
        req.headers.get('X-Real-IP') ||
        req.headers.get('x-forwarded-for') ||
        '';

      if (!infoHash || infoHash.length !== 40) {
        return new Response('Invalid info_hash length', { status: 400 });
      }

      console.log(
        `[DEBUG] Announce from IP: ${ipClient}, infoHash: ${infoHash}`,
      );

      if (config.HYBRID_TRACKER === 'private') {
        const passkey: string = url.pathname.split('/')[1];
        if (!passkey) {
          return new Response(
            bencode.encode({ 'failure reason': 'Passkey needed' }),
            { status: 400 },
          );
        }

        const userResponse = await axios.get(
          `${config.WEBSITE_URL}/api/users`,
          {
            params: {
              filters: { passkey: { $eq: passkey } },
            },
          },
        );

        if (userResponse.data.length !== 0) {
          await redis.lpush(
            `user:${userResponse.data[0].id}:logs`,
            JSON.stringify({
              action: 'announce',
              infoHash,
              ip: ipClient,
              timestamp: new Date().toISOString(),
            }),
          );
          console.log(
            `[DEBUG] Passkey ${passkey} is valid for user ${userResponse.data[0].username}`,
          );
        } else {
          return new Response(
            bencode.encode({ 'failure reason': 'Invalid passkey' }),
          );
        }
      }

      const peerEntry = `${ipClient}:${params.port}:${new Date().toISOString()}`;
      const event = params.event || 'started';

      if (event === 'stopped') {
        await redis.srem(`torrent:${infoHash}:peers`, peerEntry);
        await redis.srem(`torrent:${infoHash}:seeders`, peerEntry);
        await redis.srem(`torrent:${infoHash}:leechers`, peerEntry);
      } else {
        await redis.sadd(`torrent:${infoHash}:peers`, peerEntry);
        await redis.expire(`torrent:${infoHash}:peers`, 30 * 60);

        const isSeeder = params.left === '0';
        if (isSeeder) {
          await redis.sadd(`torrent:${infoHash}:seeders`, peerEntry);
        } else {
          await redis.sadd(`torrent:${infoHash}:leechers`, peerEntry);
        }
      }

      const peers = await redis.smembers(`torrent:${infoHash}:peers`);
      const peersList = peers
        .map((peer) => {
          const [ip, port] = peer.split(':');
          return { ip, port: parseInt(port) };
        })
        .filter(Boolean);

      const complete = await redis.scard(`torrent:${infoHash}:seeders`);
      const incomplete = await redis.scard(`torrent:${infoHash}:leechers`);

      const responseToClient: Record<string, any> = {
        interval: 1800,
        complete,
        incomplete,
        peers: peersList,
      };

      if (params.compact === '1') {
        responseToClient.peers = peersList
          .map((peer) => {
            const ipParts = peer.ip.split('.').map(Number);
            const portParts = [(peer.port >> 8) & 0xff, peer.port & 0xff];
            return Buffer.from([...ipParts, ...portParts]);
          })
          .reduce((acc, buf) => Buffer.concat([acc, buf]), Buffer.alloc(0));
      }
      return new Response(bencode.encode(responseToClient), {
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    if (url.pathname.endsWith('/scrape')) {
      const infoHashes = Array.isArray(params.info_hash)
        ? params.info_hash
        : [params.info_hash];

      const scrapeData = {};

      for (const hash of infoHashes) {
        const complete = await redis.scard(`torrent:${hash}:seeders`);
        const incomplete = await redis.scard(`torrent:${hash}:leechers`);
        const downloaded = (await redis.get(`torrent:${hash}:completed`)) || 0;

        (scrapeData as any)[hash] = { complete, incomplete, downloaded };
      }

      return new Response(bencode.encode({ files: scrapeData }), {
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    return new Response('Not Found', { status: 404 });
  },
});

console.log(
  `Server running on ${config.WEBSITE_URL}${config.ENVIRONNEMENT === 'dev' ? ':' + config.PORT : ''}`,
);
