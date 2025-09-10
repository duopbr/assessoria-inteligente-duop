// Security utilities for the application

/**
 * Simple rate limiting utility for form submissions
 * Tracks submission attempts by IP or session
 */
class RateLimiter {
  private attempts: Map<string, { count: number; lastAttempt: number }> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) { // 15 minutes
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(identifier);

    if (!record) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return true;
    }

    // Reset if window has passed
    if (now - record.lastAttempt > this.windowMs) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return true;
    }

    // Check if within rate limit
    if (record.count >= this.maxAttempts) {
      return false;
    }

    // Increment count
    record.count++;
    record.lastAttempt = now;
    return true;
  }

  getRemainingAttempts(identifier: string): number {
    const record = this.attempts.get(identifier);
    if (!record) return this.maxAttempts;
    
    const now = Date.now();
    if (now - record.lastAttempt > this.windowMs) {
      return this.maxAttempts;
    }
    
    return Math.max(0, this.maxAttempts - record.count);
  }

  getTimeUntilReset(identifier: string): number {
    const record = this.attempts.get(identifier);
    if (!record) return 0;
    
    const now = Date.now();
    const timeElapsed = now - record.lastAttempt;
    return Math.max(0, this.windowMs - timeElapsed);
  }
}

// Global rate limiter instance
export const formRateLimiter = new RateLimiter(3, 10 * 60 * 1000); // 3 attempts per 10 minutes

/**
 * Generate a simple identifier for rate limiting
 * In a real application, you might use IP address or user session
 */
export function getRateLimitIdentifier(): string {
  // For now, use a simple browser fingerprint based on user agent and screen resolution
  const fingerprint = `${navigator.userAgent}_${screen.width}x${screen.height}`;
  // Create a simple hash of the fingerprint
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
}

/**
 * Validate phone number format
 */
export function validatePhoneNumber(phone: string): boolean {
  const digitsOnly = phone.replace(/\D/g, "");
  
  // Accept 11 digits (national format: area code + number)
  if (digitsOnly.length === 11 && /^[1-9]\d{10}$/.test(digitsOnly)) {
    return true;
  }
  
  // Accept 13 digits (international format: 55 + area code + number)
  if (digitsOnly.length === 13 && /^55[1-9]\d{10}$/.test(digitsOnly)) {
    return true;
  }
  
  return false;
}

/**
 * Validate name input
 */
export function validateName(name: string): { isValid: boolean; error?: string } {
  const trimmed = name.trim();
  
  if (!trimmed) {
    return { isValid: false, error: "Nome é obrigatório" };
  }
  
  if (trimmed.length < 2) {
    return { isValid: false, error: "Nome deve ter pelo menos 2 caracteres" };
  }
  
  if (trimmed.length > 100) {
    return { isValid: false, error: "Nome deve ter no máximo 100 caracteres" };
  }
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+=/i,
    /[<>'"]/
  ];
  
  if (suspiciousPatterns.some(pattern => pattern.test(trimmed))) {
    return { isValid: false, error: "Nome contém caracteres inválidos" };
  }
  
  return { isValid: true };
}