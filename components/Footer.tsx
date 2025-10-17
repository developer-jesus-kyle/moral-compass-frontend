
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 mt-8 py-6 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Moral Compass Protocol. All Rights Reserved.</p>
        <div className="mt-4">
          <a
            href="https://www.paypal.com/paypalme/KyleWilson420Jesus"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 shadow-md"
          >
            Support the App via PayPal
          </a>
          <p className="text-sm mt-2">Your support helps us maintain and improve this service.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;