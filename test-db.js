const postgres = require('postgres');
const fs = require('fs');

// 从 .env 文件读取 DATABASE_URL
function loadEnv() {
  try {
    const envContent = fs.readFileSync('.env', 'utf8');
    const match = envContent.match(/DATABASE_URL="([^"]+)"/);
    return match ? match[1] : null;
  } catch (error) {
    return null;
  }
}

async function testDatabaseConnection() {
  const dbUrl = loadEnv();
  console.log('正在测试数据库连接...\n');
  console.log('DATABASE_URL:', dbUrl ? '已设置' : '未设置\n');

  const sql = postgres(dbUrl);

  try {
    console.log('尝试连接到数据库...\n');
    const result = await sql`SELECT NOW() as current_time, version() as version`;
    console.log('✅ 数据库连接成功!\n');
    console.log('当前数据库时间:', result[0].current_time);
    console.log('数据库版本:', result[0].version);
  } catch (error) {
    console.error('❌ 数据库连接失败:\n');
    console.error(error.message);
    console.error(error.code);
  } finally {
    await sql.end();
    console.log('\n数据库连接已关闭');
  }
}

testDatabaseConnection();
