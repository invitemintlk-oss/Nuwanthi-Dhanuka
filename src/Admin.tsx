import React, { useState } from 'react';
import { Copy, Check, Link as LinkIcon, MessageSquare } from 'lucide-react';

export default function Admin() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  const baseUrl = window.location.origin;
  const generatedLink = guestName.trim()
    ? `${baseUrl}/?prefix=${encodeURIComponent(prefix)}&name=${encodeURIComponent(guestName.trim())}`
    : '';

  const messageTemplate = `Dear ${prefix} ${guestName.trim()} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our homecoming invitation and all the event details through the link below 🌐:

${generatedLink}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ Nuwanthi & Dhanuka`;

  const copyLink = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyMessage = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(messageTemplate);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2000);
  };

  return (
    <div className="h-[100dvh] overflow-y-auto bg-[#FDF8F5] p-6 md:p-12 font-sans text-[#3E2723]">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-[#996515]/20">
        <h1 className="text-4xl text-center font-playball text-[#996515] mb-2">Homecoming Invitation</h1>
        <h2 className="text-xl text-center font-cinzel text-[#3E2723] mb-10 tracking-widest font-bold">Link Generator</h2>
        
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#5C3A21] uppercase tracking-wider">Prefix</label>
              <select 
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full p-4 rounded-xl border border-[#C0C0C0] focus:outline-none focus:border-[#996515] bg-[#FDF8F5] text-[#333333] font-medium transition-colors"
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
                <option value="Miss">Miss</option>
                <option value="Mr. & Mrs.">Mr. & Mrs.</option>
                <option value="Family">Family</option>
                <option value="Dear">Dear</option>
              </select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-bold text-[#5C3A21] uppercase tracking-wider">Guest Name</label>
              <input 
                type="text"
                placeholder="e.g. Sanjaya"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full p-4 rounded-xl border border-[#C0C0C0] focus:outline-none focus:border-[#996515] bg-[#FDF8F5] text-[#333333] font-medium transition-colors"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-[#996515]/20">
            <h3 className="text-sm font-bold text-[#5C3A21] uppercase tracking-wider mb-4">Generated Message Preview</h3>
            <div className="bg-[#FDF8F5] p-6 rounded-2xl border border-[#C0C0C0] whitespace-pre-wrap font-sans text-sm md:text-base text-[#333333] leading-relaxed">
              {guestName.trim() ? messageTemplate : <span className="text-gray-400 italic">Enter a guest name to see the preview...</span>}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
            <button 
              onClick={copyLink}
              disabled={!generatedLink}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-[#996515] text-[#996515] font-bold uppercase tracking-wider text-sm rounded-xl hover:bg-[#996515] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {copiedLink ? <Check className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
              {copiedLink ? 'Copied!' : 'Copy Link Only'}
            </button>
            <button 
              onClick={copyMessage}
              disabled={!generatedLink}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-[#996515] text-white font-bold uppercase tracking-wider text-sm rounded-xl hover:bg-[#7a5111] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {copiedMsg ? <Check className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
              {copiedMsg ? 'Copied!' : 'Copy Full Message'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
