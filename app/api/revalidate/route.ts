import { createHmac, timingSafeEqual } from 'node:crypto'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json(
      { error: 'Server misconfiguration: REVALIDATE_SECRET missing' },
      { status: 500 },
    )
  }

  const signatureHeader = request.headers.get('x-signature')
  if (!signatureHeader) {
    return NextResponse.json(
      { error: 'Missing X-Signature header' },
      { status: 401 },
    )
  }

  const rawBody = await request.text()
  const expectedSignature = createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex')

  const receivedSigBuffer = Buffer.from(signatureHeader, 'hex')
  const expectedSigBuffer = Buffer.from(expectedSignature, 'hex')

  if (
    receivedSigBuffer.length !== expectedSigBuffer.length ||
    !timingSafeEqual(receivedSigBuffer, expectedSigBuffer)
  ) {
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 401 },
    )
  }

  let body: unknown
  try {
    body = JSON.parse(rawBody)
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 },
    )
  }

  if (
    typeof body !== 'object' ||
    body === null ||
    !('tags' in body) ||
    !Array.isArray((body as { tags: unknown }).tags)
  ) {
    return NextResponse.json(
      { error: 'Body must contain tags array' },
      { status: 400 },
    )
  }

  const tags = (body as { tags: unknown[] }).tags
  if (tags.length === 0 || tags.length > 50) {
    return NextResponse.json(
      { error: 'Tags array must contain between 1 and 50 tags' },
      { status: 400 },
    )
  }

  for (const tag of tags) {
    if (typeof tag !== 'string' || tag.length === 0 || tag.length > 256) {
      return NextResponse.json(
        { error: 'Each tag must be a string up to 256 characters' },
        { status: 400 },
      )
    }
  }

  for (const tag of tags as string[]) {
    revalidateTag(tag, 'max')
  }

  return new NextResponse(null, { status: 204 })
}
