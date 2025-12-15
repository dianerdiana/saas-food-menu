import { createServer } from './server';

const startServer = async (): Promise<void> => {
  try {
    const server = await createServer();
    const port = process.env.PORT ?? 3000;
    const host = '127.0.0.1';

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
