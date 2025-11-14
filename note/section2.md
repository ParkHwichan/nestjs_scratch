# Section 2: 첫 번째 애플리케이션 시작하기

## 실행 순서

### 1. 프로젝트 폴더 생성
```bash
mkdir scratch
cd scratch
```

### 2. package.json 파일 생성
```bash
npm init -y
```

### 3. NestJS 의존성 설치
```bash
npm install @nestjs/common@7.6.17 @nestjs/core@7.6.17 @nestjs/platform-express@7.6.17 reflect-metadata@0.1.13 typescript@4.3.2
```

**주의:** 의존성 스펠링과 버전을 정확히 확인하세요.

### 4. tsconfig.json 파일 생성
프로젝트 루트에 `tsconfig.json` 파일을 생성하고 다음 내용을 입력:

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es2017",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```

**주의:** 
- 스펠링을 정확히 확인하세요
- `Decorator`의 D와 `Metadata`의 M은 대문자입니다

## 서버 요청-응답 사이클

모든 서버는 다음과 같은 요청-응답 사이클을 따릅니다:

1. **요청 수신** - 사용자가 서버에 요청을 전송
2. **데이터 검증** - 요청 본문이나 데이터 검증
3. **인증/인가** - 사용자 인증 및 권한 확인
4. **라우팅** - 요청을 특정 함수로 전달
5. **비즈니스 로직 실행** - 데이터베이스 접근, 정보 저장 등
6. **응답 생성 및 반환** - 결과를 요청자에게 반환

언어나 프레임워크와 무관하게 모든 서버는 이러한 단계들을 수행합니다.

## NestJS 도구들

NestJS는 요청-응답 사이클의 각 단계를 처리하는 도구들을 제공합니다:

- **파이프 (Pipe)** - 유입되는 요청 데이터 검증
- **가드 (Guard)** - 인증 및 인가 확인
- **컨트롤러 (Controller)** - 라우팅 논리 포함
- **서비스 (Service)** - 비즈니스 논리 포함
- **모듈 (Module)** - 애플리케이션 구조화
- **필터 (Filter)** - 예외 처리
- **인터셉터 (Interceptor)** - 요청/응답 변환
- **리포지토리 (Repository)** - 데이터 접근 계층

### 최소 요구사항

가장 간단한 NestJS 애플리케이션을 만들기 위해서는 최소한:
- **모듈 (Module)** 1개
- **컨트롤러 (Controller)** 1개

가 필요합니다. 모든 NestJS 애플리케이션은 내부에 최소한 1개의 모듈과 1개의 컨트롤러를 갖게 됩니다.

### 5. src 디렉터리 및 main.ts 파일 생성
```bash
mkdir src
```

`src/main.ts` 파일을 생성하고 다음 내용을 입력:

```typescript
import { Controller, Get, Module } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRootRoute() {
    return 'hi there!';
  }
}
```

**주의:**
- `@Controller()`, `@Get()` 데코레이터 사용
- 데코레이터는 클래스나 메서드 바로 위에 위치

### 6. 모듈 생성 및 애플리케이션 설정 완료
`src/main.ts` 파일을 다음과 같이 완성:

```typescript
import { Controller, Get, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

@Controller()
export class AppController {
  @Get()
  getRootRoute() {
    return 'hi there!';
  }
}

@Module({
  controllers: [AppController],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

**주의:**
- `NestFactory`는 `@nestjs/core`에서 임포트 (대부분은 `@nestjs/common`에서 임포트)
- `@Module()` 데코레이터에 `controllers` 속성으로 컨트롤러 배열 전달
- `bootstrap()` 함수는 애플리케이션 인스턴스를 생성하고 포트 3000에서 리스닝 시작

### 7. 애플리케이션 실행
```bash
npx ts-node-dev src/main.ts
```

**주의:**
- 백지 상태부터 설정한 프로젝트이므로 이 명령을 사용
- 이후 Nest CLI를 사용하면 더 간단한 명령으로 실행 가능
- 3000번 포트가 이미 사용 중이면 다른 포트로 변경하거나 해당 프로세스를 중지

### 8. 브라우저에서 테스트
브라우저에서 `http://localhost:3000`에 접속하면 "hi there!" 텍스트가 표시됩니다.

## NestJS 파일 명명 규칙

NestJS에서는 파일 하나에 클래스 하나를 만듭니다. 파일 이름은 다음과 같은 규칙을 따릅니다:

**규칙:** `[클래스 이름의 첫 부분].{클래스 타입}.ts`

**예시:**
- `AppController` 클래스 → `app.controller.ts`
- `AppModule` 클래스 → `app.module.ts`
- `UserService` 클래스 → `user.service.ts`

파일 이름과 클래스 이름을 보면 목적을 즉시 알 수 있어야 합니다.

### 9. 파일 분리 - AppController 추출

`src/app.controller.ts` 파일을 생성하고 다음 내용을 입력:

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRootRoute() {
    return 'hi there!';
  }
}
```

**주의:**
- `Controller`, `Get`을 `@nestjs/common`에서 임포트
- 클래스를 `export`로 내보내기 (다른 파일에서 사용하기 위해)

### 10. 파일 분리 - AppModule 추출

`src/app.module.ts` 파일을 생성하고 다음 내용을 입력:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
})
export class AppModule {}
```

**주의:**
- `Module`을 `@nestjs/common`에서 임포트
- `AppController`를 `./app.controller`에서 임포트
- 클래스를 `export`로 내보내기

### 11. main.ts 파일 정리

`src/main.ts` 파일을 다음과 같이 수정:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  
  const server = app.getHttpServer();
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
```

**주의:**
- `Controller`, `Get`, `Module` 임포트 제거 (더 이상 필요 없음)
- `AppModule`을 `./app.module`에서 임포트
- `bootstrap()` 함수만 남김

## 라우팅 규칙

### 기본 라우팅

`@Controller()`와 `@Get()` 데코레이터에 인자를 제공하지 않으면 루트 경로(`/`)에 응답합니다.

```typescript
@Controller()
export class AppController {
  @Get()
  getRootRoute() {
    return 'hi there!';
  }
}
// GET / → 'hi there!'
```

### 경로 지정

데코레이터에 문자열 경로를 제공하여 특정 경로를 지정할 수 있습니다.

#### @Get() 데코레이터에 경로 지정

```typescript
@Controller()
export class AppController {
  @Get('/asdf')
  getRootRoute() {
    return 'hi there!';
  }
}
// GET /asdf → 'hi there!'
// GET / → 404 Not Found
```

#### @Controller() 데코레이터에 경로 지정

```typescript
@Controller('/app')
export class AppController {
  @Get('/asdf')
  getRootRoute() {
    return 'hi there!';
  }
}
// GET /app/asdf → 'hi there!'
// GET / → 404 Not Found
// GET /asdf → 404 Not Found
```

**주의:**
- `@Controller()`에 지정한 경로는 모든 라우트 핸들러에 prefix로 적용됩니다
- `@Get()`에 지정한 경로는 해당 메서드에만 적용됩니다
- 최종 경로 = `@Controller()` 경로 + `@Get()` 경로

### 여러 라우트 핸들러 추가

```typescript
@Controller('/app')
export class AppController {
  @Get('/asdf')
  getRootRoute() {
    return 'hi there!';
  }

  @Get('/bye')
  getByeThere() {
    return 'bye there!';
  }
}
// GET /app/asdf → 'hi there!'
// GET /app/bye → 'bye there!'
```

**주의:**
- 경로 문자열에 `/` 포함 여부 확인
- 각 메서드는 서로 다른 경로를 가질 수 있습니다
