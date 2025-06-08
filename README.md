# VESA Web

VESA Web është një aplikacion modern edukativ i ndërtuar me **Next.js** dhe **TypeScript**, që ofron përshkrime të kurseve të programimit, lajme, dhe një formë kontakti për përdoruesit. Aplikacioni mbështet autentifikim dhe autorizim, përfshirë hyrjen me **Google OAuth**. Administratorët kanë mundësinë të krijojnë, lexojnë, përditësojnë dhe fshijnë kurset dhe lajmet përmes një paneli të thjeshtë për përdorim.

---

## 📌 Funksionalitetet Kryesore

- 📚 Listimi dhe përshkrimi i kurseve të programimit
- 📰 Lajme të përditësuara nga fusha e teknologjisë
- 📬 Formë kontakti për përdoruesit
- 🔐 Autentifikim me Google (OAuth)
- 🔧 Panel për administratorë për menaxhimin e përmbajtjes (CRUD për kurset dhe lajmet)

---

## 🚀 Linku i Aplikacionit Live

👉 [https://vesa-web.vercel.app/](https://vesa-web.vercel.app/)

---

## 🛠️ Udhëzime Instalimi

Ky projekt është ndërtuar me **Next.js** dhe **TypeScript**. Ndiqni këto hapa për ta ekzekutuar në mënyrë lokale:

1. **Klono projektin**
   ```bash
   git clone https://github.com/username/vesa-web.git
   cd vesa-web

2.**Instalo varësitë**
 ```bash
npm install

3.**Krijo një skedar .env.local dhe vendos variablat e nevojshme të mjedisit**

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

4.Starto aplikacionin në zhvillim
```bash
npm run dev




