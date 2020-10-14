import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from '@hapi/joi';

export interface EnvConfig {
    [key: string]: string;
}

@Injectable()
export class ConfigService {
    private readonly envConfig: EnvConfig;

    /**
     * Creates an instance of config service.
     * @param filePath config default .env
     */
    constructor(filePath: string) {
        console.log(filePath);

        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }

    /**
     * Validates input
     * @param envConfig validadion
     * @returns input boolean
     */
    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string(),
            PORT: Joi.number().default(3000),
            TOKEN_SECRET: Joi.string().required(),
            HOST: Joi.string().required(),
            MONGODB_URI: Joi.string().required(),
            MULTER_DEST: Joi.string().required(),
            HTTP_TIMEOUT: Joi.number().default(5000),
            HTTP_MAX_REDIRECTS: Joi.number().default(5),
            EMAIL_TEST: Joi.boolean().required(),
            EMAIL_HOST: Joi.string(),
            EMAIL_PORT: Joi.number(),
            EMAIL_SEGURE: Joi.boolean(),
            EMAIL_USER: Joi.string(),
            EMAIL_PASSWORD: Joi.string(),
            LOGS_WRITE: Joi.boolean(),
            URL_LOGS: Joi.string().required(),
            USE_CLOUDINARY: Joi.boolean().required(),
            CLOUDINARY_NAME: Joi.string(),
            CLOUDINARY_API_KEY: Joi.string(),
            CLOUDINARY_API_SECRET: Joi.string(),
        });

        const { error, value: validatedEnvConfig } = envVarsSchema.validate(
            envConfig,
        );
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }

    /**
     * Gets config service
     * @param key config json
     * @returns get any config
     */
    get(key: string): any {
        return this.envConfig[key];
    }
}
