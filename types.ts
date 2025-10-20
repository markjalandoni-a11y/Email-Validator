
export type ValidationStatus = 'valid' | 'invalid' | 'risky';

export interface EmailValidationResult {
  email: string;
  status: ValidationStatus;
  reason: string;
  syntax_correct: boolean;
  domain_exists: boolean;
  disposable: boolean;
}
