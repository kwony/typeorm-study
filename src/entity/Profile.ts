import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: String;

  @Column()
  photo: String;

  @OneToOne(() => User, (user) => user.profile) // Bi directional 하게 바꿀 수 잇음
  user: User;

  @DeleteDateColumn()
  deleted_at: Date;
}
