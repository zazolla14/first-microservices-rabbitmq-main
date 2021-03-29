import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    // HttpService,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { EventPattern } from '@nestjs/microservices'

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService, // private httpService: HttpService,
    ) {}

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto)
    }

    @EventPattern('create_product')
    create_product(createProductDto: CreateProductDto) {
        this.productsService.create(createProductDto)
    }

    @Post(':id/like')
    async like(@Param('id') id: number) {
        const product = await this.productsService.findOne(id)
        product.likes++
        // this.httpService
        //     .post(`http://localhost:8000/api/products/${id}/like`, {})
        //     .subscribe((res) => {
        //         console.log(res)
        //     })
        return this.productsService.update(id, product)
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
    update_product(updateProduct: UpdateProductDto) {
        this.productsService.update(updateProduct.id, updateProduct)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productsService.remove(+id)
    }

    @EventPattern('delete_product')
    async delete_product(id: number) {
        await this.productsService.remove(+id)
    }
}
