import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constraint';
import { HelpersModule } from 'src/common/helpers/helpers.module';
import { UserEntity, UserSchema } from 'src/user/repository/user.entity';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserService } from 'src/user/services/user.service';
import { UserController } from 'src/user/controllers/user.controller';
import { UserManageController } from 'src/user/controllers/user.manage.controller';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
    controllers: [UserController, UserManageController],
    providers: [UserService, UserRepository],
    exports: [UserService],
    imports: [
        PaginationModule,
        HelpersModule,
        MongooseModule.forFeature(
            [
                {
                    name: UserEntity.name,
                    schema: UserSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class UserModule {}
