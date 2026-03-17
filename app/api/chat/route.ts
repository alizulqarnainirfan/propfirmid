import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

const SYSTEM_PROMPT = `You are a helpful AI assistant for a prop firm review and comparison platform. Your role is to:

1. Help users understand prop firms and proprietary trading
2. Guide users through the platform features (reviews, comparisons, forum, giveaways)
3. Answer questions about different prop firms and their offerings
4. Explain trading challenges and evaluation processes
5. Provide general trading advice and best practices
6. Help users navigate the website

Key platform features:
- Prop Firm Reviews: Users can read and write reviews about different prop firms
- Firm Comparison: Compare multiple prop firms side-by-side
- Community Forum: Discuss trading strategies and experiences
- Giveaways: Participate in funded account giveaways
- Verified Reviews: All reviews are from real traders

Be friendly, professional, and informative. If you don't know something specific about a firm, encourage users to check the reviews section or ask the community in the forum.`

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      )
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite-preview' })

    // Build chat history
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: 'model',
          parts: [{ text: 'I understand. I\'m here to help users with prop firm information and guide them through the platform.' }],
        },
        ...history.map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        })),
      ],
    })

    const result = await chat.sendMessage(message)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ response: text })
  } catch (error: any) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process chat request' },
      { status: 500 }
    )
  }
}
