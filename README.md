# Rollipop Sentry Test

Sentry 연동을 직접 추가하며 공부하기 위한 React Native 기본 앱입니다. 현재는 Sentry SDK나 플러그인을 설치하지 않았습니다.

## 구성

- React Native 0.84.1 / React 19.2.3
- Rollipop 1.0.0-alpha.29
- `@rollipop/rolldown` 1.0.31 (`pnpm-workspace.yaml`의 override)
- Node 24.21.0 / pnpm 11.22.0
- Expo 없이 React Native Community CLI 사용

`rollipop.config.ts`에서 진입점과 `treeshake: true`를 지정합니다. `react-native.config.js`와 Android/iOS의 번들 CLI도 Rollipop을 사용합니다. Babel 설정은 React Native의 기본 Jest 테스트에서 사용합니다.

## 실행

```sh
mise install
pnpm install
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

타입 검사, ESLint, 기본 렌더 테스트, Android/iOS 프로덕션 JS 번들 생성과 개발 서버의 두 플랫폼 번들 HTTP 200 응답을 확인했습니다. Rollipop 패키지 기준으로 실제 로드되는 `@rollipop/rolldown` 버전도 1.0.31임을 확인했습니다.

CocoaPods 설치, Android/iOS 네이티브 빌드와 에뮬레이터·시뮬레이터 앱 실행은 아직 하지 않았습니다.

설정 참고: [Rollipop Quick Start](https://rollipop.dev/docs/get-started/quick-start).
# rollipop-sentry-test
