import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {EmailModule} from './email/email.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import emailConfig from "./config/email-config";
import {validationSchema} from "./config/validation-schema";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    controllers: [AppController],
    providers: [AppService, ConfigService],
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
            load: [emailConfig],
            isGlobal: true,
            validationSchema,
        }),
        TypeOrmModule.forRoot(),
        UsersModule,
        EmailModule,
    ],
})
export class AppModule {
}
