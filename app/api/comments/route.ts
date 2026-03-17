import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { content, postId, authorId, parentId } = body

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId,
        parentId: parentId || null
      },
      include: {
        author: {
          select: { name: true }
        }
      }
    })

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 })
  }
}
