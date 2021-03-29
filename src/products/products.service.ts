import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product, ProductDocument } from './model/product.model'

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<ProductDocument>,
    ) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {
        return new this.productModel(createProductDto).save()
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec()
    }

    async findOne(id: number): Promise<Product> {
        return this.productModel.findOne({ id })
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<any> {
        return this.productModel.findOneAndUpdate({ id }, updateProductDto)
    }

    async remove(id: number): Promise<void> {
        await this.productModel.deleteOne({ id })
    }
}
