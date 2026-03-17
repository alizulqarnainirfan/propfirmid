// Admin form validation helpers
export interface ValidationError {
  field: string
  message: string
}

export function validateBlogForm(data: any): ValidationError[] {
  const errors: ValidationError[] = []

  if (!data.title?.trim()) {
    errors.push({ field: 'title', message: 'Title is required' })
  }

  if (!data.content?.trim()) {
    errors.push({ field: 'content', message: 'Content is required' })
  }

  if (data.coverImage && !isValidUrl(data.coverImage)) {
    errors.push({ field: 'coverImage', message: 'Cover image must be a valid URL' })
  }

  return errors
}

export function validateFirmForm(data: any): ValidationError[] {
  const errors: ValidationError[] = []

  if (!data.name?.trim()) {
    errors.push({ field: 'name', message: 'Firm name is required' })
  }

  if (!data.logo?.trim()) {
    errors.push({ field: 'logo', message: 'Logo URL is required' })
  }

  if (data.logo && !isValidUrl(data.logo)) {
    errors.push({ field: 'logo', message: 'Logo must be a valid URL' })
  }

  if (data.rating && (isNaN(data.rating) || data.rating < 0 || data.rating > 5)) {
    errors.push({ field: 'rating', message: 'Rating must be between 0 and 5' })
  }

  if (data.price && (isNaN(data.price) || data.price < 0)) {
    errors.push({ field: 'price', message: 'Price must be a positive number' })
  }

  if (data.discounted && (isNaN(data.discounted) || data.discounted < 0)) {
    errors.push({ field: 'discounted', message: 'Discounted price must be a positive number' })
  }

  return errors
}

export function validateChallengeForm(data: any): ValidationError[] {
  const errors: ValidationError[] = []

  if (!data.firmId?.trim()) {
    errors.push({ field: 'firmId', message: 'Firm selection is required' })
  }

  if (!data.accountSize?.trim()) {
    errors.push({ field: 'accountSize', message: 'Account size is required' })
  }

  if (!data.price || isNaN(data.price) || data.price <= 0) {
    errors.push({ field: 'price', message: 'Price must be a positive number' })
  }

  if (data.discountedPrice && (isNaN(data.discountedPrice) || data.discountedPrice < 0)) {
    errors.push({ field: 'discountedPrice', message: 'Discounted price must be a positive number' })
  }

  if (data.minDays && (isNaN(data.minDays) || data.minDays < 0)) {
    errors.push({ field: 'minDays', message: 'Min days must be a positive number' })
  }

  if (data.maxDays && (isNaN(data.maxDays) || data.maxDays < 0)) {
    errors.push({ field: 'maxDays', message: 'Max days must be a positive number' })
  }

  if (data.minDays && data.maxDays && parseInt(data.minDays) > parseInt(data.maxDays)) {
    errors.push({ field: 'maxDays', message: 'Max days must be greater than min days' })
  }

  return errors
}

export function validateGiveawayForm(data: any): ValidationError[] {
  const errors: ValidationError[] = []

  if (!data.title?.trim()) {
    errors.push({ field: 'title', message: 'Title is required' })
  }

  if (!data.description?.trim()) {
    errors.push({ field: 'description', message: 'Description is required' })
  }

  if (!data.prize?.trim()) {
    errors.push({ field: 'prize', message: 'Prize is required' })
  }

  if (!data.endDate) {
    errors.push({ field: 'endDate', message: 'End date is required' })
  } else {
    const endDate = new Date(data.endDate)
    const now = new Date()
    if (endDate <= now) {
      errors.push({ field: 'endDate', message: 'End date must be in the future' })
    }
  }

  return errors
}

function isValidUrl(string: string): boolean {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

export function formatValidationErrors(errors: ValidationError[]): string {
  return errors.map(error => `${error.field}: ${error.message}`).join('\n')
}