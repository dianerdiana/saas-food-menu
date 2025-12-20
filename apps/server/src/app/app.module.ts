import { Module, OnModuleInit } from '@nestjs/common';
import { GetUserUseCase } from '@modules/user/application/use-cases/get-user.use-case';
import { UserController } from '@modules/user/interface/http/user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InjectDataSource, TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/env.config';
import { TypeOrmConfigService } from './config/typeorm.config';
import { DataSource } from 'typeorm';

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
  ],
  controllers: [UserController],
  providers: [GetUserUseCase],
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
