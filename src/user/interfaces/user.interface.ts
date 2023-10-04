import { UserDoc, UserEntity } from 'src/user/repository/user.entity';

export interface IUserEntity extends Omit<UserEntity, 'role'> {}

export interface IUserDoc extends Omit<UserDoc, 'role'> {}

export interface IUserGoogleEntity {
    accessToken: string;
    refreshToken: string;
}
