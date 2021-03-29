import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { EventPattern } from '@nestjs/microservices'

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto)
    }

    // @Patch(':id/like')
    // async like(@Param('id') id: number) {
    //     const product = await this.productsService.findOne(id)
    //     return this.productsService.update(id, {})
    // }

    @EventPattern('create_product')
    async create_product(createProductDto: CreateProductDto) {
        console.log(createProductDto)
        await this.productsService.create(createProductDto)
    }

    @Get()
    findAll() {
        return this.productsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(+id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.productsService.update(+id, updateProductDto)
    }

    @EventPattern('update_product')
    async update_product(updateProduct: UpdateProductDto) {
        await this.productsService.update(updateProduct.id, updateProduct)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productsService.remove(+id)
    }

    @EventPattern('delete_product')
    async delete_product(id: number) {
        console.log(id)

        await this.productsService.remove(id)
    }
}
