'use client';

import Link from 'next/link';
import { getUser, logout, type User } from '@/lib/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TermsOfService() {
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
          <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Welcome to Todo App</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service ("Terms") govern your use of our Todo application ("the App"),
                operated by Todo App Inc. By accessing or using our service, you agree to be bound by these Terms.
                If you disagree with any part of the terms, then you may not access the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Our Todo application provides a simple and secure way to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Create and manage personal todo lists</li>
                <li>Track task completion status</li>
                <li>Organize tasks with titles and descriptions</li>
                <li>Access your data across devices</li>
                <li>Collaborate with team members (in future versions)</li>
              </ul>

              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify or discontinue the service at any time without notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Account Registration and Security</h2>

              <h3 className="text-xl font-medium text-gray-800 mb-3">3.1 Account Creation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To use certain features of our service, you must create an account by providing:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>A unique username</li>
                <li>A password meeting our security requirements</li>
                <li>Your agreement to these Terms of Service</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">3.2 Account Security</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use of your account</li>
              </ul>

              <p className="text-gray-700 leading-relaxed">
                We implement industry-standard security measures including password hashing and encrypted data transmission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Acceptable Use Policy</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                You agree to use our service only for lawful purposes and in accordance with these Terms. Specifically, you agree not to:
              </p>

              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Use the service for any illegal or unauthorized purpose</li>
                <li>Infringe upon any intellectual property rights</li>
                <li>Transmit viruses, malware, or harmful code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Collect personal information about other users without consent</li>
                <li>Use automated systems to scrape or harvest user data</li>
                <li>Reverse engineer, decompile, or disassemble our software</li>
                <li>Create multiple accounts for fraudulent purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Content Ownership and Rights</h2>

              <h3 className="text-xl font-medium text-gray-800 mb-3">5.1 Your Content</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You retain all ownership rights to the content you create within our service, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Todo item titles and descriptions</li>
                <li>Task organization and categorization</li>
                <li>Custom labels and tags</li>
                <li>Personal notes and attachments</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">5.2 License Grant</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                By creating content in our service, you grant us a worldwide, non-exclusive, royalty-free license to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Store and backup your content</li>
                <li>Display your content through our interfaces</li>
                <li>Process your content to provide our services</li>
                <li>Improve and develop new features based on anonymized usage patterns</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">5.3 Prohibited Content</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may not upload or share content that:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Contains illegal, offensive, or harmful material</li>
                <li>Infringes upon third-party rights</li>
                <li>Promotes violence, discrimination, or hate speech</li>
                <li>Contains spam or unsolicited commercial content</li>
                <li>Includes personally identifiable information of others</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Privacy and Data Protection</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy,
                which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices.
              </p>

              <p className="text-gray-700 leading-relaxed">
                We are committed to protecting your personal data and will not sell or rent your information to third parties for marketing purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Service Availability and Modifications</h2>

              <h3 className="text-xl font-medium text-gray-800 mb-3">7.1 Service Hours</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We strive to maintain high availability but cannot guarantee uninterrupted service.
                Scheduled maintenance will be performed during off-peak hours with advance notice.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">7.2 Service Changes</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may modify or discontinue features of our service at any time, with or without notice.
                Major changes to our service will be communicated through email or in-app notifications.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">7.3 No Warranties</h3>
              <p className="text-gray-700 leading-relaxed">
                Our service is provided "as is" without warranties of any kind, either express or implied.
                We do not guarantee that our service will be error-free or uninterrupted.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                To the maximum extent permitted by applicable law, in no event shall Todo App Inc.,
                its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect,
                incidental, special, consequential, or punitive damages, including without limitation, loss of profits,
                data, use, goodwill, or other intangible losses.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Our total liability to you for all claims arising out of or relating to these Terms or our service
                shall not exceed the amount you paid us in the past twelve months, or $0 if you have not paid us anything.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Indemnification</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                You agree to indemnify and hold harmless Todo App Inc. and its subsidiaries, officers, directors,
                employees, and agents from any claim or demand made by any third party due to or arising out of:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Your use of the service</li>
                <li>Violation of these Terms</li>
                <li>Violation of any rights of another person or entity</li>
                <li>Content posted or transmitted by you</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Termination</h2>

              <h3 className="text-xl font-medium text-gray-800 mb-3">10.1 Account Termination</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may terminate your account at any time by contacting us or using the account deletion feature.
                Upon termination, your right to use the service will cease immediately.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">10.2 Service Termination</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may terminate or suspend your account and bar access to the service immediately,
                without prior notice or liability, under our sole discretion, for any reason whatsoever.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">10.3 Survival</h3>
              <p className="text-gray-700 leading-relaxed">
                Sections which by their nature should survive termination shall survive, including ownership provisions,
                warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Governing Law and Dispute Resolution</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of California, United States,
                without regard to conflict of law principles.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Any dispute arising out of or relating to these Terms shall be resolved through binding arbitration
                in San Francisco County, California, under the rules of the American Arbitration Association.
              </p>

              <p className="text-gray-700 leading-relaxed">
                You waive the right to participate in a class action lawsuit or class-wide arbitration.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to Terms</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                We may modify these Terms at any time. If we make material changes, we will notify you by email
                or through prominent notices on our website.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Your continued use of the service after such modifications constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> legal@todoapp.com</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105</p>
                <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p className="text-gray-700"><strong>Legal Representative:</strong> John Doe, CEO</p>
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