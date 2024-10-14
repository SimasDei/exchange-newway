import { AddressInfo } from 'net';
import { createServer } from './server/serverFactory';

if (require.main === module) {
  const server = createServer();
  const start = async () => {
    try {
      await server.listen({ port: server.environment.port, host: '0.0.0.0' });
      const serverInfo = server.server.address() as AddressInfo;

      server.log.info(`Server running at: ${serverInfo.address}:${serverInfo.port}`);
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  };

  start();
}
