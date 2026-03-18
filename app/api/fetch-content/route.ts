import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    const baseUrl = new URL(url).origin
    
    // Clean up the content first
    let content = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
      .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
      .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
      .replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '')

    // Try to extract main content with multiple patterns
    const contentPatterns = [
      /<main[^>]*>([\s\S]*?)<\/main>/i,
      /<article[^>]*>([\s\S]*?)<\/article>/i,
      /<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
      /<div[^>]*class="[^"]*post[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
      /<div[^>]*id="content"[^>]*>([\s\S]*?)<\/div>/i,
      /<div[^>]*id="main"[^>]*>([\s\S]*?)<\/div>/i,
      /<div[^>]*class="[^"]*entry[^"]*"[^>]*>([\s\S]*?)<\/div>/i
    ]

    for (const pattern of contentPatterns) {
      const match = content.match(pattern)
      if (match && match[1].trim().length > 500) { // Ensure we have substantial content
        content = match[1]
        break
      }
    }

    // Fix image URLs - convert relative URLs to absolute URLs
    content = content.replace(/<img([^>]*?)src=["']([^"']+)["']([^>]*?)>/gi, (match, before, src, after) => {
      let fixedSrc = src
      
      // Handle relative URLs
      if (src.startsWith('/')) {
        fixedSrc = baseUrl + src
      } else if (!src.startsWith('http')) {
        fixedSrc = baseUrl + '/' + src
      }
      
      // Add error handling and styling
      return `<img${before}src="${fixedSrc}"${after} onerror="this.style.display='none'" style="max-width: 100%; height: auto; margin: 1rem 0;">`
    })

    // Remove ALL external links to prevent redirects to other sites
    content = content
      // Remove all anchor tags with external links
      .replace(/<a[^>]*href=["'][^"']*thetrustedprop[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, '')
      .replace(/<a[^>]*href=["']https?:\/\/[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, '')
      .replace(/<a[^>]*href=["']\/\/[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, '')
      // Remove relative links that might redirect to external site
      .replace(/<a[^>]*href=["']\/[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, '')
      // Remove any remaining anchor tags but keep the text content
      .replace(/<a[^>]*>([\s\S]*?)<\/a>/gi, '$1')

    // Remove problematic inline styles that might cause white/light text
    content = content
      .replace(/style=["'][^"']*color:\s*(?:white|#fff|#ffffff|rgba?\(255,\s*255,\s*255[^)]*\)|#[fF]{3,6})[^"']*["']/gi, '')
      .replace(/style=["'][^"']*color:\s*(?:#[cC-fF]{3}|#[cC-fF]{6}|rgba?\(2[0-4][0-9]|25[0-5])[^"']*["']/gi, '')
      .replace(/class=["'][^"']*(?:text-white|text-light|text-gray-100|text-gray-200)[^"']*["']/gi, '')

    // Remove empty FAQ sections and other unwanted content
    content = content
      // Remove empty FAQ sections (just heading with no content)
      .replace(/<h[1-6][^>]*>\s*FAQs?\s*<\/h[1-6]>\s*(?=<h[1-6]|$)/gi, '')
      .replace(/<h[1-6][^>]*>\s*Frequently\s+Asked\s+Questions?\s*<\/h[1-6]>\s*(?=<h[1-6]|$)/gi, '')
      .replace(/<div[^>]*class="[^"]*faq[^"]*"[^>]*>\s*<\/div>/gi, '')
      .replace(/<section[^>]*class="[^"]*faq[^"]*"[^>]*>\s*<\/section>/gi, '')
      // Remove empty sections that might contain only FAQ headings
      .replace(/<div[^>]*>\s*<h[1-6][^>]*>\s*FAQs?\s*<\/h[1-6]>\s*<\/div>/gi, '')
      .replace(/<section[^>]*>\s*<h[1-6][^>]*>\s*FAQs?\s*<\/h[1-6]>\s*<\/section>/gi, '')

    // Clean up and format content
    content = content
      // Remove empty paragraphs and divs
      .replace(/<p[^>]*>\s*<\/p>/gi, '')
      .replace(/<div[^>]*>\s*<\/div>/gi, '')
      // Fix spacing around headings
      .replace(/(<\/h[1-6]>)/gi, '$1\n\n')
      .replace(/(<h[1-6][^>]*>)/gi, '\n\n$1')
      // Fix paragraph spacing
      .replace(/(<\/p>)/gi, '$1\n')
      .replace(/(<p[^>]*>)/gi, '\n$1')
      // Clean up excessive whitespace but preserve structure
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .replace(/>\s+</g, '><')
      .trim()

    // Remove any remaining problematic elements
    content = content
      .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
      .replace(/<form[^>]*>[\s\S]*?<\/form>/gi, '')
      .replace(/<input[^>]*>/gi, '')
      .replace(/<button[^>]*>[\s\S]*?<\/button>/gi, '')
      // Remove comment sections and review forms
      .replace(/<div[^>]*class="[^"]*comment[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
      .replace(/<div[^>]*class="[^"]*review-form[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
      .replace(/<div[^>]*class="[^"]*write-review[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
      .replace(/<section[^>]*class="[^"]*comment[^"]*"[^>]*>[\s\S]*?<\/section>/gi, '')
      // Remove any call-to-action sections that might link externally
      .replace(/<div[^>]*class="[^"]*cta[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
      .replace(/<div[^>]*class="[^"]*call-to-action[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}