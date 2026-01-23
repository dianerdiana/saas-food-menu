import { ConfigService } from '@nestjs/config';
import { createServer } from './server';

const startServer = async (): Promise<void> => {
  try {
    const server = await createServer();
    const env = server.get(ConfigService);

    const port = env.get('port');
    const host = env.get('host');

    await server.listen(port, host);

    const info = await server.getUrl();
    console.log(`🚀 Server running at: ${info}`);
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

// eslint-disable-next-line @typescript-eslint/no-floating-promises
startServer();
