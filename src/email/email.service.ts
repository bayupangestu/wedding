import { Injectable } from '@nestjs/common';
const nodemailer = require('nodemailer');

@Injectable()
export class EmailService {
  public async sendEmail(data: any): Promise<any> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'delonixtechnologysolutions@gmail.com',
        pass: 'delTech030224'
      }
    });
    let info = await transporter.sendMail({
      from: 'delonixtechnologysolutions@gmail.com', // sender address
      to: data.user_email, // list of receivers
      subject: 'test', // Subject line
      text: 'bayu ganteng' // plain text body
    });
    return info;
  }
}
