
import React, { useState } from 'react';
import { validateBulkEmails } from '../services/geminiService';
import { EmailValidationResult, ValidationStatus } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { XCircleIcon } from './icons/XCircleIcon';

const BulkEmailValidator: React.FC = () => {
  const [emails, setEmails] = useState('');
  const [results, setResults] = useState<EmailValidationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailList = emails.split('\n').map(e => e.trim()).filter(Boolean);
    
    if (emailList.length === 0) {
      setError('Please enter at least one email address.');
      return;
    }

    if (emailList.length > 50) {
        setError('Please enter up to 50 emails for bulk validation.');
        return;
    }

    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const validationResults = await validateBulkEmails(emailList);
      setResults(validationResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const StatusIcon: React.FC<{ status: ValidationStatus }> = ({ status }) => {
    switch (status) {
      case 'valid':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case 'invalid':
        return <XCircleIcon className="h-6 w-6 text-red-500" />;
      case 'risky':
        return <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full mx-auto">
      <form onSubmit={handleSubmit}>
        <label htmlFor="bulk-emails" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Addresses (one per line)
        </label>
        <textarea
          id="bulk-emails"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          placeholder="user1@example.com&#10;user2@test.co&#10;user3@domain.org"
          rows={8}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors"
          disabled={isLoading}
        >
          {isLoading ? <SpinnerIcon /> : 'Validate List'}
        </button>
      </form>

      {error && <div className="mt-4 text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">{error}</div>}

      {results.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Validation Results</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Reason</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {results.map((result, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap"><StatusIcon status={result.status} /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{result.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{result.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkEmailValidator;
