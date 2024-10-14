import { Product } from "products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Provider {
    @PrimaryGeneratedColumn('uuid')
    providerId: string;
    @Column('text')
    providerName: string;
    @Column('text', {
        unique: true,
    })
    providerEmail: string;
    @Column({
        type: 'text',
        nullable: true
    })
    providerPhoneNumber: string;
    @OneToMany(()=> Product, (product)=> product.provider)
        products: Product[];
}
