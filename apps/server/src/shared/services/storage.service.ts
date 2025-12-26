import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import { BUCKET_CONFIG } from '../constants/bucket-config.constant';

@Injectable()
export class StorageService {
  private storage: Storage;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.storage = new Storage({
      projectId: configService.get<string>(BUCKET_CONFIG.gcpProjectId),
      credentials: {
        client_email: configService.get<string>(BUCKET_CONFIG.gcpClientEmail),
        private_key: configService.get<string>(BUCKET_CONFIG.gcpPrivateKey),
      },
    });
    this.bucketName = configService.get<string>(BUCKET_CONFIG.gcpBucketName) || '';
  }

  getBucketName(): string {
    return this.bucketName;
  }

  async uploadSingleImage(file: Express.Multer.File, folderName: string): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName);
    const fileName = `${folderName}/${Date.now()}-${file.originalname}`;
    const blob = bucket.file(fileName);

    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (err) => reject(err));

      blobStream.on('finish', () => {
        const endpoint = `/${blob.name}`;
        resolve(endpoint);
      });

      blobStream.end(file.buffer);
    });
  }
}
