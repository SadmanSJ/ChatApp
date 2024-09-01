import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions - ChatApp",
  description: "Terms and Conditions for ChatApp",
};

const TermsOfService = () => {
  return (
    <div className="container mx-auto p-4 overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
      <p className="mb-4">Effective Date: {"September 1, 2024"}</p>

      <h2 className="text-xl font-semibold mt-4">1. Introduction</h2>
      <p className="mb-4">
        Welcome to ChatApp. By using ChatApp, you agree to these Terms and
        Conditions. If you do not agree with these terms, please do not use the
        app.
      </p>

      <h2 className="text-xl font-semibold mt-4">2. Purpose</h2>
      <p className="mb-4">
        ChatApp is a demo application created for work demonstration and
        personal use. It allows users to log in with Google and chat with other
        users registered with Gmail.
      </p>

      <h2 className="text-xl font-semibold mt-4">3. User Registration</h2>
      <p className="mb-4">
        To use ChatApp, you must register by logging in with Google. We collect
        and store the following information: email address, name, phone number
        (if provided), and profile image.
      </p>

      <h2 className="text-xl font-semibold mt-4">4. Data Handling</h2>
      <p className="mb-4">
        ChatApp stores messages as they are sent and does not use encryption.
        This is a demo app, and data is retained for demonstration purposes.
      </p>

      <h2 className="text-xl font-semibold mt-4">5. User Conduct</h2>
      <p className="mb-4">
        There are no specific restrictions on user behavior within the app.
        Users are free to send messages and content as they wish.
      </p>

      <h2 className="text-xl font-semibold mt-4">6. Content Ownership</h2>
      <p className="mb-4">
        Users retain ownership of all messages and content sent through ChatApp.
        ChatApp does not claim any rights over user-generated content.
      </p>

      <h2 className="text-xl font-semibold mt-4">
        7. Payment and Subscriptions
      </h2>
      <p className="mb-4">
        ChatApp is completely free to use. There are no paid features or
        subscription plans.
      </p>

      <h2 className="text-xl font-semibold mt-4">8. Third-Party Services</h2>
      <p className="mb-4">
        ChatApp uses Google for user authentication but does not integrate with
        any other third-party services or content beyond this.
      </p>

      <h2 className="text-xl font-semibold mt-4">
        9. Liabilities and Warranties
      </h2>
      <p className="mb-4">
        {`     ChatApp is provided "as-is" without any warranties of any kind. We do
        not take any responsibility for issues such as downtime, data loss, or
        misuse of the app.`}
      </p>

      <h2 className="text-xl font-semibold mt-4">10. Governing Law</h2>
      <p className="mb-4">
        These Terms and Conditions are governed by and construed in accordance
        with the laws of Bangladesh.
      </p>

      <h2 className="text-xl font-semibold mt-4">11. Contact Information</h2>
      <p className="mb-4">
        For any questions or concerns about these Terms and Conditions, please
        contact us at{" "}
        <a href="mailto:h.m.sadman.sakib@gmail.com" className="text-blue-500">
          h.m.sadman.sakib@gmail.com
        </a>
        .
      </p>
    </div>
  );
};

export default TermsOfService;
