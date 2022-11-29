import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, OneToOne, JoinColumn } from 'typeorm';
import { Profile } from './Profile';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  // side's table will contain a relation id an foreign keys to target entity table.
  // user 테이블에서 foreign key를 갖게됨
  profile: Profile;
}
