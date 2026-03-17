import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: {
          select: { name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(blogs)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { title, content, excerpt, coverImage, published, authorId } = data

    // Verify the author exists, if not use the first admin user
    let validAuthorId = authorId
    
    const authorExists = await prisma.user.findUnique({
      where: { id: authorId }
    })

    if (!authorExists) {
      // Get the first admin user
      const adminUser = await prisma.user.findFirst({
        where: { role: 'admin' }
      })
      
      if (!adminUser) {
        return NextResponse.json({ error: 'No admin user found' }, { status: 400 })
      }
      
      validAuthorId = adminUser.id
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        coverImage,
        published: published || false,
        authorId: validAuthorId
      }
    })

    return NextResponse.json(blog)
  } catch (error) {
    console.error('Create blog error:', error)
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 })
  }
}
