import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Entity({name:'users'})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    @Column({
        type: 'varchar',
        nullable: false,
        primary: true
    })
    id: string;

    @Column({
        type: 'varchar',
        nullable: false,
        unique: false
    })
    name: string;

    @Column({
        unique: true,
        name: 'username',
        nullable: false
    })
    username: string;

    @Column({
        unique: true,
        nullable: false,
        name: 'email'
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    password: string;

    @BeforeInsert() async hashPassword?(): Promise<void> {
        this.id = uuidv4();
        this.password = await bcrypt.hash(this.password, 10);
    }
}
