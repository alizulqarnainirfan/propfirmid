// Script to fix problematic image URLs in the database
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function fixImageUrls() {
  console.log('🔧 Fixing problematic image URLs...')

  try {
    // Fix blog cover images that might be problematic
    const blogsWithProblematicImages = await prisma.blog.findMany({
      where: {
        coverImage: {
          contains: 'media.istockphoto.com'
        }
      }
    })

    if (blogsWithProblematicImages.length > 0) {
      console.log(`Found ${blogsWithProblematicImages.length} blogs with problematic images`)
      
      for (const blog of blogsWithProblematicImages) {
        await prisma.blog.update({
          where: { id: blog.id },
          data: {
            coverImage: '/placeholder.svg' // Use our placeholder
          }
        })
        console.log(`✅ Fixed blog: ${blog.title}`)
      }
    }

    // Fix firm logos that might be problematic
    const firmsWithProblematicImages = await prisma.propFirm.findMany({
      where: {
        logo: {
          contains: 'media.istockphoto.com'
        }
      }
    })

    if (firmsWithProblematicImages.length > 0) {
      console.log(`Found ${firmsWithProblematicImages.length} firms with problematic images`)
      
      for (const firm of firmsWithProblematicImages) {
        await prisma.propFirm.update({
          where: { id: firm.id },
          data: {
            logo: '/placeholder.svg' // Use our placeholder
          }
        })
        console.log(`✅ Fixed firm: ${firm.name}`)
      }
    }

    console.log('🎉 Image URL cleanup completed!')

  } catch (error) {
    console.error('❌ Error fixing image URLs:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixImageUrls()