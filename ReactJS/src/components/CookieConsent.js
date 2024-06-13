import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('cookieConsent', 'accepted', { expires: 7 });
    setShowBanner(false);
  };

  const handleDecline = () => {
    setShowBanner(false);
  };

  return (
    showBanner && (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex flex-col md:flex-row justify-between items-center z-50">
        <p className="mb-2 md:mb-0">We use cookies to improve your experience on our site. By continuing to browse the site you are agreeing to our cookie policy.</p>
        <div className="flex space-x-2">
          <button
            onClick={handleAccept}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  );
};

export default CookieConsent;
