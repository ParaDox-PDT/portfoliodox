# Flutter Developer Portfolio

A modern, data-driven portfolio website built with Next.js 14, Tailwind CSS, and Firebase. Perfect for Flutter developers looking to showcase their work to international recruiters.

![Portfolio Preview](./preview.png)

## ✨ Features

### Public Website
- 🚀 **Hero Section** - Animated intro with stats and CTAs
- 👤 **About Section** - Professional summary with highlights
- 💡 **Skills Section** - Categorized skills with level indicators
- 📋 **Experience Timeline** - Work history with technologies
- 🖼️ **Projects Grid** - Featured work with details pages
- 🏆 **Certificates** - Professional credentials display
- 📧 **Contact Form** - Easy-to-use contact section

### Admin Panel
- 🔐 **Firebase Authentication** - Secure admin access
- ✏️ **Full CRUD Operations** - Manage all content
- 📤 **Image Uploads** - Firebase Storage integration
- 🔄 **Real-time Updates** - Changes reflect immediately

### Technical Features
- ⚡ **Next.js 14 App Router** - Latest React framework
- 🎨 **Tailwind CSS** - Utility-first styling
- 🎬 **Framer Motion** - Smooth animations
- 🌓 **Dark Mode** - System preference + toggle
- 📱 **Fully Responsive** - Mobile-first design
- 🔍 **SEO Optimized** - Meta tags and structured data

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Auth**: Firebase Authentication
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Firestore, Storage, and Authentication
   - Copy your config to environment variables

4. **Configure environment**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your Firebase credentials:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
portfolio-next/
├── src/
│   ├── app/
│   │   ├── admin/              # Admin panel pages
│   │   │   ├── login/
│   │   │   ├── profile/
│   │   │   ├── skills/
│   │   │   ├── experience/
│   │   │   ├── projects/
│   │   │   └── certificates/
│   │   ├── projects/
│   │   │   └── [slug]/         # Dynamic project pages
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Home page
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/             # Navbar, Footer
│   │   ├── sections/           # Homepage sections
│   │   └── ui/                 # Reusable UI components
│   ├── context/
│   │   └── AuthContext.tsx     # Authentication context
│   ├── lib/
│   │   ├── firebase.ts         # Firebase initialization
│   │   ├── firestore.ts        # Database operations
│   │   ├── storage.ts          # File uploads
│   │   └── utils.ts            # Helper functions
│   └── types/
│       └── index.ts            # TypeScript types
├── public/
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🗄️ Firebase Structure

### Firestore Collections

**profile** (single document: `main`)
```typescript
{
  name: string;
  title: string;
  subtitle: string;
  email: string;
  bio: string;
  summary: string;
  avatarUrl: string;
  // ... social links, stats
}
```

**skills**
```typescript
{
  name: string;
  category: 'mobile' | 'architecture' | 'backend' | 'tools';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  order: number;
}
```

**experience**
```typescript
{
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
  // ...
}
```

**projects**
```typescript
{
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  thumbnailUrl: string;
  technologies: string[];
  isFeatured: boolean;
  // ...
}
```

**certificates**
```typescript
{
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string;
  imageUrl: string;
  // ...
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Firebase Rules

Set up Firestore security rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access
    match /{collection}/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Storage rules:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: { /* cyan/teal palette */ },
  secondary: { /* purple palette */ },
}
```

### Fonts
The portfolio uses:
- **Outfit** - Main font
- **JetBrains Mono** - Code/mono font

Update in `globals.css` to change fonts.

### Content
All content is managed through the admin panel at `/admin`.

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a PR.

---

Built with ❤️ for Flutter developers worldwide.

