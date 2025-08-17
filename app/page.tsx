"use client"

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Hotel, MapPin, CheckCircle2, ArrowRight, Sparkles, Percent, Phone, ShieldCheck, Globe } from "lucide-react";

// 🔧 ENV: Proxy via /api/* to avoid CORS
const API_BASE = "";

// ---------- Types ----------
interface LivePriceRequest {
  hotel_name: string;
  city: string; // "Makkah" | "Medina"
  checkin_date: string; // YYYY-MM-DD
  checkout_date: string; // YYYY-MM-DD
  update_airtable?: boolean;
}

interface RecommendationRequest {
  city: string;
  budget_category?: "Budget" | "Mid-Range" | "Premium" | "Luxury" | "Ultra-Luxury";
  halal_required?: boolean;
}

interface PriceSource {
  source: "booking.com" | "halalbooking.com" | string;
  per_night: number; // in EUR
  currency?: string;
}

interface HotelRecommendation {
  hotel_name: string;
  arabic_name?: string;
  city: string;
  distance_to_haram?: string; // e.g. "450m"
  rating?: number; // 0-10 or 0-5 depending on source
  star_rating?: string;
  images?: string[];
  halal_certified?: boolean;
  simulated_price?: PriceSource;
  price_sources?: PriceSource[];
  commission_link?: string;
  umrah_features?: {
    halal_certified?: boolean;
    distance_to_haram?: string;
    prayer_facilities?: boolean;
    shuttle_service?: boolean;
  };
}

// ---------- Utilities ----------
function eur(amount?: number) {
  if (amount == null || isNaN(amount)) return "–";
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(amount);
}

function savings(a?: number, b?: number) {
  if (a == null || b == null) return 0;
  return Math.max(0, a - b);
}

// ---------- Fetch Helpers ----------
async function fetchRecommendations(payload: RecommendationRequest): Promise<HotelRecommendation[]> {
  const res = await fetch(`${API_BASE}/api/customers/recommendations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  // Normalize – accept either {recommendations: [...]} or [...]
  return Array.isArray(data) ? data : (data.recommendations ?? []);
}

// ---------- UI Parts ----------
const Hero: React.FC<{ onPrimary: () => void }>= ({ onPrimary }) => (
  <section className="relative mx-auto max-w-6xl px-4 pt-10 pb-4">
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
      <Badge className="mb-3 bg-amber-100 text-amber-800">✨ Ehrlich • Transparent • Auf dich zugeschnitten</Badge>
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Die erste KI-Beratung für deine Umrah</h1>
      <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
        Unsere KI prüft dein Angebot, vergleicht Alternativen und zeigt dir in <strong>unter 2 Minuten</strong>, wie du Geld sparst und besser reist.
      </p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Button size="lg" className="rounded-2xl px-6" onClick={onPrimary}>
          Jetzt testen <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button size="lg" variant="secondary" className="rounded-2xl px-6" onClick={() => window.scrollTo({ top: 1200, behavior: "smooth" })}>
          So funktioniert&apos;s
        </Button>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rounded-2xl"><CardContent className="p-5"><div className="flex items-start gap-3"><Globe className="h-8 w-8 text-primary"/><div><h3 className="font-semibold">Flugsuche</h3><p className="text-sm text-muted-foreground">Wir finden die besten Flüge – passend zu deinem Budget.</p></div></div></CardContent></Card>
        <Card className="rounded-2xl"><CardContent className="p-5"><div className="flex items-start gap-3"><Hotel className="h-8 w-8 text-primary"/><div><h3 className="font-semibold">Hotelvergleich</h3><p className="text-sm text-muted-foreground">Top‑Hotels in Makkah & Medina – Entfernung zur Kaaba inklusive.</p></div></div></CardContent></Card>
        <Card className="rounded-2xl"><CardContent className="p-5"><div className="flex items-start gap-3"><Sparkles className="h-8 w-8 text-primary"/><div><h3 className="font-semibold">Umrah‑Tipps</h3><p className="text-sm text-muted-foreground">Insider‑Tricks & Spartipps – alles KI‑optimiert.</p></div></div></CardContent></Card>
      </div>
    </motion.div>
  </section>
);

const Filters: React.FC<{
  city: string;
  setCity: (v: string) => void;
  budget: string;
  setBudget: (v: string) => void;
  halal: boolean;
  setHalal: (v: boolean) => void;
  onSearch: () => void;
}> = ({ city, setCity, budget, setBudget, halal, setHalal, onSearch }) => (
  <Card className="mx-auto max-w-6xl rounded-2xl"><CardContent className="p-4 md:p-6">
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
      <div className="md:col-span-1">
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="Stadt" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Makkah">Makkah</SelectItem>
            <SelectItem value="Medina">Medina</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="md:col-span-1">
        <Select value={budget} onValueChange={setBudget}>
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="Budgetklasse" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Budget">Budget</SelectItem>
            <SelectItem value="Mid-Range">Mid-Range</SelectItem>
            <SelectItem value="Premium">Premium</SelectItem>
            <SelectItem value="Luxury">Luxury</SelectItem>
            <SelectItem value="Ultra-Luxury">Ultra‑Luxury</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="md:col-span-2 flex items-center gap-3">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="h-4 w-4" checked={halal} onChange={(e)=>setHalal(e.target.checked)} />
          <span className="text-sm">Nur halal‑zertifizierte Hotels</span>
        </label>
        <Badge variant="secondary" className="rounded-xl"><ShieldCheck className="mr-1 h-3 w-3"/>Islamic‑Compliance</Badge>
      </div>
      <div className="md:col-span-1 text-right">
        <Button className="w-full md:w-auto rounded-2xl" onClick={onSearch}>Angebote anzeigen</Button>
      </div>
    </div>
  </CardContent></Card>
);

const HotelCard: React.FC<{ h: HotelRecommendation }>= ({ h }) => {
  const best = h.simulated_price;
  const features = h.umrah_features;
  const whatsappNumber = process.env.NEXT_PUBLIC_WA_NUMBER || "491234567890";
  
  return (
    <Card className="rounded-2xl hover:shadow-xl transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-lg">{h.hotel_name}</h3>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4"/> {h.city}
              {features?.distance_to_haram && <><span>•</span><span>{features.distance_to_haram} bis Haram</span></>}
              {h.star_rating && <><span>•</span><span>{"★".repeat(parseInt(h.star_rating) || 0)}</span></>}
              {features?.halal_certified && <Badge className="ml-1 bg-emerald-100 text-emerald-800">Halal zertifiziert</Badge>}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold leading-none">{eur(best?.per_night)}</div>
            <div className="text-xs text-muted-foreground">pro Nacht • {best?.currency || 'EUR'}</div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          {h.commission_link ? (
            <Button asChild className="rounded-2xl"><a href={h.commission_link} target="_blank" rel="noreferrer">Jetzt buchen</a></Button>
          ) : (
            <Button disabled className="rounded-2xl">Buchung folgt</Button>
          )}
          <Button variant="secondary" className="rounded-2xl" onClick={()=>{
            const text = `Anfrage UmrahCheck: ${h.hotel_name} in ${h.city} – Preis ${eur(best?.per_night)} pro Nacht.`;
            const url = `https://wa.me/${whatsappNumber}?text=` + encodeURIComponent(text);
            window.open(url, "_blank");
          }}>
            <Phone className="mr-2 h-4 w-4"/> WhatsApp
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const WeeklyDeals: React.FC<{ city: string }>= ({ city }) => (
  <section className="mx-auto max-w-6xl px-4">
    <div className="mb-3 flex items-center gap-2">
      <Badge variant="secondary" className="rounded-xl">Wöchentlich</Badge>
      <h2 className="text-xl md:text-2xl font-semibold">Top‑Deals dieser Woche in {city}</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {["Budget","Mid-Range","Premium"].map((tier)=> (
        <Card key={tier} className="rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{tier}</h3>
              <Badge className="rounded-xl">PDF‑Offer</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Kuratiertes Angebot inkl. Booking‑Links & Spartipps.</p>
            <Button className="mt-4 w-full rounded-2xl" onClick={()=>{
              window.location.href = "/preisvergleich?weekly="+tier.toLowerCase();
            }}>Ansehen</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

// ---------- Page Component ----------
const UmrahCheckFrontend: React.FC = () => {
  const [city, setCity] = useState<string>("Makkah");
  const [budget, setBudget] = useState<string>("Ultra-Luxury");
  const [halal, setHalal] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<HotelRecommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const doSearch = async () => {
    setLoading(true); setError(null);
    try {
      const data = await fetchRecommendations({ city, budget_category: budget as any, halal_required: halal });
      setItems(data);
      // Optional: scroll to results
      setTimeout(()=>{
        const el = document.getElementById("results");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    } catch (e:any) {
      setError(e?.message ?? "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    // Initial suggestions
    doSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const whatsappNumber = process.env.NEXT_PUBLIC_WA_NUMBER || "491234567890";

  return (
    <div className="min-h-screen pb-24">
      <Hero onPrimary={doSearch} />
      <div className="mx-auto max-w-6xl px-4">
        <Filters city={city} setCity={setCity} budget={budget} setBudget={setBudget} halal={halal} setHalal={setHalal} onSearch={doSearch} />
      </div>

      <div className="mx-auto max-w-6xl px-4 mt-8" id="results">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-semibold">Empfehlungen</h2>
          {loading ? <span className="text-sm text-muted-foreground">Laden…</span> : <span className="text-sm text-muted-foreground">{items.length} Treffer</span>}
        </div>
        {error && <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((h, i)=> (
            <motion.div key={h.hotel_name+"-"+i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: i*0.03 }}>
              <HotelCard h={h} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <WeeklyDeals city={city} />
      </div>

      <footer className="mx-auto max-w-6xl px-4 mt-16">
        <Card className="rounded-2xl">
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-5">
            <div className="grow">
              <h3 className="text-lg md:text-xl font-semibold">Fragen? Wir sind per WhatsApp für dich da.</h3>
              <p className="text-sm text-muted-foreground mt-1">Transparente Beratung, echte Live‑Preise und 100 % Halal‑Compliance.</p>
            </div>
            <Button className="rounded-2xl" asChild>
              <a target="_blank" href={`https://wa.me/${whatsappNumber}`} rel="noreferrer">
                <Phone className="mr-2 h-4 w-4"/> WhatsApp Chat starten
              </a>
            </Button>
          </CardContent>
        </Card>
        <div className="text-center text-xs text-muted-foreground mt-6">© {new Date().getFullYear()} UmrahCheck – Ehrlich. Transparent. Auf dich zugeschnitten.</div>
      </footer>
    </div>
  );
};

export default UmrahCheckFrontend;