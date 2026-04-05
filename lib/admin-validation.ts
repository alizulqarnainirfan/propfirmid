// Admin form validation helpers - All validations removed per user request
export interface ValidationError {
  field: string
  message: string
}

export function validateBlogForm(data: any): ValidationError[] {
  // All validations removed - return empty array
  return []
}

export function validateFirmForm(data: any): ValidationError[] {
  // All validations removed - return empty array
  return []
}

export function validateChallengeForm(data: any): ValidationError[] {
  // All validations removed - return empty array
  return []
}

export function validateGiveawayForm(data: any): ValidationError[] {
  // All validations removed - return empty array
  return []
}

function isValidUrl(string: string): boolean {
  // Always return true - no URL validation
  return true
}

export function formatValidationErrors(errors: ValidationError[]): string {
  return errors.map(error => `${error.field}: ${error.message}`).join('\n')
}