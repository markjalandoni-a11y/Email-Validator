
import React, { useState } from 'react';
import { validateSingleEmail } from '../services/geminiService';
import { EmailValidationResult } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { XCircleIcon } from './icons/XCircleIcon';

const EmailValidator: React.FC = () => {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<EmailValidationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter an email address.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const validationResult = await validateSingleEmail(email);
      setResult(validationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const ResultDisplay: React.FC<{ result: EmailValidationResult }> = ({ result }) => {
    const getStatusInfo = () => {
      switch (result.status) {
        case 'valid':
          return {
            icon: <CheckCircleIcon className="h-12 w-12 text-green-500" />,
            bgColor: 'bg-green-50 dark:bg-green-900/20',
            borderColor: 'border-green-500',
            textColor: 'text-green-700 dark:text-green-300',
            title: 'Email is Valid',
          };
        case 'invalid':
          return {
            icon: <XCircleIcon className="h-12 w-12 text-red-500" />,
            bgColor: 'bg-red-50 dark:bg-red-900/20',
            borderColor: 'border-red-500',
            textColor: 'text-red-700 dark:text-red-300',
            title: 'Email is Invalid',
          };
        case 'risky':
          return {
            icon: <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500" />,
            bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
            borderColor: 'border-yellow-500',
            textColor: 'text-yellow-700 dark:text-yellow-300',
            title: 'Email is Risky',
          };
      }
    };

    const { icon, bgColor, borderColor, textColor, title } = getStatusInfo();

    const DetailItem: React.FC<{ label: string; value: boolean }> = ({ label, value }) => (
      <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
        <span className="text-gray-600 dark:text-gray-300">{label}</span>
        {value ? (
          <CheckCircleIcon className="h-5 w-5 text-green-500" />
        ) : (
          <XCircleIcon className="h-5 w-5 text-red-500" />
        )}
      </div>
    );

    return (
      <div className={`mt-6 p-6 rounded-lg border ${bgColor} ${borderColor} transition-all duration-300 ease-in-out`}>
        <div className="flex items-center gap-4">
          {icon}
          <div>
            <h3 className={`text-xl font-bold ${textColor}`}>{title}</h3>
            <p className="text-gray-700 dark:text-gray-200 font-semibold">{result.email}</p>
          </div>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">{result.reason}</p>
        <div className="mt-4 space-y-2 text-sm">
          <DetailItem label="Correct Syntax" value={result.syntax_correct} />
          <DetailItem label="Domain Exists" value={result.domain_exists} />
          <DetailItem label="Disposable Email" value={!result.disposable} />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full mx-auto">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Address
        </label>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@domain.com"
            className="flex-grow w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors"
            disabled={isLoading}
          >
            {isLoading ? <SpinnerIcon /> : 'Validate'}
          </button>
        </div>
      </form>

      {error && <div className="mt-4 text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">{error}</div>}
      {result && <ResultDisplay result={result} />}
    </div>
  );
};

export default EmailValidator;
