import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateProductDto {
    @IsNotEmpty()
    @IsNumber()
    id: number

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    image: string

    @IsOptional()
    @IsNumber()
    likes: number
}
