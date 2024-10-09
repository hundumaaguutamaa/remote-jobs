import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-200">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Job Board. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;