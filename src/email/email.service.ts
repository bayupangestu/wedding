import { Injectable } from '@nestjs/common';
const nodemailer = require('nodemailer');

@Injectable()
export class EmailService {
  public async sendEmail(data: any): Promise<any> {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 465,
      secure: true,
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
