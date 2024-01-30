import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class APIDocumentation {
  public builder;

  constructor() {
    this.builder = new DocumentBuilder();
  }

  initializeOptions() {
    return this.builder
      .setTitle(process.env.npm_package_name)
      .setVersion(process.env.npm_package_version)
      .setDescription('Thingsflow APIS')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      })
      .build();
  }

  setup(app) {
    const documentOptions = this.initializeOptions();
    const document = SwaggerModule.createDocument(app, documentOptions);

    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    });
  }
}
