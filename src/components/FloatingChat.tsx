import { Facebook, MessageCircle } from "lucide-react";

export const FloatingChat = () => (
  <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-3">
    <a
      href="viber://chat?number=%2B639000000000"
      aria-label="Chat on Viber"
      className="h-12 w-12 rounded-full bg-[#7360f2] hover:scale-110 transition-transform flex items-center justify-center shadow-glow"
    >
      <MessageCircle className="h-5 w-5 text-white" />
    </a>
    <a
      href="https://m.me/iwarehousebacolod"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on Messenger"
      className="h-12 w-12 rounded-full bg-[#0084ff] hover:scale-110 transition-transform flex items-center justify-center shadow-glow"
    >
      <Facebook className="h-5 w-5 text-white" />
    </a>
  </div>
);
