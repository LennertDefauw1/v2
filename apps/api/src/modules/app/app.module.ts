import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { UserModule } from '../user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { FlagsmithModule } from '../flagsmith/flagsmith.module';
import { UserGateway } from '../user/user.gateway';
import { FlagsmithService } from '../flagsmith/flagsmith.service';
import { DigitalTwinModule } from '../digitaltwin/digitaltwin.module';

@Module({
    imports: [
        ConfigModule.forRoot({}),
        PrismaModule.forRoot({ isGlobal: true }),
        ScheduleModule.forRoot(),
        UserModule,
        FlagsmithModule,
        DigitalTwinModule,
    ],
    controllers: [AppController],
    providers: [AppService, UserGateway, FlagsmithService],
})
export class AppModule {}
