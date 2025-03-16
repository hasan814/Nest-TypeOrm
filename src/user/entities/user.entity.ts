import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfileEntity } from "./profile.entity";
import { BlogEntity } from "src/blog/entities/blog.entity";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column()
  email: string;
  @Column({ nullable: false })
  age: number;
  @Column({ nullable: true })
  profileId: number;
  @CreateDateColumn()
  created_at: Date
  @OneToMany(() => BlogEntity, blog => blog.user, { onDelete: "CASCADE" })
  blogs: BlogEntity[]
  @OneToOne(() => ProfileEntity, profile => profile.user, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "profileId" })
  profile: ProfileEntity
}
