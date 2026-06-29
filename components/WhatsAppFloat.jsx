"use client";

import { company } from "../data/site";

export default function WhatsAppFloat() {
  return (
    <a href={`https://wa.me/${company.phoneIntl}`} target="_blank" rel="noopener noreferrer" className="waf" aria-label="WhatsApp ile iletişime geç">
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
        <path d="M16 2.7c-7.3 0-13.3 6-13.3 13.3 0 2.3.6 4.6 1.8 6.6L2.7 29.3l6.9-1.8c1.9 1 4.1 1.6 6.4 1.6 7.3 0 13.3-6 13.3-13.3S23.3 2.7 16 2.7zm0 24.3c-2 0-4-.5-5.7-1.6l-.4-.2-4.1 1.1 1.1-4-.3-.4c-1.2-1.8-1.8-4-1.8-6.2C4.7 9.9 9.9 4.7 16 4.7S27.3 9.9 27.3 16 22.1 27 16 27zm6.2-8.2c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.7-1.7-1-.9-1.7-2-1.9-2.3-.2-.3 0-.5.1-.7.1-.1.3-.4.5-.6.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6-.1-.2-.8-1.9-1.1-2.6-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9 0 1.7 1.2 3.3 1.4 3.6.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.6-.4z" />
      </svg>
      <style jsx>{`
        .waf { position: fixed; bottom: 22px; right: 22px; z-index: 90; width: 54px; height: 54px; background: #25d366; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 20px rgba(37,211,102,0.45); transition: transform .2s ease; }
        .waf:hover { transform: scale(1.08); }
        @media (max-width: 600px) { .waf { bottom: 18px; right: 18px; width: 50px; height: 50px; } }
      `}</style>
    </a>
  );
}
