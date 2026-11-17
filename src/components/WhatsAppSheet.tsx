import React, { useState } from 'react';
import { Check, Copy, ExternalLink, X } from 'lucide-react';
import { VILLAGE_COORDINATOR } from '../data/villageData';
import { WhatsAppIcon } from './VillageArt';

interface WhatsAppSheetProps {
  isOpen: boolean;
  initialMessage: string;
  subjectLabel: string;
  onClose: () => void;
}

export const WhatsAppSheet: React.FC<WhatsAppSheetProps> = ({
  isOpen,
  initialMessage,
  subjectLabel,
  onClose,
}) => {
  const [message, setMessage] = useState(initialMessage);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    setMessage(initialMessage);
    setCopied(false);
  }, [initialMessage, isOpen]);

  if (!isOpen) return null;

  const encodedUrl = `https://wa.me/${VILLAGE_COORDINATOR.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-[#121E17]/45 backdrop-blur-[2px] p-0 md:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wa-sheet-title"
    >
      <div className="w-full md:max-w-lg bg-[#FFFFFF] rounded-t-3xl md:rounded-2xl highland-floating border border-[#1E4B38]/10 overflow-hidden">
        <div className="md:hidden w-10 h-1.5 bg-[#C0C8C2] rounded-full mx-auto mt-3" />

        <div className="px-5 pt-4 pb-3 border-b border-[#1E4B38]/8 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#2E6F40]">{subjectLabel}</p>
            <h3 id="wa-sheet-title" className="text-lg font-bold text-[#121E17] mt-0.5">
              Hubungi {VILLAGE_COORDINATOR.name}
            </h3>
            <p className="text-sm text-[#414944]">
              {VILLAGE_COORDINATOR.role} · {VILLAGE_COORDINATOR.responseWindow}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela pesan WhatsApp"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-[#414944] hover:bg-[#E9F7EA] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label
              htmlFor="wa-message-box"
              className="block text-sm font-semibold text-[#1C2820] mb-1.5"
            >
              Pesan Reservasi Siap Kirim (Bisa Diedit)
            </label>
            <textarea
              id="wa-message-box"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3.5 text-[15px] leading-relaxed highland-input resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="min-h-[48px] px-4 py-2.5 rounded-lg border-[1.5px] border-[#1E4B38] text-[#1E4B38] bg-[#F9F8F3] hover:bg-[#E9F7EA] text-sm font-semibold flex items-center justify-center gap-2 whitespace-nowrap tactile-press cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#2E6F40]" />
                  <span>Pesan Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin Pesan</span>
                </>
              )}
            </button>

            <a
              href={encodedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-h-[48px] px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1DA851] text-white text-sm font-semibold flex items-center justify-center gap-2 whitespace-nowrap tactile-press"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Buka Chat WhatsApp</span>
              <ExternalLink className="w-4 h-4 opacity-90" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
