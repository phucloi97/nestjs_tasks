import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity()
@Unique(['name'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  password: string;
  @Column()
  salt: string;
  async validatePassword(password: string): Promise<boolean> {
    let match = await bcrypt.hash(password, this.salt);
    return match === this.password;
  }
}
