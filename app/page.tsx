"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Star, Smartphone, Tablet, Laptop, Gamepad2, Watch, Wrench, CalendarDays, MapPin, Phone, ShieldCheck, Zap, Search, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const defaultCalendlyUrl = ""; // Add a real Calendly link later if you want one fallback booking page

const deviceData = {
  Phone: {
    icon: Smartphone,
    brands: ["iPhone", "Samsung", "Google Pixel", "Motorola", "OnePlus", "Other"],
    repairs: ["Screen Replacement", "Battery Replacement", "Charging Port Repair", "Back Glass", "Camera Repair", "Water Damage", "Other"],
  },
  Tablet: {
    icon: Tablet,
    brands: ["iPad", "Samsung Tablet", "Amazon Fire", "Microsoft Surface", "Other"],
    repairs: ["Screen Replacement", "Battery Replacement", "Charging Port Repair", "Software Issue", "Other"],
  },
  Laptop: {
    icon: Laptop,
    brands: ["MacBook", "HP", "Dell", "Lenovo", "Acer", "Asus", "Other"],
    repairs: ["Screen Replacement", "Battery Replacement", "Keyboard Repair", "SSD Upgrade", "Virus/Software Help", "Not Turning On", "Other"],
  },
  Console: {
    icon: Gamepad2,
    brands: ["PlayStation 5", "PlayStation 4", "Xbox Series X/S", "Xbox One", "Nintendo Switch", "Other"],
    repairs: ["HDMI Port Repair", "Overheating", "No Power", "Disc Drive Issue", "Controller Repair", "Other"],
  },
  "Smart Watch": {
    icon: Watch,
    brands: ["Apple Watch", "Samsung Watch", "Fitbit", "Garmin", "Other"],
    repairs: ["Screen Repair", "Battery Replacement", "Band/Frame Issue", "Other"],
  },
};

const GoogleLogo = ({ small = false }) => (
  <div className={`font-black leading-none ${small ? "text-xl" : "text-6xl"}`} aria-label="Google reviews">
    <span className="text-blue-500">G</span>
    <span className="text-red-500">o</span>
    <span className="text-yellow-400">o</span>
    <span className="text-blue-500">g</span>
    <span className="text-green-500">l</span>
    <span className="text-red-500">e</span>
  </div>
);

const reviews = [
  { name: "Apeksha Jain", text: "Amazing service, best price, and a well-spoken manager." },
  { name: "Chris M", text: "Best customer service, nice employees, and great work. I really appreciate them." },
  { name: "Local Customer", text: "Fast repair, clean work, and super helpful staff." },
];

const locations = [
  {
    name: "Cellairis Phone Repair Inside Walmart - Stone Oak",
    shortName: "Stone Oak",
    rating: "4.9",
    reviews: "1,204",
    address: "1515 N Loop 1604 E, San Antonio, TX 78232",
    phone: "(210) 499-0133",
    tel: "2104990133",
    place: "Located inside Walmart Supercenter",
    mapQuery: "1515 N Loop 1604 E, San Antonio, TX 78232",
    calendlyUrl: "https://calendly.com/nicolascolony/30min",
  },
  {
    name: "Cellairis Phone Repair Inside Walmart - Culebra",
    shortName: "Culebra",
    rating: "4.9",
    reviews: "793",
    address: "Inside Walmart, 6703 W Loop 1604 N, San Antonio, TX 78254",
    phone: "(210) 324-0501",
    tel: "2103240501",
    place: "Located inside Walmart Supercenter",
    mapQuery: "6703 W Loop 1604 N, San Antonio, TX 78254",
    calendlyUrl: "https://calendly.com/nicolascolony/cellairis-culebra",
  },
  {
    name: "Cellairis Phone Repair Inside Walmart - SE Military",
    shortName: "SE Military",
    rating: "5.0",
    reviews: "1,547",
    address: "1200 SE Military Dr, San Antonio, TX 78214",
    phone: "(210) 573-7919",
    tel: "2105737919",
    place: "Located inside Walmart Supercenter",
    mapQuery: "1200 SE Military Dr, San Antonio, TX 78214",
    calendlyUrl: "https://calendly.com/nicolascolony/cellairis-southeast",
  },
  {
    name: "Techy South New Braunfels inside HEB",
    shortName: "Techy South",
    rating: "4.9",
    reviews: "1,070",
    address: "4100 New Braunfels Ave, San Antonio, TX 78223",
    phone: "(737) 900-3641",
    tel: "7379003641",
    place: "Phone, tablet, laptop, Google, and console repairs",
    mapQuery: "4100 New Braunfels Ave, San Antonio, TX 78223",
    calendlyUrl: "https://calendly.com/nicolascolony/techy-spring-branch",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const smoothTransition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] };

export default function CellairisModernWebsite() {
  const [device, setDevice] = useState("Phone");
  const [brand, setBrand] = useState("iPhone");
  const [repair, setRepair] = useState("Screen Replacement");
  const [otherRepair, setOtherRepair] = useState("");
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const current = deviceData[device];
  const Icon = current.icon;
  const location = locations[selectedLocation];
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&z=13&output=embed`;
  const bookingUrl = location.calendlyUrl || defaultCalendlyUrl;

  const filteredRepairs = useMemo(() => {
    return current.repairs.filter((item) => item.toLowerCase().includes(search.toLowerCase()));
  }, [current.repairs, search]);

  const handleDeviceChange = (name) => {
    setDevice(name);
    setBrand(deviceData[name].brands[0]);
    setRepair(deviceData[name].repairs[0]);
    setOtherRepair("");
    setSearch("");
  };

  const openBooking = () => setShowBookingModal(true);

  const bookAtLocation = (index) => {
    const chosenLocation = locations[index];
    setSelectedLocation(index);

    if (chosenLocation.calendlyUrl) {
      window.open(chosenLocation.calendlyUrl, "_blank", "noreferrer");
    } else if (defaultCalendlyUrl) {
      window.open(defaultCalendlyUrl, "_blank", "noreferrer");
    } else {
      window.location.href = `tel:${chosenLocation.tel}`;
    }

    setShowBookingModal(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xl font-bold tracking-tight">CELLAIRIS</p>
            <p className="text-xs text-neutral-400">#1 Quality Phone Repair in San Antonio</p>
          </div>
          <div className="hidden items-center gap-6 text-sm text-neutral-300 md:flex">
            <a href="#services">Services</a>
            <a href="#quote">Start Repair</a>
            <a href="#locations">Locations</a>
            <a href="#reviews">Reviews</a>
            
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.25),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.18),transparent_35%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-5 inline-flex rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-200">
              Same-day repairs
            </div>
            <h1 className="text-5xl font-black leading-tight md:text-7xl">
              Fast repairs. Clean work. Done today.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-neutral-300">
              Phones, tablets, laptops, gaming consoles, smart watches, charging ports, batteries, screens, back glass, and more — repaired by trusted local technicians in San Antonio.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button onClick={openBooking} className="rounded-2xl bg-red-500 px-7 py-6 text-base font-bold hover:bg-red-600">
                Book 20% First Repair
              </Button>
              <Button asChild variant="outline" className="rounded-2xl border-white/20 bg-white/5 px-7 py-6 text-base text-white hover:bg-white/10">
                <a href="tel:2104990133">Call Now</a>
              </Button>
            </div>
            
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 26, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ ...smoothTransition, delay: 0.12 }}>
          <Card id="quote" className="rounded-[2rem] border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl">
            <CardContent className="p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-2xl bg-red-500 p-3"><Wrench className="h-6 w-6" /></div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Start Your Repair</h2>
                  <p className="text-sm text-neutral-300">Choose your device and repair type.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {Object.keys(deviceData).map((name) => {
                  const DIcon = deviceData[name].icon;
                  return (
                    <button
                      key={name}
                      onClick={() => handleDeviceChange(name)}
                      className={`rounded-2xl border p-4 text-center transition ${device === name ? "border-red-400 bg-red-500/20" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                    >
                      <DIcon className="mx-auto mb-2 h-6 w-6" />
                      <span className="text-xs font-semibold text-white">{name}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm text-neutral-300">Device brand/model</span>
                  <select value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-neutral-900 p-4 text-white">
                    {current.brands.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-sm text-neutral-300">Search repair</span>
                  <div className="flex items-center rounded-2xl border border-white/10 bg-neutral-900 px-4">
                    <Search className="h-4 w-4 text-neutral-400" />
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="screen, battery, HDMI..." className="w-full bg-transparent p-4 text-white placeholder:text-neutral-500 outline-none" />
                  </div>
                </label>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {filteredRepairs.map((item) => (
                  <button key={item} onClick={() => setRepair(item)} className={`rounded-2xl border p-4 text-left text-sm text-white transition ${repair === item ? "border-red-400 bg-red-500/20" : "border-white/10 bg-white/5 hover:bg-white/10"}`}>
                    {item}
                  </button>
                ))}
              </div>

              {repair === "Other" && (
                <textarea value={otherRepair} onChange={(e) => setOtherRepair(e.target.value)} placeholder="Tell us what repair you need..." className="mt-4 min-h-28 w-full rounded-2xl border border-white/10 bg-neutral-900 p-4 text-white outline-none" />
              )}

              <div className="mt-6 rounded-2xl border border-white/10 bg-neutral-900 p-4">
                <p className="text-sm text-neutral-400">Selected repair</p>
                <p className="mt-1 font-bold text-white"><Icon className="mr-2 inline h-5 w-5 text-red-400" /> {device} · {brand} · {repair === "Other" ? otherRepair || "Other repair" : repair}</p>
              </div>

              <Button onClick={openBooking} className="mt-6 w-full rounded-2xl bg-red-500 py-6 text-base font-bold hover:bg-red-600">
                <CalendarDays className="mr-2 h-5 w-5" /> Book 20% First Repair
              </Button>
            </CardContent>
          </Card>
          </motion.div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black">Repair services built for speed</h2>
          <p className="mt-3 text-neutral-400">Quick diagnostics, clear pricing, and same-day service on many repairs.</p>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid gap-5 md:grid-cols-3">
          {[
            [Zap, "Same-Day Repairs", "Most common phone repairs can be completed quickly while you shop."],
            [ShieldCheck, "Quality Parts", "Clean installs, careful testing, and reliable parts for daily use."],
            [Phone, "All Major Devices", "Apple, Samsung, tablets, laptops, consoles, smart watches, and more."],
          ].map(([SIcon, title, text]) => (
            <motion.div key={title} variants={fadeUp} transition={smoothTransition} whileHover={{ y: -6, scale: 1.02 }}>
            <Card className="rounded-3xl border-white/10 bg-white/5">
              <CardContent className="p-7">
                <SIcon className="mb-5 h-8 w-8 text-red-400" />
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 text-neutral-400">{text}</p>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="locations" className="bg-white px-6 py-16 text-neutral-950">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-neutral-950 p-8 text-white md:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-4xl font-black">Choose your nearest location</h2>
              <p className="mt-4 text-neutral-300">Cellairis and Techy locations across San Antonio for phones, tablets, laptops, consoles, and accessories.</p>
              <p className="mt-2 text-neutral-400">Book online, call the store, or stop by for same-day service on many repairs.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <Button onClick={openBooking} className="rounded-2xl bg-red-500 px-7 py-6 font-bold hover:bg-red-600">Book Appointment</Button>
              <Button asChild variant="outline" className="rounded-2xl border-white/20 bg-white/5 px-7 py-6 text-white hover:bg-white/10"><a href={`tel:${location.tel}`}>Call Selected Store</a></Button>
            </div>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="mt-8 grid gap-4 md:grid-cols-4">
            {locations.map((item, index) => (
              <motion.button
                key={item.name}
                variants={fadeUp}
                transition={smoothTransition}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedLocation(index)}
                className={`rounded-3xl border p-5 text-left transition ${selectedLocation === index ? "border-red-400 bg-red-500/20" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="font-black text-white">{item.shortName}</p>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">{item.rating} ★</span>
                </div>
                <p className="text-sm text-neutral-300">{item.address}</p>
                <p className="mt-3 text-sm font-semibold text-red-300">{item.phone}</p>
                <p className="mt-1 text-xs text-neutral-500">{item.reviews} Google reviews</p>
              </motion.button>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={smoothTransition} className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/10 bg-neutral-900 p-3">
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-bold text-white">{location.name}</p>
                <p className="text-sm text-neutral-400">{location.address}</p>
                <p className="mt-1 text-sm text-neutral-500">{location.place}</p>
              </div>
              <div className="flex flex-col gap-2 sm:items-end">
                <a href={`tel:${location.tel}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
                  <Phone className="h-4 w-4" /> Call Store
                </a>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(location.mapQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                >
                  Open in Google Maps <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
            <iframe
              title={`${location.name} Google Map`}
              src={mapSrc}
              className="h-80 w-full rounded-[1rem] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-black">Trusted by San Antonio</h2>
          <div className="mt-4 flex flex-col items-center justify-center gap-3">
            <GoogleLogo />
            <p className="text-neutral-400">4.9 rating with 1,204 real Google reviews.</p>
          </div>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <motion.div key={review.name} variants={fadeUp} transition={smoothTransition} whileHover={{ y: -6, scale: 1.02 }}>
            <Card className="rounded-3xl border-white/10 bg-white/5">
              <CardContent className="p-7">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex gap-1 text-red-400">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-red-400" />)}</div>
                  <div className="rounded-full bg-white px-2 py-1"><GoogleLogo small /></div>
                </div>
                <p className="text-neutral-200">“{review.text}”</p>
                <p className="mt-5 font-bold text-white">{review.name}</p>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {showBookingModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={smoothTransition} className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-neutral-950 p-6 shadow-2xl md:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Select location first</p>
                <h3 className="mt-2 text-3xl font-black text-white">Where do you want to book?</h3>
                <p className="mt-2 text-neutral-400">Choose the correct store. If Calendly is connected, you’ll go to that store’s booking page. If not, we’ll call the store directly.</p>
              </div>
              <button onClick={() => setShowBookingModal(false)} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">
                Close
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {locations.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => bookAtLocation(index)}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 text-left transition hover:border-red-400 hover:bg-red-500/20"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="font-black text-white">{item.shortName}</p>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">{item.rating} ★</span>
                  </div>
                  <p className="text-sm text-neutral-300">{item.address}</p>
                  <p className="mt-3 text-sm font-semibold text-red-300">{item.phone}</p>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-neutral-500">
        <p>CELLAIRIS | #1 Quality Phone Repair In San Antonio</p>
        <p className="mt-2">1515 N Loop 1604 E · (210) 499-0133</p>
      </footer>
    </div>
  );
}
