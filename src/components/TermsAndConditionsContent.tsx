// src/components/TermsAndConditionsContent.tsx

// Reusable heading for consistency within the document
const TermHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold font-display text-primary mt-12 mb-4">{children}</h2>
);

export function TermsAndConditionsContent() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-dark/60">Effective Date: September 15, 2025</p>

          <p>
            This agreement is entered into by and between Indivio (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;) and you, the user (&quot;Client&quot;, &quot;you&quot;). By accessing our website and using our services, you agree to be bound by these Terms and Conditions.
          </p>

          <TermHeading>1. Scope of Services</TermHeading>
          <p>Indivio provides website development, a content management dashboard, and hosting services as outlined in our plans. This includes a one-time setup and design for the first year, followed by an optional annual renewal for hosting and maintenance.</p>

          <TermHeading>2. Fees and Payments</TermHeading>
          <p>All prices are listed in Indian Rupees (INR) and are exclusive of applicable taxes like GST. Payment for the first year plan is due in full before the project commences. Annual renewal fees must be paid before the expiry of the current term to ensure continuous service.</p>

          <TermHeading>3. Refund Policy</TermHeading>
          <p>Due to the digital nature of our services and the significant resources allocated at the start of a project, all fees paid to Indivio are non-refundable.</p>
          
          <TermHeading>4. Client Obligations</TermHeading>
          <ul>
            <li>The Client is responsible for providing all necessary website content (text, images, logos) in a timely manner.</li>
            <li>The Client warrants that they own or have the necessary rights to all content they provide and that it does not infringe on any third-party intellectual property rights.</li>
            <li>The Client agrees not to use the service for any illegal, malicious, or unauthorized purposes.</li>
          </ul>

          <TermHeading>5. Intellectual Property</TermHeading>
          <p>Indivio retains ownership of all underlying source code, design templates, and platform structure. The Client retains full ownership of their proprietary content, including their logo, school-specific text, and images.</p>

          <TermHeading>6. Domain Names and Hosting</TermHeading>
          <p>Plans may include a free indivio.in subdomain. For custom domains (e.g., www.yourschool.com), the Client is responsible for the registration and annual renewal costs. Hosting is included for the first year and requires an annual renewal fee thereafter to keep the website live.</p>

          <TermHeading>7. Data Privacy and Security</TermHeading>
          <p>Our practices regarding data are governed by our Privacy Policy, which is available on our website. We are committed to protecting your data using industry-standard measures built on Google Cloud and Firebase.</p>

          <TermHeading>8. Limitation of Liability</TermHeading>
          <p>Indivio shall not be liable for any indirect, incidental, or consequential damages or service interruptions caused by third-party providers (e.g., hosting partners, domain registrars). Our total liability in any matter arising out of or related to this agreement is limited to the amount paid by the Client in the preceding 12 months.</p>

          <TermHeading>9. Term and Termination</TermHeading>
          <p>This agreement begins upon receipt of the first payment. We reserve the right to terminate services if the Client breaches these terms or fails to renew their annual plan.</p>
          
          <TermHeading>10. Governing Law and Jurisdiction</TermHeading>
          <p>This agreement shall be governed by the laws of India. Any disputes arising from this agreement will be subject to the exclusive jurisdiction of the courts in New Delhi, Delhi.</p>

          <TermHeading>11. Amendments to Terms</TermHeading>
          <p>We reserve the right to modify these terms at any time. We will notify clients of any significant changes. Continued use of our service after such changes constitutes acceptance of the new terms.</p>

          <TermHeading>12. Contact Information</TermHeading>
          <p>For any questions regarding these Terms and Conditions, please contact us at:</p>
          <a href="mailto:legal@indivio.in" className="text-primary font-semibold hover:underline">legal@indivio.in</a>
        </div>
      </div>
    </section>
  );
}