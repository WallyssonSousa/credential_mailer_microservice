import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("projects")
export class ProjectEntity{
    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column({ name: "primary_color"})
    primaryColor!: string;

    @Column({ name: "logo_url", nullable: true})
    logoUrl?: string;

    @Column({ name: "login_url"})
    loginUrl!: string;

}