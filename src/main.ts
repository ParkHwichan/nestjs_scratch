// [section2.md - 6단계] @nestjs/core에서 NestFactory 임포트
// main.ts에서는 드물게 @nestjs/core에서 임포트합니다
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


// [section2.md - 6단계] bootstrap 함수: 애플리케이션 인스턴스 생성 및 포트 리스닝 시작
// NestFactory.create()로 AppModule로부터 Nest 애플리케이션 인스턴스를 생성합니다
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 3000;
    
    // 서버의 error 이벤트를 직접 리스닝하여 포트 충돌 에러를 처리
    const server = app.getHttpServer(); // NestJs 가 래핑한 http 서버 인스턴스를 가져옵니다 (express or fastify 서버 인스턴스)
    server.on('error', (error: any) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`\n❌ Port ${port} is already in use. Please:`);
            console.error(`   1. Stop the process using port ${port}`);
            console.error(`   2. Or set a different port using: PORT=3001 npx ts-node-dev src/main.ts\n`);
            process.exit(1);
        } else {
            console.error('Server error:', error);
            process.exit(1);
        }
    });
    
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();