import { createApp } from '@/app';

const app = createApp();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen({ host: HOST, port: PORT }, () => {
    console.log(`🚀 Server is running at http://${HOST}:${PORT}`);
});
