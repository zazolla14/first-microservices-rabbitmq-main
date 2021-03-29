import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { MongooseModule } from '@nestjs/mongoose'
import config from './config/key'
import { Product, ProductSchema } from './model/product.model'

@Module({
    imports: [
        MongooseModule.forRoot(config.mongoURI, {
            autoCreate: true,
        }),
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
        ]),
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}
