// src/components/PrivacyPolicyContent.tsx

// A styled heading component for use within the policy text
const PolicyHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold font-display text-primary mt-12 mb-4">{children}</h2>
);

export function PrivacyPolicyContent() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Main Content Area */}
        <div className="prose prose-lg max-w-none">
          <p className="text-sm text-dark/60">Last Updated: September 15, 2025</p>
          <p className="lead">
            Welcome to Indivio. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Your privacy and security are our top priorities.
          </p>

          <div className="my-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800">
            <strong>Disclaimer:</strong> This is a template and not legal advice. You should consult with a legal professional to ensure your policy is fully compliant with all applicable laws and regulations.
          </div>

          <PolicyHeading>1. Information We Collect</PolicyHeading>
          <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
          <ul>
            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, school name, email address, and telephone number, that you voluntarily give to us when you fill out a contact form or register for our services.</li>
            <li><strong>Non-Personal Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, and your usage data.</li>
          </ul>

          <PolicyHeading>2. How We Use Your Information</PolicyHeading>
          <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
          <ul>
            <li>Create and manage your account.</li>
            <li>Email you regarding your account or order.</li>
            <li>Process payments and refunds.</li>
            <li>Communicate with you about our services and provide support.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
          </ul>

          <PolicyHeading>3. Data Sharing and Disclosure</PolicyHeading>
          <p>We do not sell, trade, or rent your Personal Data to others. We may share information with third parties that perform services for us or on our behalf, including cloud hosting (Google Cloud & Firebase), payment processing, and data analysis.</p>

          <PolicyHeading>4. Data Security</PolicyHeading>
          <p>We use administrative, technical, and physical security measures to help protect your personal information. Our platform is built on Google&apos;s trusted cloud infrastructure, and we implement industry-standard security measures to protect your data.</p>
          
          <PolicyHeading>5. Your Data Rights</PolicyHeading>
          <p>In accordance with Indian law, you have the right to access, correct, or request the deletion of your personal data. To make such a request, please contact us using the contact information provided below.</p>

          <PolicyHeading>6. Cookies Policy</PolicyHeading>
          <p>We may use cookies and other tracking technologies on the Site to help customize the Site and improve your experience. A &apos;cookie&apos; is a string of information which assigns you a unique identifier that we store on your computer.</p>
          
          <PolicyHeading>7. Changes to This Policy</PolicyHeading>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by updating the &apos;Last Updated&apos; date of this Privacy Policy.</p>

          <PolicyHeading>8. Contact Us</PolicyHeading>
          <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
          <a href="mailto:privacy@indivio.in" className="text-primary font-semibold hover:underline">privacy@indivio.in</a>
        </div>
      </div>
    </section>
  );
}