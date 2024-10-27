import { User } from "auth/entities/user.entity";
import { Location } from "locations/entities/location.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Manager {
    @PrimaryGeneratedColumn('uuid')
    managerId: string;
    @Column('text')
    managerName: string;
    @Column('float')
    managerSalary: number;
    @Column('text', {
        unique: true
    })
    managerEmail: string;
    @Column('text')
    managerPhoneNumber: string;

    @OneToOne(() => Location)
    @JoinColumn({
        name: "locationId"
    })
    location: Location;

    @OneToOne(() => User)
    @JoinColumn({
        name: "userId"
    })
    user: User;
}