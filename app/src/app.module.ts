import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {EmailModule} from './email/email.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import emailConfig from "./config/email-config";
import {validationSchema} from "./config/validation-schema";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LoggerMiddleware} from "./logger/logger.middelware";
import {Logger2Middleware} from "./logger/logger2.middelware";
import {UsersController} from "./users/users.controller";
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "./guard/AuthGuard";
import {AuthModule} from './auth/auth.module';
import authConfig from "./config/auth-config";

@Module({
    controllers: [AppController],
    providers: [
        AppService,
        ConfigService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
            load: [emailConfig, authConfig],
            isGlobal: true,
            validationSchema,
        }),
        TypeOrmModule.forRoot(),
        UsersModule,
        EmailModule,
        AuthModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(LoggerMiddleware, Logger2Middleware)
            .forRoutes(UsersController);
        // .exclude({ path: 'users', method: RequestMethod.GET },)
    }
}
