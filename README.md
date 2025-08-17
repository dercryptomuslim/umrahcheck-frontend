# 🚀 UmrahCheck Frontend - Ready for Vercel

## 🎯 **Quick Deploy auf Vercel**

### **1. Git Repository**
```bash
# Im Frontend-Ordner
cd /Users/mustafaali/dev/umrahcheck/frontend

# Git initialisieren
git init
git add .
git commit -m "✨ UmrahCheck Frontend - Production Ready"

# GitHub Repository erstellen und pushen
# (oder GitLab/Bitbucket)
```

### **2. Vercel Deployment**
1. Gehe zu [vercel.com](https://vercel.com)
2. **New Project** → Repository auswählen
3. **Framework**: Next.js (automatisch erkannt)
4. **Environment Variables** setzen:

```bash
# Production Env-Vars in Vercel Dashboard
NEXT_PUBLIC_API_BASE=https://deine-railway-api.up.railway.app
API_PROXY_TARGET=https://deine-railway-api.up.railway.app
NEXT_PUBLIC_WA_NUMBER=9665XXXXXXXX
```

### **3. Domain verbinden** 
1. **Vercel Dashboard** → Project → Domains
2. `umrahcheck.de` hinzufügen
3. DNS-Einträge in deiner Domain-Verwaltung setzen:
   ```
   A Record: @ → 76.76.19.19
   CNAME: www → cname.vercel-dns.com
   ```

## 🔧 **Local Development**

```bash
# Dependencies installieren
npm install

# Dev Server starten (Port 3000)
npm run dev

# Build testen
npm run build
npm start
```

**Wichtig**: Stelle sicher, dass deine API auf Port 8001 läuft:
```bash
cd ../api
python umrahcheck_api_fixed.py
```

## 🎯 **Features**

✅ **Hero-Section** wie umrahcheck.de  
✅ **Live API Integration** (Port 8001 ready)  
✅ **Hotel Recommendations** mit Preisvergleich  
✅ **WhatsApp Integration** für Kundenanfragen  
✅ **Responsive Design** (Mobile-First)  
✅ **Framer Motion** Animationen  
✅ **shadcn/ui** Components  
✅ **Tailwind CSS** Styling  

## 📊 **API Integration**

Das Frontend verwendet **Proxy-Routing** über `/api/*` um CORS zu vermeiden:

```typescript
// next.config.js
async rewrites() {
  return [
    { 
      source: "/api/:path*", 
      destination: `${process.env.API_PROXY_TARGET}/api/:path*` 
    }
  ];
}
```

## 🔄 **Workflow**

1. **Code ändern** → Automatischer Deploy via Git Push
2. **Environment Variables** → Vercel Dashboard
3. **Domain Updates** → Automatische SSL-Erneuerung
4. **Performance** → Vercel Analytics (optional)

## 💰 **Kosten**

- **Vercel Free**: Perfekt für Start (100GB Bandwidth/Monat)
- **Upgrade zu Pro**: Bei >100GB Traffic oder Team-Features (€20/Monat)

## 🎉 **Nächste Schritte**

1. **Frontend deployen** auf Vercel
2. **API Production URL** in Environment Variables setzen  
3. **WhatsApp Number** konfigurieren
4. **Domain verbinden** (umrahcheck.de)
5. **Live testen** mit echten Kunden!

**Dein UmrahCheck Frontend ist Vercel-ready!** 🚀