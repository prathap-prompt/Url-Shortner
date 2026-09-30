import { Url } from '../../urls/entities/url.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { userRole } from '../enums/user.enum';


@Entity('user')
export class user {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column({select:true})
    password!: string;

    @Column({
        type:'enum',
        enum:userRole,
        default:userRole.USER
    })
    role!:userRole;

    @CreateDateColumn({ name: 'Created_at', type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date;

    @OneToMany(()=>Url,(url)=>url.user)
    urls!:Url[]
}