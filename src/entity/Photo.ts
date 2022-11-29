import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => User, (user) => user.photos)
  user: User;

  @DeleteDateColumn()
  deleted_at: Date;
}
