import { url } from "inspector";
import { Url } from "../../urls/entities/url.entity";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('url_click')
@Index(['url','clickedAt'])

export class Urlclick{

    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @CreateDateColumn()
    clickedAt!:Date;

    @Column({type:"varchar",nullable:true})
    ipaddress!: string | null;

    @Column({type:"varchar",nullable:true})
    userAgent!:string | null;

    @Column({type:"varchar",nullable:true})
    referrer!:string | null ;

    @Column({type:"varchar",nullable:true})
    country!:string | null

    @ManyToOne(()=>Url,(url)=>url.clickcount)
    @JoinColumn({name:'url_id'})
    url!:Url;



}