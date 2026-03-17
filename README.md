# PropFirm Forum Indonesia

Platform diskusi dan review prop firm untuk trader Indonesia. Website ringan dengan fokus pada komunitas dan perbandingan prop firm.

## Fitur Utama

- 🏠 **Homepage** - Top 7 prop firm terpercaya
- 🔄 **Compare Firms** - Bandingkan hingga 3 prop firm
- 💬 **Forum** - Diskusi dengan threading (komentar & balasan)
- ⭐ **Reviews** - Sistem rating 1-5 bintang
- 🎁 **Giveaways** - Akun funded gratis

## Tech Stack

- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS (Green theme)
- **Database**: SQLite (Prisma ORM)
- **Auth**: NextAuth.js
- **Deployment**: Vercel/cPanel compatible

## Setup

1. Install dependencies:
```bash
npm install
```

2. Setup database:
```bash
npx prisma generate
npx prisma db push
```

3. Create `.env` file:
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
npm start
```

## Deploy to cPanel

1. Build the project: `npm run build`
2. Upload files to cPanel
3. Setup Node.js app in cPanel
4. Set environment variables
5. Start the application

## Performance

- ✅ Pages load < 2 seconds on 4G
- ✅ Responsive mobile design
- ✅ Lightweight codebase
- ✅ SEO optimized

## Bahasa Indonesia

Semua teks dalam Bahasa Indonesia dan siap untuk multi-bahasa dengan i18n.

## Admin Features

- Remove spam comments
- Reset user ratings
- Manage giveaways
- Moderate forum posts

## License

© 2026 PropFirmID
