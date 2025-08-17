# ✅ UmrahCheck Frontend - Vercel Deployment Checklist

## 🚀 **Pre-Deployment**

- [ ] **API läuft**: `python umrahcheck_api_fixed.py` (Port 8001)
- [ ] **Frontend funktioniert lokal**: `npm run dev` (Port 3000)
- [ ] **API-Calls funktionieren**: Hotel-Empfehlungen werden angezeigt
- [ ] **WhatsApp-Links funktionieren**: Button öffnet korrekte WhatsApp-URL

## 📦 **Git Repository Setup**

- [ ] **Git initialisiert**: `git init`
- [ ] **Alle Dateien committed**: `git add . && git commit -m "Frontend ready"`
- [ ] **GitHub/GitLab Repository erstellt** und Code gepushed
- [ ] **.env.local** ist in .gitignore (nicht gepushed)

## 🔧 **Vercel Configuration**

### **1. Project Setup**
- [ ] **Vercel Account** erstellt/angemeldet
- [ ] **New Project** → Repository verbunden
- [ ] **Framework**: Next.js automatisch erkannt
- [ ] **Root Directory**: `/` oder `/frontend` falls Monorepo

### **2. Environment Variables** (Production & Preview)
```bash
NEXT_PUBLIC_API_BASE=https://deine-railway-api.up.railway.app
API_PROXY_TARGET=https://deine-railway-api.up.railway.app  
NEXT_PUBLIC_WA_NUMBER=9665XXXXXXXX
```

- [ ] **NEXT_PUBLIC_API_BASE** gesetzt (deine Railway/API URL)
- [ ] **API_PROXY_TARGET** gesetzt (gleiche URL)
- [ ] **NEXT_PUBLIC_WA_NUMBER** gesetzt (mit Ländercode, ohne +)

### **3. Build Settings**
- [ ] **Build Command**: `next build` (Standard)
- [ ] **Output Directory**: `.next` (Standard)
- [ ] **Node.js Version**: 18.x oder 20.x

## 🌐 **Domain Setup** (Optional)

- [ ] **umrahcheck.de** Domain bereit
- [ ] **Vercel Dashboard** → Domains → Domain hinzufügen
- [ ] **DNS Records** in Domain-Verwaltung gesetzt:
  ```
  A Record: @ → 76.76.19.19
  CNAME: www → cname.vercel-dns.com
  ```
- [ ] **SSL-Zertifikat** automatisch generiert (Vercel)

## 🧪 **Testing nach Deployment**

### **1. Basic Functionality**
- [ ] **Website lädt**: https://dein-project.vercel.app
- [ ] **Hero-Section** wird korrekt angezeigt
- [ ] **Filter funktionieren**: Stadt, Budget, Halal-Toggle
- [ ] **"Angebote anzeigen"** Button funktioniert

### **2. API Integration**
- [ ] **Hotel-Empfehlungen** werden geladen
- [ ] **Makkah Ultra-Luxury**: 10+ Hotels angezeigt
- [ ] **Medina Luxury**: 10+ Hotels angezeigt
- [ ] **Preise** werden korrekt formatiert (€650/Nacht)

### **3. Interactive Features**
- [ ] **WhatsApp-Buttons** öffnen korrekte URLs
- [ ] **Buchungs-Links** funktionieren (falls vorhanden)
- [ ] **Responsive Design** auf Mobile getestet
- [ ] **Animationen** funktionieren (Framer Motion)

## 🔍 **Performance Check**

- [ ] **Lighthouse Score** >90 (Performance)
- [ ] **First Load** <3 Sekunden
- [ ] **API Response Time** <2 Sekunden
- [ ] **Images** optimiert (Next.js automatic)

## 🚨 **Error Handling**

- [ ] **API Offline**: Error-Message wird angezeigt
- [ ] **Keine Hotels gefunden**: Entsprechende Meldung
- [ ] **Network Errors**: Graceful Fallback
- [ ] **Console Errors**: Keine kritischen Fehler

## 📊 **Analytics Setup** (Optional)

- [ ] **Vercel Analytics** aktiviert
- [ ] **Google Analytics** integriert (falls gewünscht)
- [ ] **Error Tracking** (Sentry) konfiguriert

## 🎉 **Go-Live Checklist**

- [ ] **Alle Tests bestanden**
- [ ] **WhatsApp-Nummer** funktioniert
- [ ] **API Production-Ready** (Railway deployed)
- [ ] **Domain SSL** aktiv
- [ ] **Team benachrichtigt**

## 🔄 **Post-Launch**

- [ ] **Customer Testing**: Erste echte Nutzer testen
- [ ] **Performance Monitoring**: Vercel Dashboard beobachten
- [ ] **Error Logs**: Keine kritischen Fehler
- [ ] **Backup Strategy**: Repository regelmäßig sichern

---

## 🆘 **Troubleshooting**

### **API Connection Failed**
1. **Environment Variables** prüfen
2. **Railway API** Status checken
3. **CORS Settings** in FastAPI prüfen

### **Build Failed**
1. **TypeScript Errors** beheben
2. **Missing Dependencies** installieren
3. **Node.js Version** kompatibel

### **Domain Issues**
1. **DNS Propagation** abwarten (24h)
2. **Vercel Domain Settings** prüfen
3. **SSL Certificate** Status checken

**✅ Wenn alle Punkte abgehakt sind: UmrahCheck Frontend ist LIVE!** 🚀