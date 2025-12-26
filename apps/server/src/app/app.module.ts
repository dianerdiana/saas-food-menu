// Library
import { ClassSerializerInterceptor, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InjectDataSource, TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { DataSource } from 'typeorm';

// Config
import configuration from './config/env.config';
import { TypeOrmConfigService } from './config/typeorm.config';

// Shared
import { CaslAbilityFactory } from '@/shared/factories/casl-ability.factory';
import { GlobalExceptionFilter } from '@/shared/filters/http-exception.filter';
import { StorageService } from '@/shared/services/storage.service';
import { ImageUrlInterceptor } from '@/shared/interceptors/image-url.interceptor';
import { TransformInterceptor } from '@/shared/interceptors/transform.interceptor';

// Modules
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { PermissionModule } from '@/modules/permission/permission.module';
import { StoreModule } from '@/modules/store/store.module';
import { BankModule } from '@/modules/bank/bank.module';
import { CategoryModule } from '@/modules/category/category.module';
import { IngredientModule } from '@/modules/ingredient/ingredient.module';
import { ProductModule } from '@/modules/product/product.module';
import { SubscriptionModule } from '@/modules/subscription/subscription.module';
import { SubscriptionPaymentModule } from '@/modules/subscription-payment/subscription-payment.module';
import { TransactionModule } from '@/modules/transaction/transaction.module';
import { TransactionDetailModule } from '@/modules/transaction-detail/transaction-detail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development'],
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    PermissionModule,
    BankModule,
    CategoryModule,
    IngredientModule,
    ProductModule,
    StoreModule,
    SubscriptionModule,
    SubscriptionPaymentModule,
    TransactionModule,
    TransactionDetailModule,
  ],
  providers: [
    CaslAbilityFactory,
    StorageService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ImageUrlInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      inject: [Reflector],
      useFactory: (reflector: Reflector) => new ClassSerializerInterceptor(reflector),
    },
  ],
  exports: [CaslAbilityFactory, StorageService],
})
export class AppModule implements OnModuleInit {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async onModuleInit() {
    try {
      if (this.dataSource.isInitialized) {
        console.log('---');
        console.log('✅ DATABASE CONNECTED SUCCESSFULLY');
        console.log(`🗄️  Database: ${this.dataSource.options.database}`);
        console.log('---');
      }
    } catch (error) {
      console.error('❌ DATABASE CONNECTION ERROR:', error);
    }
  }
}
