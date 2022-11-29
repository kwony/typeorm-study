import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, OneToOne, JoinColumn } from 'typeorm';
import { Photo } from './Photo';
import { Profile } from './Profile';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Photo, (photo) => photo.users)
  photos: Photo[];

  @OneToOne(() => Profile)
  @JoinColumn() // side's table will contain a relation id an foreign keys to target entity table. -> user 테이블에서 foreign key를 갖게됨
  profile: Profile;
}
