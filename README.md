# Rollipop Sentry Test

Sentry 연동을 직접 추가하며 공부하기 위한 React Native 기본 앱입니다. `@sentry/react-native`와 `@sentry/rollup-plugin`을 연결했습니다.

## 구성

- React Native 0.84.1 / React 19.2.3
- Rollipop 1.0.0-alpha.29
- `@rollipop/rolldown` 1.0.31 (`pnpm-workspace.yaml`의 override)
- Node 24.21.0 / pnpm 11.22.0
- Sentry React Native 8.27.0 / Rollup plugin 5.4.0
- SWC 1.15.43
- Expo 없이 React Native Community CLI 사용

`rollipop.config.ts`에서 진입점과 `treeshake: true`를 지정합니다. `react-native.config.js`와 Android/iOS의 번들 CLI도 Rollipop을 사용합니다. Babel 설정은 React Native의 기본 Jest 테스트에서 사용합니다.

SWC에 `transform-async-to-generator`를 추가해 Sentry의 async generator 문법을 Hermes에서 실행할 수 있게 변환합니다. Rollipop이 `env.include` 배열을 인덱스별로 병합하므로, 기존 `hermes-v1` 변환 4개도 목록에 유지합니다.

## 실행

```sh
mise install
pnpm install
cp .env.example .env.local
cp .env.sentry-build-plugin.example .env.sentry-build-plugin
```

복사한 파일에 본인의 Sentry 값을 입력한 뒤 실행합니다. 기존 로컬 설정이 있으면 복사 단계를 생략합니다.

```sh
pnpm start
```

다른 터미널에서 실행할 에뮬레이터 또는 시뮬레이터를 지정합니다.

```sh
pnpm android --deviceId <에뮬레이터-serial> --no-packager
pnpm ios --simulator "<시뮬레이터 이름>" --no-packager
```

iOS를 처음 실행하기 전에는 CocoaPods 의존성을 설치합니다.

```sh
bundle install
cd ios
bundle exec pod install
cd ..
```

화면은 `App.tsx`에서 수정합니다.

`App.tsx`에서 환경변수의 DSN으로 초기화하고 `Sentry.wrap(App)`을 적용합니다.

- `.env.local`: `ROLLIPOP_SENTRY_DSN`을 설정합니다. Rollipop이 `ROLLIPOP_` 접두사의 값을 앱 번들에 포함하며, 앱에서는 `import.meta.env.ROLLIPOP_SENTRY_DSN`으로 읽습니다.
- `.env.sentry-build-plugin`: `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN`을 설정합니다. Sentry Rollup 플러그인이 빌드 시 자동으로 읽습니다. 인증 토큰은 소스맵 업로드 시 필요합니다.

실제 환경변수 파일은 Git에서 제외하고 값이 비어 있는 `*.example` 파일만 공개합니다. 환경변수를 바꾼 뒤에는 개발 서버를 재시작합니다.

DSN은 이벤트 수집 주소이므로 앱 번들에서 확인할 수 있습니다. 인증 토큰은 업로드 권한을 가진 비밀 키이므로 `ROLLIPOP_` 접두사를 붙이거나 앱 코드에 넣지 않습니다.

## 확인 명령

```sh
pnpm typecheck
pnpm lint
pnpm test --runInBand
pnpm bundle:android
pnpm bundle:ios
```

`bundle:*`는 프로덕션 설정의 JavaScript 번들과 소스맵을 `build/`에 생성합니다. Hermes 바이트코드나 APK/IPA를 만드는 명령은 아닙니다. 네이티브 빌드에서는 React Native의 빌드 도구가 Hermes 컴파일을 수행합니다.

## 설정 검증

Sentry 추가 후 타입 검사, ESLint, Android Debug 빌드·에뮬레이터 설치까지 통과했습니다. SWC 변환 추가 후 Android 개발 번들 전체의 Hermes 컴파일과 에뮬레이터 앱 화면 표시를 확인했습니다. 기존 `async generators are unsupported` 시작 오류는 해결됐습니다.

Sentry 이벤트 수신·소스맵 업로드와 iOS 네이티브 빌드는 아직 검증하지 않았습니다.

설정 참고: [Rollipop Quick Start](https://rollipop.dev/docs/get-started/quick-start).
# rollipop-sentry-test
