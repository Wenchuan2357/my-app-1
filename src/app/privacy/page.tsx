'use client';

import Link from 'next/link';
import { getUser, logout, type User } from '@/lib/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PrivacyPolicy() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Only check user state, don't redirect - allow public access
  const currentUser = getUser();
  if (currentUser) {
    setUser(currentUser);
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout API call failed:', error);
    }

    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          {user && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Logout
            </button>
          )}
          {!user && (
            <Link
              href="/register"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Register
            </Link>
          )}
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: March 17, 2026
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to our Todo application ("the App"). This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Personal Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you register for an account, we collect the following personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Username (your chosen identifier)</li>
                <li>Password (stored securely using industry-standard encryption)</li>
                <li>Account creation timestamp</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 Usage Data</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We automatically collect certain information about your device and usage patterns:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Todo items you create, modify, or delete</li>
                <li>Completion status of your tasks</li>
                <li>Timestamps for task creation and updates</li>
                <li>Session information stored in your browser's session storage</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">2.3 Technical Data</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may collect basic technical information such as:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Browser type and version</li>
                <li>Device type and operating system</li>
                <li>IP address (for security purposes only)</li>
                <li>App performance metrics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Service Provision:</strong> To provide, maintain, and improve our Todo application</li>
                <li><strong>Authentication:</strong> To verify your identity and manage secure access to your account</li>
                <li><strong>Personalization:</strong> To customize your experience based on your usage patterns</li>
                <li><strong>Communication:</strong> To send important updates about your account and service changes</li>
                <li><strong>Security:</strong> To detect, prevent, and respond to security incidents and unauthorized access</li>
                <li><strong>Compliance:</strong> To comply with legal obligations and resolve disputes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Encryption:</strong> Passwords are hashed using bcrypt with salt rounds for maximum security</li>
                <li><strong>Secure Storage:</strong> All data is stored in encrypted databases with restricted access</li>
                <li><strong>Session Management:</strong> User sessions are managed securely using browser session storage</li>
                <li><strong>Access Controls:</strong> Strict role-based access controls limit who can view or modify your data</li>
                <li><strong>Regular Audits:</strong> We conduct regular security assessments and vulnerability testing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Sharing and Disclosure</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
              </p>

              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Service Providers:</strong> We may share data with trusted third-party services that help us operate our application (database providers, hosting services)</li>
                <li><strong>Legal Requirements:</strong> We may disclose information when required by law or legal process</li>
                <li><strong>Protection of Rights:</strong> We may share information to protect our rights, property, or safety</li>
                <li><strong>Business Transfers:</strong> In the event of a merger or acquisition, user data may be transferred as part of the transaction</li>
              </ul>

              <p className="text-gray-700 leading-relaxed">
                We ensure all third-party service providers sign appropriate confidentiality agreements and implement equivalent security measures.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights and Choices</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>

              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
                <li><strong>Portability:</strong> Export your data in a structured format</li>
                <li><strong>Objection:</strong> Object to certain processing activities</li>
              </ul>

              <p className="text-gray-700 leading-relaxed">
                To exercise these rights, please contact us through the methods provided below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies and Tracking Technologies</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Our application uses minimal tracking technologies:
              </p>

              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Session Storage:</strong> Used to maintain your login state and preferences</li>
                <li><strong>Essential Cookies:</strong> Required for basic application functionality</li>
                <li><strong>Analytics:</strong> Anonymous usage statistics to improve our service</li>
              </ul>

              <p className="text-gray-700 leading-relaxed">
                You can disable cookies in your browser settings, but this may affect application functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. International Data Transfers</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data during international transfers, including standard contractual clauses and privacy shield frameworks where applicable.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of the service after such changes constitutes acceptance of the revised policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> privacy@todoapp.com</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105</p>
                <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </section>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}