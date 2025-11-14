import { Module } from '@nestjs/common';
import { AppController } from './app.controller';


// [section2.md - NestJS 도구들, 최소 요구사항, 6단계] 모듈: 애플리케이션 구조화
// 모든 NestJS 애플리케이션은 최소한 1개의 모듈이 필요합니다
// 모듈은 컨트롤러를 감싸며, controllers 배열에 등록된 컨트롤러들을 자동으로 인스턴스화합니다
@Module({
    controllers: [AppController],
})
export class AppModule {}
