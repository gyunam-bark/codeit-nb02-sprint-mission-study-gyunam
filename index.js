import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MISSION_ROOT = `./missions/`;
const MISSION_MAIN = `main.js`;

const args = process.argv.slice(2);
const missionNumber = args[0];

if (!missionNumber) {
  console.error('미션 번호를 입력하세요. 예: `node index.js 1`');
  process.exit(1);
}

const missionPath = path.resolve(__dirname, `${MISSION_ROOT}${missionNumber}/${MISSION_MAIN}`);

try {
  await fs.access(missionPath);

  const missionModule = await import(missionPath);

  if (typeof missionModule.default === 'function') {
    missionModule.default();
  }
} catch (error) {
  if (error.code === 'ENOENT') {
    console.error(`[ERROR] 미션 ${missionNumber}의 파일이 존재하지 않습니다: ${missionPath}`);
  } else {
    console.error(`[ERROR] 미션 ${missionNumber} 실행 중 에러 발생:`, err);
  }
  process.exit(1);
}