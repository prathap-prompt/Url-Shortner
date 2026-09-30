import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn,Index } from "typeorm";
import { user } from '../../users/entities/user.entity';
import { Urlclick } from "../../analytics/entities/url_click.entity";

@Entity('urls')
export class Url{

    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @Column()
    originalurl!:string;

    @Column({unique:true})
    shorturl!:string;

    @Column({default:0})
    clickcount!:number;

    @Column({
        type:'timestamp',
        default:null
    })
    expiresAt!:Date |null;

    @DeleteDateColumn()
    deletedAt!:Date |null;

    @Column({default:true})
    isActive!:boolean;

    @ManyToOne(()=>user,(user)=>user.urls)
    @JoinColumn({name:'user_id'})
    @Index()
    user!:user;

    @OneToMany(()=>Urlclick,(click)=>click.url)
    click!:Urlclick[]
}