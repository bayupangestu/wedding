import { Injectable } from '@nestjs/common';
const ImageKit = require('imagekit');
import * as fs from 'fs';

@Injectable()
export class UploadHelper {
  public async uploadFile(file: any): Promise<any> {
    const imageUrl = await new Promise((resolve, reject) => {
      const imageKit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC,
        privateKey: process.env.IMAGEKIT_PRIVATE,
        urlEndpoint: process.env.IMAGEKIT_ENDPOINT
      });
      fs.readFile(file.path, function (err, data) {
        if (err) {
          reject(err);
          return;
        }
        imageKit.upload(
          {
            file: data,
            fileName: file.filename
          },
          function (error, result) {
            if (error) {
              reject(error);
            } else {
              resolve(result.url);
            }
          }
        );
      });
    });
    return imageUrl;
  }
}
