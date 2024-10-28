-- Create main database
-- (메인 데이터 베이스 생성, 만약 이미 존재하면 생성하지 않음)
CREATE DATABASE IF NOT EXISTS `betterday_db`;
-- Create shadow database for prisma
-- (Prisma 마이그레이션을 위한 shadow 데이터베이스 생성, 해당 데이터베이스는 Prisma 가 마이그레이션 작업 중 스키마 변화를 검증하는 용도로 사용)
CREATE DATABASE IF NOT EXISTS `betterday_shadow_db`;

-- To GRANT ALL privileges to a user(mysql), allowing that user full control over a shadow database
-- 'mysql' 사용자가 shadow 데이터베이스(betterday_shadow_db)에 대해 모든 권한을 가지도록 설정함, 이는 Prisma가 마이그레이션을 수행할 때 필요한 권한을 부여하기 위함임.
GRANT ALL PRIVILEGES ON betterday_shadow_db.* TO 'mysql'@'%';
