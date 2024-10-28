module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src', // 소스 코드 디렉토리
  testRegex: '.*\\.spec\\.ts$', // 테스트 파일 패턴
  transform: {
    '^.+\\.ts$': 'ts-jest', // TypeScript 파일 변환
  },
  testEnvironment: 'node', // Node.js 환경
  coverageDirectory: 'coverage', // 커버리지 출력 디렉토리
  collectCoverageFrom: ['**/*.ts'], // 커버리지 수집 파일
};
