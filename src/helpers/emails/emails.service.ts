import { Injectable } from '@nestjs/common';
import { createTransport, createTestAccount, Transporter } from 'nodemailer';
import { ConfigService } from '../../config/config.service';
import { renderFile } from 'pug';

@Injectable()
export class EmailsService {
    private transporter: Transporter;
    constructor(private readonly _config: ConfigService) {
        let user: any = _config.get('EMAIL_TEST')
            ? createTestAccount()
            : {
                  user: _config.get('EMAIL_USER'),
                  pass: _config.get('EMAIL_PASSWORD'),
              };
        this.transporter = createTransport({
            host: _config.get('EMAIL_HOST'),
            port: _config.get('EMAIL_PORT'),
            secure: _config.get('EMAIL_SEGURE'), // true for 465, false for other ports
            auth: { ...user },
        });
    }
    async sendMail(
        from: string,
        to: string,
        subject: string,
        text: string,
        html: string,
    ): Promise<Transporter> {
        return await this.transporter.sendMail({
            from,
            to,
            subject,
            text,
            html,
        });
    }
    async generateTemplate<T>(template: string, object: T): Promise<string> {
        return renderFile(`./templates/${template}.email.pug`, { ...object });
    }
}
