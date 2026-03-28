/**
 * 将指定邮箱用户设为管理员（role = ADMIN）
 * 用法: node scripts/set-admin.js <邮箱>
 * 示例: node scripts/set-admin.js admin@example.com
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error('用法: node scripts/set-admin.js <邮箱>');
    process.exit(1);
  }

  const user = await prisma.user.updateMany({
    where: { email: email.trim() },
    data: { role: 'ADMIN' },
  });

  if (user.count === 0) {
    console.error('未找到该邮箱用户:', email);
    process.exit(1);
  }
  console.log('已将该用户设为管理员:', email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
