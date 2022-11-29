import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, OneToOne, JoinColumn } from 'typeorm';
import { Photo } from './Photo';
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

  // @OneToMany는 반드시 @ManyToOne과 공존해야한다. @OneToMany 만으로는 관계를 만들 수 없다 
  // (@ManyToOne에서 관계를 설정해주기 때문에 그런듯) 반대로 @ManyToOne은 @OneToMany 없이도 가능하다
  // @JoinColumn은 생략해도 된다. 
  @OneToMany(() => Photo, (photo) => photo.user) 
  photos: Photo[];
}
