import { ValidationPipe } from "@nestjs/common";
const cookieSession = require('cookie-session');

// since this is not a nest appropriate way it is not used

export const setupApp = (app: any) => {
    app.use(
        cookieSession({
            keys: ['arunscookiesession'],
        }),
    );
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );
}