import { registerAs } from '@nestjs/config';
import { ENUM_APP_ENVIROMENT } from 'src/lib/swagger.constraint';

export default registerAs(
    'app',
    (): Record<string, any> => ({
        name: process.env.APP_NAME ?? 'ack',
        env: process.env.APP_ENV ?? ENUM_APP_ENVIROMENT.DEV,
        globalPrefix: '/api',
        port: parseInt(process.env.APP_PORT, 10) || 3000,
        prefix: process.env.APP_PREFIX ?? 'api',
    })
);
