import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ProductDocument = Product & Document

@Schema()
export class Product {
    @Prop()
    id: number

    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    image: string

    @Prop()
    likes: number
}
export const ProductSchema = SchemaFactory.createForClass(Product)
