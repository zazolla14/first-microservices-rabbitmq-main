import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import config from './products/config/key'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [config.RMQURL],
                queue: config.RMQQueue,
                queueOptions: {
                    durable: true,
                },
            },
        },
    )
    app.listen(() => console.log('Microservices is listening'))
}
bootstrap()
