// Library
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InjectDataSource, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

// Config
import configuration from './config/env.config';
import { TypeOrmConfigService } from './config/typeorm.config';

// Modules
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/modules/auth/infrastructure/guards/auth-jwt.guard';

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
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async onModuleInit() {
    try {
      if (this.dataSource.isInitialized) {
        console.log('---');
        console.log('✅ DATABASE CONNECTED SUCCESSFULLY');
        // console.log(`📡 Host: ${this.dataSource.options.host}`);
        console.log(`🗄️  Database: ${this.dataSource.options.database}`);
        console.log('---');
      }
    } catch (error) {
      console.error('❌ DATABASE CONNECTION ERROR:', error);
    }
  }
}
