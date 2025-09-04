import crypto from 'crypto'

function base64url(input: Buffer | string) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input)
  return buf.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

export function createAdminSessionToken(expSecondsFromNow = 60 * 60 * 24 * 30) {
  const secret = process.env.ADMIN_SESSION_SECRET || ''
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is required')
  const payload = { typ: 'admin', exp: Math.floor(Date.now() / 1000) + expSecondsFromNow }
  const payloadB64 = base64url(JSON.stringify(payload))
  const sig = crypto.createHmac('sha256', secret).update(payloadB64).digest()
  const sigB64 = base64url(sig)
  return `${payloadB64}.${sigB64}`
}

export function verifyAdminSessionToken(token: string): boolean {
  try {
    const secret = process.env.ADMIN_SESSION_SECRET || ''
    if (!secret) return false
    const [payloadB64, sigB64] = token.split('.')
    if (!payloadB64 || !sigB64) return false
    const expectedSig = crypto.createHmac('sha256', secret).update(payloadB64).digest()
    const expectedSigB64 = base64url(expectedSig)
    if (sigB64 !== expectedSigB64) return false
    const json = JSON.parse(Buffer.from(payloadB64.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'))
    if (!json || json.typ !== 'admin') return false
    if (typeof json.exp !== 'number') return false
    if (json.exp < Math.floor(Date.now() / 1000)) return false
    return true
  } catch {
    return false
  }
} 