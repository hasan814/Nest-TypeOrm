import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "src/user/entities/user.entity";

@Entity("blog")
export class BlogEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  title: string;
  @Column()
  text: string
  @Column()
  userId: number;
  @ManyToOne(() => UserEntity, user => user.blogs)
  user: UserEntity
}
