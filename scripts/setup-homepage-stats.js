// Setup script for homepage statistics feature
const { execSync } = require('child_process')

console.log('🚀 Setting up Homepage Statistics Admin Feature...\n')

try {
  console.log('1️⃣ Generating Prisma client...')
  execSync('npx prisma generate', { stdio: 'inherit' })
  console.log('✅ Prisma client generated successfully!\n')

  console.log('2️⃣ Creating default site settings...')
  execSync('node -e "const { PrismaClient } = require(\'@prisma/client\'); const prisma = new PrismaClient(); prisma.siteSettings.create({ data: { communityMembers: \'75K+\', verifiedReviews: \'3000+\', trustedFirms: \'20+\', freeAccountsDistributed: \'5000+\' } }).then(() => { console.log(\'✅ Default settings created!\'); prisma.$disconnect(); }).catch(e => { if (e.code === \'P2002\') { console.log(\'ℹ️ Settings already exist, skipping...\'); } else { console.error(\'❌ Error:\', e.message); } prisma.$disconnect(); });"', { stdio: 'inherit' })

  console.log('\n🎉 Setup completed successfully!')
  console.log('\n📱 You can now access the admin interface at:')
  console.log('   • English: http://localhost:3000/en/admin/site-settings')
  console.log('   • Indonesian: http://localhost:3000/id/admin/site-settings')
  console.log('\n💡 Login with: admin@propfirm.com / password123')

} catch (error) {
  console.error('❌ Setup failed:', error.message)
  console.log('\n🔧 Manual setup required:')
  console.log('   1. Run: npx prisma generate')
  console.log('   2. Run: npx prisma db seed')
  console.log('   3. Restart your development server')
}