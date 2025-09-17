import { defineEventHandler, getQuery } from 'h3'
import { fetchTranscript } from 'youtube-transcript-plus'

function extractVideoId(input: string): string | null {
  if (!input) return null
  if (input.length === 11) return input
  try {
    const url = new URL(input)
    if (url.hostname.includes('youtube.com')) return url.searchParams.get('v')
    if (url.hostname === 'youtu.be') return url.pathname.slice(1)
  } catch {
    return null
  }
  return null
}

function decodeHtmlEntities(str: string) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const videoIdParam = query.videoId as string | undefined
  const videoId = extractVideoId(videoIdParam ?? '')

  if (!videoId) return { success: false, error: 'Invalid video ID' }

  try {
    const transcriptSegments = await fetchTranscript(videoId, { lang: 'en' })
    if (!transcriptSegments || transcriptSegments.length === 0)
      return { success: false, error: 'Transcript is empty or unavailable' }

    const transcriptText = transcriptSegments
      .map(seg => {
        const minutes = Math.floor(seg.offset / 60)
        const seconds = Math.floor(seg.offset % 60)
        const timestamp = `[${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}]`
        return `${timestamp} ${decodeHtmlEntities(seg.text)}`
      })
      .join('\n')

    return { success: true, transcript: transcriptText }
  } catch (err: any) {
    console.error('[Server] fetchTranscript error:', err)
    return { success: false, error: err.message ?? 'Unknown error' }
  }
})
