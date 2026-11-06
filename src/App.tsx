import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Calendar, Clock, Send, ChevronDown, Heart, ChevronRight, Lock, Leaf, HeartCrack, User, Pen, Volume2, Flower2, UtensilsCrossed, Music } from "lucide-react";
import { FlyingButterflies } from "./FlyingButterflies";

const INVITATION = {
  couple: {
    bride: "Nuwanthi",
    groom: "Dhanuka",
  },
  parents: {
    bride: "SHIROMI & RAVI",
    groom: "PADMINI & ANNADA",
  },
  date: {
    displayNumeric: "19 . 12 . 2026",
    displayLong: "December 19",
    countdownTarget: "December 19, 2026 17:30:00",
  },
  time: {
    ceremony: "5:30 PM",
  },
  venue: {
    name: "Laverno Garden",
    hall: "Indoor",
    city: "Kosgama",
    address: "Highlevel Road, Kosgama 10730, Sri Lanka",
    mapQuery: "Laverno Garden, Highlevel Road, Kosgama 10730, Sri Lanka",
    googleMapsLink: "https://maps.google.com/?q=Laverno+Garden,+Highlevel+Road,+Kosgama+10730,+Sri+Lanka",
  },
  rsvpContacts: [] as string[],
};

const backgroundMusic = encodeURI("/George Benson - Nothing's Gonna Change My Love For You [Lyrics].mp3");
const googleScriptUrl = "https://script.google.com/macros/s/AKfycbwcajHelaqARkvE1KU8wHoPGpaXiI5zFqBHJWz694WKc3B_LJs68Wr8HkgCMBOufIQ/exec";

const publicImagePath = (fileName: string) => `/images/${fileName.replaceAll(" ", "%20")}`;

const HERO_BACKGROUND_IMAGE = publicImagePath("1 (1).jpg");
const FEATURED_COUPLE_IMAGE = publicImagePath("1 (7).jpg");
const GALLERY_IMAGES = ["couple-1.jpg", "couple-2.jpg", "couple-3.jpg"].map(publicImagePath);

function FloatingPetals() {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [petals, setPetals] = useState<Array<{
    id: number;
    x: number;
    size: number;
    rotation: number;
    duration: number;
    delay: number;
    color: string;
    drift: number;
  }>>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setIsLowPowerMode(reduceMotion || isMobile);

    if (reduceMotion) {
      setPetals([]);
      return;
    }

    const colors = ["#FF0000", "#FF1A1A", "#E60000", "#CC0000", "#B30000"];
    const petalCount = isMobile ? 60 : 120;
    const newPetals = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 8 + 6,
      rotation: Math.random() * 360,
      duration: Math.random() * 11 + 16,
      delay: Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: Math.random() * 24 - 12,
    }));

    setPetals(newPetals);
  }, []);

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden z-40 ${isLowPowerMode ? "opacity-70" : ""}`}>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute drop-shadow-[0_1px_4px_rgba(255,0,0,0.3)]"
          style={{ color: petal.color }}
          initial={{
            x: `${petal.x}vw`,
            y: "-10vh",
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: `${petal.x + petal.drift}vw`,
            rotate: petal.rotation + (isLowPowerMode ? 360 : 720),
            opacity: [0, 0.9, 0.8, 0],
          }}
          transition={{
            duration: isLowPowerMode ? petal.duration * 1.2 : petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-sm"
          >
            <path 
              d="M12 2C12 2 4 6 4 13C4 20 12 22 12 22C12 22 20 20 20 13C20 6 12 2 12 2Z" 
              fill={petal.color}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function CountdownTimer({ isDark = false }: { isDark?: boolean }) {
  const targetDate = new Date(INVITATION.date.countdownTarget).getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const stats = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <div className="flex flex-nowrap gap-[1vw] sm:gap-4 md:gap-8 justify-center w-full max-w-4xl mx-auto mt-8 md:mt-16 z-20 px-1 sm:px-2">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }}
          className="relative group"
        >
          {/* Ornamental Frame container */}
          <div className="relative w-[22vw] max-w-[4.5rem] h-[33vw] max-h-[6.5rem] sm:max-w-none sm:max-h-none sm:w-20 sm:h-28 md:w-32 md:h-44 rounded-t-full shadow-[0_15px_35px_-10px_rgba(212,175,55,0.15)] border flex flex-col items-center justify-center overflow-hidden transition-all duration-700 group-hover:-translate-y-3 bg-[#1A1A1A] border-[#D4AF37]/30">
            <div className="absolute inset-1 sm:inset-2 md:inset-3 border-[0.5px] rounded-t-full pointer-events-none border-[#D4AF37]/30" />

            {/* The Number */}
            <span className="text-xl sm:text-3xl md:text-5xl font-playball leading-none relative z-10 drop-shadow-sm mt-2 sm:mt-4 md:mt-6 transition-transform duration-500 group-hover:scale-110 text-[#D4AF37]">
              {Math.max(0, stat.value).toString().padStart(2, '0')}
            </span>

            {/* The Label */}
            <div className="w-full flex justify-center mt-2 sm:mt-3 md:mt-6 mb-1 sm:mb-2 relative z-10">
              <span className="text-[5px] sm:text-[6px] md:text-[8px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border shadow-sm whitespace-nowrap bg-[#111111] text-[#E0E0E0] border-[#D4AF37]/30">
                {stat.label}
              </span>
            </div>

            {/* Bottom decoration */}
            <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 w-[3px] h-[3px] sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 rotate-45 bg-[#D4AF37]" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}


export default function HomecomingInvitation() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    guests: "1",
  });
  const [wishForm, setWishForm] = useState({
    name: "",
    message: "",
  });
  const [rsvpStatus, setRsvpStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [wishStatus, setWishStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const introVideoRef = React.useRef<HTMLVideoElement>(null);

  const searchParams = new URLSearchParams(window.location.search);
  const guestPrefix = searchParams.get('prefix');
  const guestName = searchParams.get('name');
  const hasGuestInfo = guestPrefix && guestName;

  const submitToGoogleSheet = async (payload: Record<string, string>) => {
    if (!googleScriptUrl) {
      throw new Error("Missing VITE_GOOGLE_SCRIPT_URL");
    }

    const response = await fetch(googleScriptUrl, {
      method: "POST",
      body: new URLSearchParams(payload),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }
  };

  const handleRsvpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!rsvpForm.name.trim()) {
      setRsvpStatus("error");
      return;
    }

    setRsvpStatus("sending");

    try {
      await submitToGoogleSheet({
        action: "rsvp",
        name: rsvpForm.name.trim(),
        guests: rsvpForm.guests,
        dietaryNotes: "",
      });
      setRsvpStatus("success");
      setRsvpForm({ name: "", guests: "1" });
    } catch {
      setRsvpStatus("error");
    }
  };

  const handleWishSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!wishForm.name.trim() || !wishForm.message.trim()) {
      setWishStatus("error");
      return;
    }

    setWishStatus("sending");

    try {
      await submitToGoogleSheet({
        action: "wish",
        name: wishForm.name.trim(),
        message: wishForm.message.trim(),
      });
      setWishStatus("success");
      setWishForm({ name: "", message: "" });
    } catch {
      setWishStatus("error");
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const [hasAttemptedAutoplay, setHasAttemptedAutoplay] = useState(false);

  useEffect(() => {
    if (isOpened && !isPlaying && !hasAttemptedAutoplay && audioRef.current) {
      setHasAttemptedAutoplay(true);

      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          const playOnInteraction = () => {
            if (audioRef.current && !isPlaying) {
              audioRef.current
                .play()
                .then(() => {
                  setIsPlaying(true);
                  window.removeEventListener("click", playOnInteraction);
                })
                .catch(() => { });
            }
          };

          window.addEventListener("click", playOnInteraction);
        });
    }
  }, [isOpened, isPlaying, hasAttemptedAutoplay]);

  return (
    <main
      className={`h-[100dvh] w-full bg-[#f4f0ff] transition-all duration-1000 ${isOpened ? "overflow-y-auto overflow-x-hidden" : "overflow-hidden flex items-center justify-center"
        } relative font-montserrat scroll-smooth`}
    >

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="video-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2 } }}
            className="fixed inset-0 z-[100] bg-[#2A1810] flex items-center justify-center overflow-hidden"
          >
            <video
              ref={introVideoRef}
              src="/intro_video.mp4"
              muted={!hasStarted}
              playsInline
              preload="auto"
              className={`w-full h-full object-cover transition-all duration-[2000ms] ease-out ${!hasStarted ? "blur-xl scale-110 opacity-60" : "blur-0 scale-100 opacity-100"
                }`}
              onEnded={() => setTimeout(() => setIsOpened(true), 3500)}
              onError={() => setIsOpened(true)}
            />

            {!hasStarted && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-[120] bg-[#2A1810]/40 backdrop-blur-[2px]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-center px-4"
                >
                  {hasGuestInfo && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 1 }}
                      className="mb-8 flex flex-col items-center"
                    >
                      <p className="font-playball text-4xl md:text-5xl text-[#8B0000] drop-shadow-md mb-2">Dear {guestPrefix} {guestName}</p>
                      <p className="font-cinzel text-xs md:text-sm text-white/80 tracking-[0.2em] uppercase mt-2 drop-shadow-sm">We cordially invite you to</p>
                    </motion.div>
                  )}

                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className={hasGuestInfo ? "mb-8" : "mb-12"}
                  >
                    <h2 className="font-playball text-4xl md:text-6xl text-white mb-2 drop-shadow-2xl">Homecoming Ceremony</h2>
                    <p className="font-cinzel text-2xl md:text-4xl text-[#D4AF37] tracking-[0.2em] md:tracking-[0.3em] uppercase drop-shadow-lg mt-4">{INVITATION.couple.bride} & {INVITATION.couple.groom}</p>
                  </motion.div>

                  <button
                    onClick={() => {
                      setHasStarted(true);
                      if (introVideoRef.current) {
                        introVideoRef.current.muted = false;
                        introVideoRef.current.currentTime = 0;
                        introVideoRef.current.play();
                      }
                    }}
                    className="group relative px-12 py-5 overflow-hidden rounded-full transition-all duration-500 hover:scale-105 active:scale-95"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="relative z-10 font-cinzel font-bold text-white text-sm tracking-[0.4em] uppercase">Open Invitation</span>
                  </button>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 1.5 }}
                    className="mt-8 text-white/50 text-[10px] uppercase tracking-[0.4em]"
                  >
                    Click to begin
                  </motion.div>
                </motion.div>
              </div>
            )}

            {hasStarted && (
              <>


                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setIsOpened(true)}
                  className="absolute bottom-10 right-10 z-[110] px-8 py-3 bg-[#0a0a0a]/10 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.4em] rounded-full border border-white/20 hover:bg-[#0a0a0a]/20 transition-all font-bold"
                >
                  Skip Intro
                </motion.button>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="website-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="website-shell relative z-20 w-full"
          >
            <FlyingButterflies />

            {/* Sticky Return Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsOpened(false)}
              className="fixed top-6 right-6 z-50 bg-[#1A1A1A]/90 backdrop-blur-md p-3 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.2)] border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#8B0000]/20 transition-colors"
            >
              <div className="flex flex-col items-center">
                <div className="text-[8px] uppercase tracking-widest font-bold">Close</div>
              </div>
            </motion.button>

            {/* Hero Section */}
            <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]">
              
              {/* Background Image - used for both mobile and desktop */}
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/ChatGPT Image Jul 30, 2026, 03_06_30 AM.png")' }} />
              
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-[#0A0A0A]/20 pointer-events-none" />

              {/* Content Container */}
              <div className="relative z-10 w-full max-w-lg px-6 py-12 flex flex-col items-center text-center">
                
                {/* Top Ornament */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="flex flex-col items-center"
                >
                  <svg width="80" height="25" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M60 2L65 10L75 12L65 14L60 22L55 14L45 12L55 10L60 2Z" fill="#D4AF37" fillOpacity="0.8"/>
                    <path d="M10 12L40 12" stroke="#D4AF37" strokeOpacity="0.5" strokeWidth="1"/>
                    <path d="M80 12L110 12" stroke="#D4AF37" strokeOpacity="0.5" strokeWidth="1"/>
                  </svg>
                </motion.div>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="mt-3 text-[11px] md:text-sm uppercase tracking-[0.25em] text-[#FFFFFF] font-cinzel font-bold"
                >
                  Homecoming Ceremony
                </motion.p>
                
                {/* Ornament below text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="mt-2 mb-6"
                >
                  <svg width="40" height="15" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M60 4L63 10L69 12L63 14L60 20L57 14L51 12L57 10L60 4Z" fill="#D4AF37" fillOpacity="0.6"/>
                    <path d="M20 12L45 12" stroke="#D4AF37" strokeOpacity="0.4" strokeWidth="1"/>
                    <path d="M75 12L100 12" stroke="#D4AF37" strokeOpacity="0.4" strokeWidth="1"/>
                  </svg>
                </motion.div>

                {/* Names */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 1.2 }}
                  className="flex flex-col items-center"
                >
                  <h1 className="font-playball text-[5.5rem] md:text-9xl text-[#FFFFFF] leading-none drop-shadow-sm">
                    {INVITATION.couple.bride}
                  </h1>
                  <span className="font-playball text-4xl md:text-6xl text-[#FFFFFF] my-2 drop-shadow-sm">
                    &
                  </span>
                  <h1 className="font-playball text-[5.5rem] md:text-9xl text-[#FFFFFF] leading-none drop-shadow-sm">
                    {INVITATION.couple.groom}
                  </h1>
                </motion.div>
                
                {/* Heart line */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="mt-8 flex items-center justify-center w-full max-w-[200px]"
                >
                  <div className="h-px flex-1 bg-[#FFFFFF]/30" />
                  <Heart className="w-4 h-4 text-[#FFFFFF] mx-4 shrink-0" fill="transparent" strokeWidth={1.5} />
                  <div className="h-px flex-1 bg-[#FFFFFF]/30" />
                </motion.div>


                {/* Invite Text */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 1 }}
                  className="mt-8"
                >
                  <p className="text-[#FFFFFF] text-[9px] md:text-[10px] tracking-[0.2em] font-cinzel leading-[2.2] uppercase font-bold px-4">
                    Together with our families,<br/>
                    we request the honour of your presence<br/>
                    at our homecoming ceremony.
                  </p>
                </motion.div>

                {/* View Details Button */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 1 }}
                  className="mt-8 flex flex-col items-center"
                >
                  <div className="flex items-center justify-center mb-3">
                     <svg width="40" height="12" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M60 4L63 11L70 14L63 17L60 24L57 17L50 14L57 11L60 4Z" fill="#D4AF37" fillOpacity="0.7"/>
                       <path d="M10 14L45 14" stroke="#D4AF37" strokeOpacity="0.5" strokeWidth="1"/>
                       <path d="M75 14L110 14" stroke="#D4AF37" strokeOpacity="0.5" strokeWidth="1"/>
                     </svg>
                  </div>
                  <a
                    href="#details"
                    className="relative px-8 py-3 bg-[#0A0A0A]/80 backdrop-blur-sm text-[#FFFFFF] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-colors shadow-sm flex items-center justify-center gap-2 group rounded-[24px]"
                  >
                    <div className="absolute inset-0 border border-[#D4AF37]/30 rounded-[24px]" />
                    <div className="absolute inset-[3px] border border-[#D4AF37]/20 pointer-events-none rounded-[21px]" />
                    <span className="relative z-10 group-hover:text-[#D4AF37] transition-colors">View Details</span>
                    <ChevronDown className="w-3 h-3 relative z-10 group-hover:text-[#D4AF37] transition-colors" />
                  </a>
                </motion.div>

              </div>
            </section>

            {/* Main Content Area */}
            <div className="relative w-full bg-[#0A0A0A]">
              
            {/* Homecoming Details Section */}
            <section id="details" className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-cover bg-center" style={{ backgroundImage: 'url("/bg.png")' }}>

              {/* Content Container */}
              <div className="relative z-10 w-full max-w-lg px-6 py-16 flex flex-col items-center text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="flex flex-col items-center w-full"
                >
                  <p className="font-cinzel text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-bold text-[#FFFFFF]">
                    Two Families Join Hands
                  </p>
                  
                  {/* Ornament */}
                  <div className="mt-4 mb-8">
                    <svg width="40" height="15" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M60 4L63 10L69 12L63 14L60 20L57 14L51 12L57 10L60 4Z" fill="#D4AF37" fillOpacity="0.6"/>
                    </svg>
                  </div>

                  <p className="font-cinzel text-[12px] md:text-[13px] tracking-[0.25em] uppercase font-bold text-[#FFFFFF] mb-2">
                    The Daughter Of
                  </p>
                  
                  {/* Ornament with dot */}
                  <div className="mb-4 flex flex-col items-center">
                    <svg width="40" height="12" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M60 0L65 8L75 10L65 12L60 20L55 12L45 10L55 8L60 0Z" fill="#D4AF37"/>
                       <path d="M30 10L50 10" stroke="#D4AF37" strokeWidth="1"/>
                       <path d="M70 10L90 10" stroke="#D4AF37" strokeWidth="1"/>
                    </svg>
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45 mt-1 opacity-60"></div>
                  </div>

                  {/* Daughter Parents Box */}
                  <div className="relative w-full max-w-sm mx-auto p-1 shadow-sm mb-6">
                    <div className="absolute inset-0 bg-[#0A0A0A]/50 backdrop-blur-[2px] shadow-sm" style={{ clipPath: 'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)' }}></div>
                    <div className="absolute inset-0 border border-[#D4AF37]/30" style={{ clipPath: 'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)' }}></div>
                    <div className="absolute inset-1 border border-[#D4AF37]/20 pointer-events-none" style={{ clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)' }}></div>
                    
                    <div className="py-6 px-4 flex flex-col items-center justify-center text-[#FFFFFF] font-cinzel text-xs md:text-sm tracking-[0.1em] relative z-10 font-bold leading-relaxed">
                      <span>{INVITATION.parents.bride}</span>
                    </div>
                  </div>

                  {/* Together With Divider */}
                  <div className="flex items-center justify-center w-full max-w-[260px] mx-auto mb-6 gap-3">
                    <div className="h-px flex-1 bg-[#D4AF37]/40"></div>
                    <span className="font-playball text-3xl md:text-4xl text-[#D4AF37] lowercase px-1 mt-1">together with</span>
                    <div className="h-px flex-1 bg-[#D4AF37]/40"></div>
                  </div>
                  
                  {/* Ornament */}
                  <div className="mb-6">
                    <svg width="40" height="15" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M60 4L63 10L69 12L63 14L60 20L57 14L51 12L57 10L60 4Z" fill="#D4AF37" fillOpacity="0.6"/>
                    </svg>
                  </div>

                  <p className="font-cinzel text-[12px] md:text-[13px] tracking-[0.25em] uppercase font-bold text-[#FFFFFF] mb-2">
                    The Son Of
                  </p>
                  
                  {/* Ornament with dot */}
                  <div className="mb-4 flex flex-col items-center">
                    <svg width="40" height="12" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M60 0L65 8L75 10L65 12L60 20L55 12L45 10L55 8L60 0Z" fill="#D4AF37"/>
                       <path d="M30 10L50 10" stroke="#D4AF37" strokeWidth="1"/>
                       <path d="M70 10L90 10" stroke="#D4AF37" strokeWidth="1"/>
                    </svg>
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45 mt-1 opacity-60"></div>
                  </div>

                  {/* Son Parents Box */}
                  <div className="relative w-full max-w-sm mx-auto p-1 shadow-sm mb-8">
                    <div className="absolute inset-0 bg-[#0A0A0A]/50 backdrop-blur-[2px] shadow-sm" style={{ clipPath: 'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)' }}></div>
                    <div className="absolute inset-0 border border-[#D4AF37]/30" style={{ clipPath: 'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)' }}></div>
                    <div className="absolute inset-1 border border-[#D4AF37]/20 pointer-events-none" style={{ clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)' }}></div>
                    
                    <div className="py-5 px-4 flex flex-col items-center justify-center text-[#FFFFFF] font-cinzel text-xs md:text-sm tracking-[0.1em] relative z-10 font-bold leading-relaxed">
                      <span>{INVITATION.parents.groom}</span>
                    </div>
                  </div>

                  {/* Horizontal Divider Line */}
                  <div className="w-full max-w-[280px] mx-auto h-px bg-[#D4AF37]/30 mb-8 flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#D4AF37] rotate-45 opacity-60"></div>
                  </div>

                  {/* Request Text */}
                  <p className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase leading-[2.5] max-w-[320px] mx-auto text-[#FFFFFF] font-cinzel font-bold">
                    WITH HEARTS FULL OF LOVE, WE REQUEST<br/>
                    THE HONOUR OF YOUR PRESENCE AS WE
                  </p>
                  
                  {/* Celebrate */}
                  <div className="py-2">
                    <span className="font-playball text-4xl md:text-5xl text-[#D4AF37]">Celebrate</span>
                  </div>

                  <p className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase leading-[2.5] max-w-[320px] mx-auto text-[#FFFFFF] font-cinzel font-bold mb-4">
                    THE HOMECOMING CEREMONY OF
                  </p>

                  {/* Couple Names Inline */}
                  <div className="flex items-center justify-center gap-6 mb-6">
                    <span className="font-cinzel text-xl md:text-3xl text-[#FFFFFF] tracking-[0.2em] font-bold">{INVITATION.couple.bride.toUpperCase()}</span>
                    <span className="font-playball text-4xl md:text-6xl text-[#D4AF37] mt-1">&</span>
                    <span className="font-cinzel text-xl md:text-3xl text-[#FFFFFF] tracking-[0.2em] font-bold">{INVITATION.couple.groom.toUpperCase()}</span>
                  </div>

                  {/* Bottom Ornament */}
                  <div className="mt-2">
                    <svg width="40" height="15" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M60 4L63 10L69 12L63 14L60 20L57 14L51 12L57 10L60 4Z" fill="#D4AF37" fillOpacity="0.6"/>
                       <path d="M20 12L45 12" stroke="#D4AF37" strokeOpacity="0.4" strokeWidth="1"/>
                       <path d="M75 12L100 12" stroke="#D4AF37" strokeOpacity="0.4" strokeWidth="1"/>
                    </svg>
                  </div>

                </motion.div>
              </div>
            </section>



            {/* Schedule Section */}
            <section className="relative py-12 md:py-32 overflow-hidden flex flex-col items-center w-full bg-cover bg-center" style={{ backgroundImage: 'url("/bg.png")' }}>
              {/* Background Image */}
              

              {/* Starry/Magical Background adapting to light theme */}
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#D4AF37] rounded-full animate-pulse blur-[1px]" />
                <div className="absolute top-10 right-20 w-1.5 h-1.5 bg-[#8B0000] rounded-full animate-pulse delay-100 blur-[1px]" />
                <div className="absolute top-1/2 left-10 w-2 h-2 bg-[#8C8C8C] rounded-full animate-pulse delay-300 opacity-30" />
                <div className="absolute bottom-1/4 right-10 w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse delay-500 blur-[1px]" />
                <div className="absolute bottom-10 left-1/3 w-1 h-1 bg-[#8B0000] rounded-full animate-pulse delay-200" />
              </div>
              <div className="absolute top-0 left-0 w-64 h-64 bg-[radial-gradient(circle,rgba(139,0,0,0.1)_0%,transparent_70%)] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(139,0,0,0.15)_0%,transparent_70%)] rounded-full pointer-events-none" />
              
              <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
                
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6 mb-8 md:mb-16 flex flex-col items-center"
                >
                  <p className="font-cinzel text-[#D4AF37] font-bold uppercase tracking-[0.6em] text-[10px] md:text-xs">
                    THE DAY
                  </p>
                  
                  {/* Decorative Ornament */}
                  <div className="flex items-center justify-center">
                     <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M12 0L14 5L19 5L15 8L16 12L12 9L8 12L9 8L5 5L10 5L12 0Z" fill="#D4AF37" fillOpacity="0.8"/>
                     </svg>
                  </div>

                  <h2 className="font-playball text-6xl md:text-[100px] text-[#D4AF37] leading-none drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    Schedule
                  </h2>
                  
                  <div className="w-full max-w-[200px] mx-auto h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mt-4" />

                  {/* Decorative Ornament Below Title */}
                  <div className="flex items-center justify-center mt-4">
                     <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M12 0L14 5L19 5L15 8L16 12L12 9L8 12L9 8L5 5L10 5L12 0Z" fill="#D4AF37" fillOpacity="0.8"/>
                     </svg>
                  </div>

                  <p className="text-[#E0E0E0] text-xs md:text-sm tracking-[0.2em] font-cinzel max-w-2xl mx-auto leading-[2]">
                    A simple outline of the<br/>celebration.
                  </p>
                </motion.div>

                {/* Timeline Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="relative mx-auto max-w-[500px] text-left p-5 md:p-12 mt-6 md:mt-12 rounded-[2rem] border border-[#333333] shadow-[0_0_40px_rgba(200,200,200,0.5)] bg-gradient-to-b from-[#1A1A1A] to-[#111111]"
                >
                  {/* Outer Gold Corner Decor (Simulated) */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#D4AF37]/50 rounded-tl-[1rem]" />
                  <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#D4AF37]/50 rounded-tr-[1rem]" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-[#D4AF37]/50 rounded-bl-[1rem]" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[#D4AF37]/50 rounded-br-[1rem]" />

                  {/* Inner Gold Frame */}
                  <div className="absolute inset-5 border border-[#D4AF37]/20 rounded-[1.2rem] pointer-events-none" />

                  <div className="relative space-y-8 md:space-y-16 z-10 pt-4 pb-4 px-2 md:px-6">

                    {/* Node 1: Homecoming */}
                    <div className="relative flex items-center gap-6 md:gap-8">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-[#D4AF37] bg-[#1A1A1A] flex items-center justify-center shrink-0 z-10 shadow-[0_0_20px_rgba(212,175,55,0.4)] overflow-hidden">
                        <Heart className="w-6 h-6 md:w-8 md:h-8 text-[#D4AF37]" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-bold text-[#D4AF37] font-cinzel mb-2">Homecoming</div>
                        <div className="text-xl md:text-3xl text-[#E0E0E0] font-cinzel font-light leading-tight">{INVITATION.time.ceremony}</div>
                        <div className="text-[9px] md:text-[11px] text-[#E0E0E0]/70 font-cinzel tracking-[0.15em] uppercase mt-1">{INVITATION.venue.hall} · {INVITATION.venue.name}, {INVITATION.venue.city}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Countdown Section */}
            <section className="relative py-28 md:py-48 flex flex-col items-center overflow-hidden bg-cover bg-center" style={{ backgroundImage: 'url("/bg.png")' }}>
              {/* Background Image */}
              

              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#111111]/40 via-[#1A1A1A]/10 to-[#111111]/40 pointer-events-none" />

              {/* Floating Decorative Shapes */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                className="absolute -top-24 -right-24 w-96 h-96 bg-[radial-gradient(circle,rgba(139,0,0,1)_0%,transparent_70%)] rounded-full pointer-events-none"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                className="absolute -bottom-24 -left-24 w-96 h-96 bg-[radial-gradient(circle,rgba(212,175,55,1)_0%,transparent_70%)] rounded-full pointer-events-none"
              />

              <div className="w-full max-w-[1200px] px-6 flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="relative mb-20"
                >
                  {/* Backdrop Title */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[18vw] md:text-[220px] text-[#D4AF37]/5 whitespace-nowrap pointer-events-none select-none tracking-wider">
                    Eternity
                  </div>

                  {/* Main Title Container */}
                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "80px" }}
                      viewport={{ once: true }}
                      className="h-px bg-[#D4AF37]/40 mb-8"
                    />

                    <h2 className="font-cinzel text-3xl md:text-6xl text-[#D4AF37] tracking-[0.25em] md:tracking-[0.4em] font-bold uppercase leading-tight">
                      SAVE <span className="mx-2 md:mx-4 text-[#E0E0E0]">THE</span> DATE
                    </h2>

                    <div className="mt-10 flex items-center justify-center gap-6">
                      <div className="h-[0.5px] w-8 md:w-16 bg-[#D4AF37]/50" />
                      <span className="font-playball text-3xl md:text-5xl text-[#D4AF37] drop-shadow-sm">{INVITATION.date.displayNumeric}</span>
                      <div className="h-[0.5px] w-8 md:w-16 bg-[#D4AF37]/50" />
                    </div>
                  </div>
                </motion.div>

                {/* Countdown Component with Light Theme */}
                <CountdownTimer isDark={false} />

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.8 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="mt-20 flex flex-col items-center gap-4"
                >
                  <p className="text-[10px] md:text-[12px] uppercase tracking-[0.6em] text-[#E0E0E0] font-bold text-center">
                    Wait for the magic
                  </p>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                        className="w-1 h-1 bg-[#D4AF37] rotate-45"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>


            {/* Gallery Section */}
            <section className="relative py-20 md:py-32 overflow-hidden flex flex-col items-center w-full bg-[#0A0A0A] bg-cover bg-center" style={{ backgroundImage: 'url("/bg.png")' }}>
              <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center mb-12 md:mb-16"
                >
                  <p className="font-cinzel text-[#D4AF37] font-bold uppercase tracking-[0.6em] text-[10px] md:text-xs">
                    Our Moments
                  </p>
                  <h2 className="font-playball text-6xl md:text-8xl text-[#D4AF37] leading-none mt-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    Gallery
                  </h2>
                  <div className="w-full max-w-[200px] mx-auto h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mt-6" />
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                  {GALLERY_IMAGES.map((src, i) => (
                    <motion.div
                      key={src}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.15 }}
                      className={`relative overflow-hidden rounded-2xl border border-[#D4AF37]/40 shadow-[0_0_30px_rgba(212,175,55,0.15)] group ${i === 0 ? "col-span-2 md:col-span-1 aspect-[4/5] md:aspect-[2/3]" : "aspect-[2/3]"}`}
                    >
                      <img
                        src={src}
                        alt={`${INVITATION.couple.bride} & ${INVITATION.couple.groom} ${i + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-2 border border-[#D4AF37]/30 rounded-xl pointer-events-none" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Venue Location Section */}
            <section className="relative py-28 md:py-48 overflow-hidden bg-[#111111] bg-cover bg-center" style={{ backgroundImage: 'url("/bg.png")' }}>

              {/* Decorative Geometric Elements (CSS-Based UI Decorations) */}
              <div className="absolute -top-24 -left-24 w-[500px] h-[500px] border border-[#D4AF37]/20 rounded-full flex items-center justify-center opacity-30 pointer-events-none">
                <div className="w-[80%] h-[80%] border border-[#8B0000]/20 rounded-full" />
                <div className="w-[60%] h-[60%] border border-[#D4AF37]/10 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent rotate-45" />
              </div>

              <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-10 mb-24"
                >
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-[#E0E0E0] font-bold uppercase tracking-[0.8em] text-[10px] md:text-xs">T H E · V E N U E</span>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className={`w-1.5 h-1.5 rotate-45 ${i === 2 ? "bg-[#D4AF37]" : "bg-[#8B0000]/40"}`} />
                      ))}
                    </div>
                  </div>

                  <h2 className="font-cinzel text-5xl md:text-9xl text-[#D4AF37] leading-tight font-light uppercase tracking-tight relative">
                    {INVITATION.venue.name.split(" ")[0].toUpperCase()} <span className="block md:inline font-playball normal-case text-4xl md:text-8xl text-[#D4AF37] md:-ml-8 relative z-10 translate-y-4 md:translate-y-0 italic drop-shadow-sm">{INVITATION.venue.name.split(" ").slice(1).join(" ")}</span>
                  </h2>

                  <div className="max-w-xl mx-auto pt-10 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-[#D4AF37]/50" />
                    <p className="text-[#E0E0E0] text-sm md:text-base tracking-[0.2em] font-medium uppercase font-cinzel leading-loose pt-8">
                      WHERE TRADITION MEETS THE BEAUTY OF NEW BEGINNINGS
                    </p>
                  </div>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                  {/* Left: Atmospheric Location Card */}
                  <div className="lg:col-span-5 text-left order-2 lg:order-1">
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      className="bg-[#111111] p-10 md:p-16 shadow-[0_60px_100px_-40px_rgba(153,101,21,0.2)] border border-[#D4AF37]/30 relative group"
                    >
                      {/* Interactive hover ornament */}
                      <div className="absolute inset-2 border-[0.5px] border-[#8B0000]/40 pointer-events-none group-hover:border-[#D4AF37]/40 transition-colors duration-700" />

                      <div className="space-y-12 relative z-10">
                        <div className="space-y-6">
                          <p className="text-[#D4AF37] text-xl md:text-2xl font-light italic leading-relaxed font-playball text-center lg:text-left">
                            "May our celebration be as infinite as the ocean and as warm as the tropical sun."
                          </p>
                          <div className="h-0.5 w-12 bg-[#D4AF37]/40 mx-auto lg:ml-0" />
                        </div>

                        <div className="space-y-10">
                          <div className="flex items-start gap-8">
                            <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                              <MapPin className="w-5 h-5 text-[#D4AF37]" />
                            </div>
                            <div className="space-y-3">
                              <h4 className="text-[#E0E0E0] font-bold text-[10px] uppercase tracking-[0.5em] font-cinzel">The Destination</h4>
                              <p className="text-xl md:text-2xl text-[#E0E0E0] font-cinzel leading-relaxed tracking-wide font-bold">
                                {INVITATION.venue.name} ({INVITATION.venue.hall})
                              </p>
                              <p className="text-xs md:text-sm text-[#E0E0E0]/80 font-cinzel tracking-wide">
                                {INVITATION.venue.address}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-8">
                            <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                              <Clock className="w-5 h-5 text-[#D4AF37]" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-[#E0E0E0] font-bold text-[10px] uppercase tracking-[0.5em] font-cinzel">The Homecoming</h4>
                              <p className="text-xl md:text-2xl text-[#E0E0E0] font-cinzel leading-relaxed tracking-wide font-bold">
                                {INVITATION.date.displayLong}, 2026 · {INVITATION.time.ceremony}
                              </p>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => window.open(INVITATION.venue.googleMapsLink, "_blank")}
                          className="w-full group relative inline-flex items-center justify-center gap-4 py-6 bg-[#D4AF37] text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] overflow-hidden transition-all hover:bg-[#8B0000] shadow-[0_10px_20px_rgba(212,175,55,0.3)] mt-4"
                        >
                          <div className="absolute inset-0 bg-[#1A1A1A]/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
                          <span className="relative z-10 flex items-center gap-3">
                            <MapPin className="w-4 h-4" />
                            Launch Digital Map
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right: Architectural Map Frame */}
                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "circOut" }}
                      className="relative w-full aspect-[4/3] md:aspect-video lg:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-[0_80px_150px_-30px_rgba(212,175,55,0.25)] group bg-[#1A1A1A]"
                    >
                      {/* The Map */}
                      <iframe
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(INVITATION.venue.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full grayscale-[0.5] contrast-125 sepia-[0.3] brightness-[1.1] hover:grayscale-0 hover:sepia-0 hover:contrast-100 transition-all duration-1000 scale-[1.02] group-hover:scale-100"
                      />

                      {/* Decorative Frame Overlays */}
                      <div className="absolute inset-0 pointer-events-none border-[15px] md:border-[25px] border-[#1A1A1A]/95 rounded-[3rem]" />
                      <div className="absolute inset-8 md:inset-12 pointer-events-none border border-[#D4AF37]/20 rounded-[2.5rem]" />

                      {/* Arched Corner Floating Element */}
                      <div className="absolute top-0 right-0 w-40 h-40 bg-[#1A1A1A]/90 backdrop-blur-md flex flex-col items-center justify-center rounded-bl-full shadow-lg p-8 transform translate-x-4 -translate-y-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-700">
                        <MapPin className="w-8 h-8 text-[#D4AF37] mb-2 opacity-80" />
                        <span className="text-[8px] font-bold uppercase tracking-widest text-[#D4AF37]/70">Explore</span>
                      </div>

                      {/* Subtle lens flare overlay */}
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#8B0000]/20 to-transparent mix-blend-overlay" />
                    </motion.div>

                    {/* Bottom Floating Card Decoration */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                      className="inline-flex items-center gap-4 mt-8 px-8 py-3 bg-[#1A1A1A] border border-[#D4AF37]/40 shadow-[0_10px_30px_rgba(212,175,55,0.15)] rounded-full"
                    >
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-[10px] md:text-xs font-bold text-[#D4AF37] uppercase tracking-widest">{INVITATION.venue.city}</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            {/* RSVP Section */}
            <section className="relative py-20 md:py-32 flex flex-col items-center overflow-hidden w-full bg-[#0A0A0A] bg-cover bg-center" style={{ backgroundImage: 'url("/bg.png")' }}>

              {/* Starry/Magical Background adapting to light theme */}
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-1/4 left-10 w-2 h-2 bg-[#8B0000] rounded-full animate-pulse blur-[1px]" />
                <div className="absolute bottom-1/4 right-20 w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse delay-300" />
                <div className="absolute top-10 right-1/4 w-1 h-1 bg-[#8C8C8C] rounded-full animate-pulse delay-150" />
              </div>
              <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(139,0,0,0.2)_0%,transparent_70%)] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[radial-gradient(circle,rgba(139,0,0,0.2)_0%,transparent_70%)] rounded-full pointer-events-none" />

              <div className="container mx-auto px-6 max-w-4xl flex flex-col items-center relative z-10 w-full">
                
                {/* Heading */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center mb-12"
                >
                  <div className="flex items-center justify-center mb-6">
                     <svg width="60" height="15" viewBox="0 0 60 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M30 0L33 6L40 6L34 10L36 15L30 11L24 15L26 10L20 6L27 6L30 0Z" fill="#D4AF37" fillOpacity="0.8"/>
                       <path d="M0 7.5L20 7.5" stroke="#D4AF37" strokeOpacity="0.5" strokeWidth="1"/>
                       <path d="M40 7.5L60 7.5" stroke="#D4AF37" strokeOpacity="0.5" strokeWidth="1"/>
                     </svg>
                  </div>
                  
                  <h2 className="font-cinzel text-5xl md:text-7xl text-[#D4AF37] tracking-[0.3em] uppercase drop-shadow-sm">
                    RSVP
                  </h2>

                  <div className="flex items-center justify-center mt-6">
                     <svg width="60" height="15" viewBox="0 0 60 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M30 0L33 6L40 6L34 10L36 15L30 11L24 15L26 10L20 6L27 6L30 0Z" fill="#D4AF37" fillOpacity="0.8"/>
                       <path d="M0 7.5L20 7.5" stroke="#D4AF37" strokeOpacity="0.5" strokeWidth="1"/>
                       <path d="M40 7.5L60 7.5" stroke="#D4AF37" strokeOpacity="0.5" strokeWidth="1"/>
                     </svg>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="relative w-full max-w-[500px] bg-gradient-to-b from-[#111111] to-[#1A1A1A] p-8 md:p-12 shadow-[0_0_40px_rgba(212,175,55,0.15)] rounded-[2rem] border border-[#D4AF37]/30 flex flex-col items-center"
                >
                  {/* Subtle top left glow */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(circle,rgba(139,0,0,0.4)_0%,transparent_70%)] rounded-tl-[2rem] pointer-events-none" />

                  <h3 className="font-playball text-4xl md:text-5xl text-[#D4AF37] mb-4 text-center drop-shadow-sm">RSVP Confirmation</h3>
                  
                  {/* Small Ornament */}
                  <div className="flex items-center justify-center mb-8">
                     <svg width="40" height="10" viewBox="0 0 40 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M20 0L22 4L28 4L23 6.5L25 10L20 7.5L15 10L17 6.5L12 4L18 4L20 0Z" fill="#D4AF37" fillOpacity="0.8"/>
                       <path d="M0 5L12 5" stroke="#D4AF37" strokeOpacity="0.5" strokeWidth="1"/>
                       <path d="M28 5L40 5" stroke="#D4AF37" strokeOpacity="0.5" strokeWidth="1"/>
                     </svg>
                  </div>

                  <form className="w-full space-y-8 text-left relative z-10" onSubmit={handleRsvpSubmit}>
                    <div className="space-y-3">
                      <label className="text-sm md:text-base font-cinzel text-[#E0E0E0] ml-1">Your Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Type your name here..."
                          value={rsvpForm.name}
                          onChange={(e) => {
                            setRsvpStatus("idle");
                            setRsvpForm((prev) => ({ ...prev, name: e.target.value }));
                          }}
                          className="w-full bg-[#1A1A1A] border border-[#D4AF37]/50 rounded-xl px-5 py-4 text-[#E0E0E0] placeholder:text-[#E0E0E0]/50 focus:outline-none focus:border-[#D4AF37] transition-all font-cinzel text-sm"
                          required
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <Leaf className="w-5 h-5 text-[#D4AF37]" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5 pt-4 text-center">
                      <label className="text-sm md:text-base font-cinzel text-[#E0E0E0]">Will you join us on our big day?</label>
                      
                      {/* Tiny diamond ornament */}
                      <div className="flex items-center justify-center mb-2">
                        <div className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45" />
                        <div className="w-12 h-px bg-gradient-to-r from-[#D4AF37] to-transparent ml-2 opacity-50" />
                        <div className="w-12 h-px bg-gradient-to-l from-[#D4AF37] to-transparent mr-2 opacity-50 -order-1" />
                      </div>

                      <div className="flex flex-col gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            setRsvpStatus("idle");
                            setRsvpForm((prev) => ({ ...prev, guests: "1" }));
                          }}
                          className={`relative w-full bg-[#1A1A1A] hover:bg-[#111111] text-[#E0E0E0] py-4 rounded-2xl font-cinzel text-xs md:text-sm tracking-wide transition-all shadow-[0_4px_10px_rgba(212,175,55,0.1)] flex items-center px-4 md:px-6 overflow-hidden ${rsvpForm.guests !== "0" ? "border-2 border-[#D4AF37] scale-[1.02]" : "border border-[#D4AF37]/30"}`}
                        >
                          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#D4AF37] flex items-center justify-center shrink-0 mr-4 ${rsvpForm.guests !== "0" ? "bg-[#D4AF37]/10" : ""}`}>
                             <Heart className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37]" fill="#D4AF37" />
                          </div>
                          <span className="flex-1 text-center pr-10 font-bold">Yes, I'll be there!</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setRsvpStatus("idle");
                            setRsvpForm((prev) => ({ ...prev, guests: "0" }));
                          }}
                          className={`relative w-full bg-[#1A1A1A] hover:bg-[#111111] text-[#E0E0E0] py-4 rounded-2xl font-cinzel text-xs md:text-sm tracking-wide transition-all shadow-[0_4px_10px_rgba(212,175,55,0.1)] flex items-center px-4 md:px-6 overflow-hidden ${rsvpForm.guests === "0" ? "border-2 border-[#D4AF37] scale-[1.02]" : "border border-[#D4AF37]/30"}`}
                        >
                          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#D4AF37] flex items-center justify-center shrink-0 mr-4 ${rsvpForm.guests === "0" ? "bg-[#D4AF37]/10" : ""}`}>
                             <HeartCrack className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37]" />
                          </div>
                          <span className="flex-1 text-center pr-10 font-bold leading-relaxed">Sadly I can't attend, but<br/>you're in my heart</span>
                        </button>
                      </div>
                    </div>

                    {(rsvpStatus === "success" || rsvpStatus === "error") && (
                      <p className={`text-[10px] text-center font-semibold uppercase tracking-wider ${rsvpStatus === "success" ? "text-emerald-500" : "text-red-500"}`}>
                        {rsvpStatus === "success" ? "RSVP sent successfully." : "Please enter your name and try again."}
                      </p>
                    )}

                    <div className="pt-8">
                      <button
                        type="submit"
                        disabled={rsvpStatus === "sending"}
                        className="group relative w-full bg-[#D4AF37] border border-[#D4AF37]/50 text-white py-5 rounded-2xl font-cinzel text-xs md:text-sm tracking-[0.1em] font-bold transition-all shadow-[0_10px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] flex items-center justify-center gap-3 overflow-hidden disabled:opacity-70"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <Sparkles className="w-5 h-5 text-white" />
                        <span className="relative z-10">{rsvpStatus === "sending" ? "Sending..." : "Click Here to Confirm"}</span>
                        <ChevronRight className="w-5 h-5 text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>

                      <div className="flex items-center justify-center gap-2 mt-8">
                        <Lock className="w-3 h-3 text-[#D4AF37]" />
                        <p className="text-[10px] md:text-xs text-[#E0E0E0] text-center font-sans">
                          No shared details will be public.<br/>Your response is private.
                        </p>
                      </div>
                    </div>
                  </form>
                </motion.div>

                {/* Info info mirroring the clean aesthetic */}
                {INVITATION.rsvpContacts.length > 0 && <div className="mt-32 flex flex-col items-center gap-6 text-center w-full max-w-xl">
                  <div className="h-px w-24 bg-[#D4AF37]/50" />
                  <p className="text-[#D4AF37] text-[10px] tracking-[0.4em] font-bold uppercase mt-2">RSVP Contacts</p>
                  <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-[#E0E0E0] text-[10px] md:text-sm tracking-widest font-normal opacity-80 decoration-[#D4AF37]/50 underline-offset-4">
                    {INVITATION.rsvpContacts.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>}
              </div>
            </section>

            {/* Wishing Section */}
            <section className="relative py-20 md:py-32 flex flex-col items-center overflow-hidden w-full bg-[#111111] bg-cover bg-center" style={{ backgroundImage: 'url("/bg.png")' }}>

              {/* Starry/Magical Background adapting to light theme */}
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-[#8B0000] rounded-full animate-pulse blur-[1px]" />
                <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse delay-300" />
                <div className="absolute top-20 left-20 w-1 h-1 bg-[#8C8C8C] rounded-full animate-pulse delay-150" />
              </div>
              <div className="absolute top-0 left-0 w-80 h-80 bg-[radial-gradient(circle,rgba(139,0,0,0.2)_0%,transparent_70%)] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(139,0,0,0.15)_0%,transparent_70%)] rounded-full pointer-events-none" />

              <div className="container mx-auto px-6 max-w-4xl flex flex-col items-center relative z-10 w-full">
                
                {/* Heading */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center mb-16 text-center"
                >
                  <p className="font-cinzel text-[#D4AF37] font-bold uppercase tracking-[0.6em] text-[10px] md:text-xs">
                    GUESTBOOK
                  </p>
                  
                  {/* Decorative Ornament */}
                  <div className="flex items-center justify-center mt-2 mb-4">
                     <svg width="40" height="10" viewBox="0 0 40 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M20 0L22 4L28 4L23 6.5L25 10L20 7.5L15 10L17 6.5L12 4L18 4L20 0Z" fill="#D4AF37" fillOpacity="0.8"/>
                       <path d="M0 5L12 5" stroke="#D4AF37" strokeOpacity="0.5" strokeWidth="1"/>
                       <path d="M28 5L40 5" stroke="#D4AF37" strokeOpacity="0.5" strokeWidth="1"/>
                     </svg>
                  </div>
                  
                  <h2 className="font-playball text-6xl md:text-8xl text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.2)] leading-none italic mb-4">
                    Best Wishes
                  </h2>

                  {/* Glowing dot and line */}
                  <div className="flex flex-col items-center justify-center mb-8 w-full max-w-[200px]">
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mt-1" />
                  </div>

                  <p className="text-[#E0E0E0] text-[10px] md:text-[11px] tracking-[0.3em] font-cinzel max-w-xl mx-auto leading-relaxed uppercase">
                    Your love and presence are the greatest gifts. If you wish to leave a note, we'd be honored.
                  </p>
                </motion.div>

                {/* Form Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="relative w-full max-w-[550px] bg-gradient-to-b from-[#1A1A1A] to-[#111111] p-8 md:p-12 shadow-[0_0_40px_rgba(212,175,55,0.15)] rounded-[2rem] border border-[#D4AF37]/30 flex flex-col items-center"
                >
                  <form className="w-full space-y-10 text-left relative z-10" onSubmit={handleWishSubmit}>
                    
                    {/* FROM field */}
                    <div className="space-y-4">
                      <label className="text-[10px] md:text-xs font-cinzel text-[#D4AF37] uppercase tracking-[0.4em] font-bold ml-16">From</label>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 flex items-center justify-center shrink-0 bg-[#1A1A1A] shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                          <User className="w-5 h-5 text-[#D4AF37]" />
                        </div>
                        <input
                          type="text"
                          placeholder="YOUR NAME"
                          value={wishForm.name}
                          onChange={(e) => {
                            setWishStatus("idle");
                            setWishForm((prev) => ({ ...prev, name: e.target.value }));
                          }}
                          className="flex-1 bg-transparent border-b border-[#D4AF37]/40 px-2 py-3 text-[#E0E0E0] placeholder:text-[#E0E0E0]/40 focus:outline-none focus:border-[#D4AF37] transition-all font-cinzel text-sm uppercase tracking-wider"
                          required
                        />
                      </div>
                    </div>

                    {/* MESSAGE field */}
                    <div className="space-y-4">
                      <label className="text-[10px] md:text-xs font-cinzel text-[#D4AF37] uppercase tracking-[0.4em] font-bold ml-16">Your Message</label>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 flex items-center justify-center shrink-0 bg-[#1A1A1A] shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                          <Pen className="w-4 h-4 text-[#D4AF37]" />
                        </div>
                        <textarea
                          rows={4}
                          placeholder="WISHES FOR THE NEWLYWEDS..."
                          value={wishForm.message}
                          onChange={(e) => {
                            setWishStatus("idle");
                            setWishForm((prev) => ({ ...prev, message: e.target.value }));
                          }}
                          className="flex-1 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl px-5 py-4 text-[#E0E0E0] placeholder:text-[#E0E0E0]/40 focus:outline-none focus:border-[#D4AF37]/50 transition-all font-cinzel text-xs tracking-wider resize-none shadow-inner"
                          required
                        />
                      </div>
                    </div>

                    {/* Success/Error Messages */}
                    <AnimatePresence>
                      {(wishStatus === "success" || wishStatus === "error") && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className={`text-[10px] text-center font-bold tracking-widest uppercase ${wishStatus === "success" ? "text-emerald-500" : "text-red-500"}`}
                        >
                          {wishStatus === "success" ? "Message sent with love" : "Please complete the form"}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Bottom Actions */}
                    <div className="pt-4 flex items-center gap-4">
                      <button
                        type="submit"
                        disabled={wishStatus === "sending"}
                        className="group relative flex-1 bg-[#D4AF37] border border-[#D4AF37]/50 text-white py-4 rounded-xl font-cinzel text-xs md:text-sm tracking-[0.2em] font-bold transition-all shadow-[0_5px_15px_rgba(212,175,55,0.3)] hover:shadow-[0_10px_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-4 overflow-hidden disabled:opacity-70"
                      >
                        <div className="absolute top-0 right-0 w-8 h-8 bg-white/30 blur-md rounded-bl-full pointer-events-none" />
                        <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,1)] pointer-events-none" />
                        <Send className="w-4 h-4 text-white -rotate-12 group-hover:rotate-0 transition-transform" />
                        <span className="relative z-10">{wishStatus === "sending" ? "SENDING..." : "SEND WISHES"}</span>
                      </button>

                      <button type="button" className="w-14 h-14 rounded-full border border-[#D4AF37]/40 bg-[#1A1A1A] flex items-center justify-center shrink-0 hover:bg-[#8B0000]/20 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                        <Volume2 className="w-5 h-5 text-[#D4AF37]" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            </section>

            {/* Closing Section */}
            <section className="relative py-32 md:py-48 overflow-hidden flex flex-col items-center w-full bg-[#0A0A0A] bg-cover bg-center" style={{ backgroundImage: 'url("/bg.png")' }}>

              {/* Starry/Magical Background adapting to light theme */}
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-[#8B0000] rounded-full animate-pulse blur-[1px]" />
                <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-[#8C8C8C] rounded-full animate-pulse delay-300" />
                <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-[#D4AF37] rounded-full animate-pulse delay-150" />
              </div>
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(139,0,0,0.2)_0%,transparent_70%)] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(139,0,0,0.2)_0%,transparent_70%)] rounded-full pointer-events-none" />

              <div className="container mx-auto px-6 max-w-5xl text-center relative z-10 flex flex-col items-center">
                
                {/* Top Ornament */}
                <div className="flex items-center justify-center gap-4 mb-8 w-full max-w-[200px] md:max-w-[250px]">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
                  <div className="text-[#D4AF37]">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L14 9L21 12L14 15L12 22L10 15L3 12L10 9L12 2Z"/>
                     </svg>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
                </div>

                {/* Thank You Title */}
                <h2 className="font-playball text-7xl md:text-[140px] text-[#D4AF37] drop-shadow-[0_0_20px_rgba(212,175,55,0.2)] leading-none italic mb-8">
                  Thank You
                </h2>

                {/* Dot and Line below Title */}
                <div className="flex flex-col items-center justify-center mb-16 w-full max-w-[300px]">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mt-1" />
                </div>

                {/* Subtitle */}
                <p className="text-[#E0E0E0] text-[10px] md:text-sm tracking-[0.4em] font-cinzel leading-loose uppercase mb-16 max-w-2xl">
                  We look forward to<br className="md:hidden"/> celebrating with you.
                </p>

                {/* Middle Ornament */}
                <div className="flex items-center justify-center gap-4 mb-16 w-full max-w-[200px]">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/80" />
                  <div className="text-[#D4AF37]">
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3L13.5 9L19.5 10.5L13.5 12L12 18L10.5 12L4.5 10.5L10.5 9L12 3Z"/>
                     </svg>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/80" />
                </div>

                {/* Copyright Text */}
                <p className="text-[#E0E0E0] text-[9px] md:text-xs tracking-[0.6em] font-cinzel uppercase font-bold mb-2">
                  © 2026 {INVITATION.couple.bride} & {INVITATION.couple.groom}
                </p>

                {/* Promo Text */}
                <p className="text-[#E0E0E0]/80 text-[10px] md:text-xs font-sans tracking-wider mb-8">
                  Want a beautiful homecoming website like this? Create yours with <a target="_blank" rel="noreferrer" className="text-[#D4AF37] hover:text-[#D4AF37] underline underline-offset-2 font-bold transition-colors" href="https://wa.me/94707819074">invitemint</a>
                </p>

                {/* Bottom Heart Ornament */}
                <div className="flex items-center justify-center gap-4 w-full max-w-[150px] opacity-70">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                  <div className="text-[#D4AF37]">
                     <Heart className="w-3 h-3" />
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                </div>
              </div>
            </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <audio ref={audioRef} src={backgroundMusic} loop />

      {/* Music Control Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[60] bg-[#1A1A1A]/80 backdrop-blur-md text-[#D4AF37] p-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.25)] border border-[#D4AF37]/40 hover:bg-[#8B0000]/20 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all"
      >
        <div className="flex flex-col items-center">
          {isPlaying ? (
            <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
          )}
        </div>
      </motion.button>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #111111;
        }
        ::-webkit-scrollbar-thumb {
          background: #D4AF3766;
          border-radius: 10px;
        }
      `}} />
    </main >
  );
}
