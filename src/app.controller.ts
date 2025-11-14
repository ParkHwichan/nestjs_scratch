import { Controller, Get } from '@nestjs/common';

// [section2.md - NestJS 도구들, 5단계] 컨트롤러: 라우팅 논리 포함
// 모든 NestJS 애플리케이션은 최소한 1개의 컨트롤러가 필요합니다
@Controller('/app')
export class AppController {
    // [section2.md - 5단계] @Get() 데코레이터로 GET 요청 처리
    // 루트 경로(/)에 대한 GET 요청을 처리합니다
    @Get('/hi')
    getRootRoute() {
        return 'hi there!';
    }

    @Get('/bye')
    getByeThere() {
        return 'bye there!';
    }
}