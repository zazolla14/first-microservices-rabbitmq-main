import { PartialType } from '@nestjs/mapped-types'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { CreateProductDto } from './create-product.dto'

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsOptional()
    @IsNumber()
    id: number

    @IsOptional()
    @IsString()
    title: string

    @IsOptional()
    @IsString()
    image: string

    @IsOptional()
    @IsNumber()
    likes: number
}
