import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AuthController } from 'src/auth/controllers/auth.controller';
import { AuthJwtAccessStrategy } from 'src/auth/guards/jwt-access-token/auth.access-token.strategy';
import { AuthJwtRefreshStrategy } from 'src/auth/guards/jwt-refresh-token/auth.refresh-token.strategy';
import { AuthService } from 'src/auth/services/auth.service';
import { HelpersModule } from 'src/common/helpers/helpers.module';
import { UserModule } from 'src/user/user.module';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
    imports: [HelpersModule, UserModule],
})
export class AuthModule {
    static forRoot(): DynamicModule {
        const providers: Provider<any>[] = [
            AuthJwtAccessStrategy,
            AuthJwtRefreshStrategy,
        ];
        return {
            module: AuthModule,
            providers: providers,
            exports: [],
            controllers: [],
            imports: [HelpersModule, UserModule],
        };
    }
}
