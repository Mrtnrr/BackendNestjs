import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { ValidatorPipe } from './pipes/validator.pipe';
async function bootstrap() {
    
    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
        cors: true,
    });
    app.enableCors();
    const options = new DocumentBuilder()
        .setTitle('aPIS Examen')
        .setDescription('The aPIS Examen API description')
        .setVersion('1.0')
        .addTag('aPIS Examen')
        .build();
        app.use(compression());
        
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    app.useGlobalPipes(new ValidatorPipe());
   	await app.listen(process.env.PORT);
	console.log(
		`listen in port ${process.env.HOST}`,
	);
}
bootstrap();
