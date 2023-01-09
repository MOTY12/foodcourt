import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { AppConfig, AppConfigValidationSchema } from './app.config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ObjectionModule, Model } from 'nestjs-objection/dist';
import { knexSnakeCaseMappers } from 'objection';
import { BrandsController } from './routes/brands/brand.controller';
import { BrandsModule } from './routes/brands/brand.module';
import { UserController } from './routes/users/user.controller';
import { UsersModule } from './routes/users/user.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { Users } from './routes/users/entities/user.entity';
import { AddonModule } from './routes/addon/addon.module';
import { AddonController } from './routes/addon/addon.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: AppConfigValidationSchema,
    }),
    ObjectionModule.forRoot({
      Model,
      config: {
        client: AppConfig.DB_CLIENT,
        useNullAsDefault: true,
        connection: {
          database: AppConfig.DB_NAME,
          user: AppConfig.DB_USER,
          password: AppConfig.DB_PASSWORD,
        },
        pool: {
          min: 2,
          max: 10,
        },
        migrations: {
          directory: './src/db/migrations',
        },
        seeds: {
          directory: './seeds',
        },
        ...knexSnakeCaseMappers,
      }
    }),
    ObjectionModule.forFeature([Users, { modelClass: Users, relationMappings: () => ({})}]),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 1000,
    }),
    BrandsModule,
    UsersModule,
    AddonModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer ) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'users/login', method: RequestMethod.POST },
        { path: 'users/register', method: RequestMethod.POST },
        // {path: 'brands/', method: RequestMethod.POST}
      )
      .forRoutes(
        BrandsController,
        UserController,
        AddonController,
      )
  }
}
