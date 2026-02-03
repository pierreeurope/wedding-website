# Amalie & Pierre Wedding Website

A beautiful, trilingual wedding website built with Next.js, deployed on AWS Amplify.

## Features

- **Trilingual Support**: English, French, and German with easy language switching
- **Responsive Design**: Beautiful on all devices
- **RSVP System**: Collect guest responses with dietary requirements
- **Gift Registry**: Honeymoon fund + gift list with coordination
- **Travel Information**: How to get to the venue from Frankfurt
- **Accommodation Guide**: Castle rooms, Airbnb, and nearby hotels

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl
- **Deployment**: AWS Amplify
- **Backend**: AWS Amplify API (optional) / Static Export

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Building for Production

```bash
npm run build
```

This creates a static export in the `out` directory.

## Deployment to AWS Amplify

### Option 1: Static Site (Recommended for simplicity)

1. Push this repository to GitHub
2. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
3. Click "New app" > "Host web app"
4. Connect your GitHub repository
5. Amplify will auto-detect the Next.js framework
6. Deploy!

The `amplify.yml` is already configured for static export.

### Option 2: With Amplify Backend (For RSVP storage)

If you want to store RSVPs in DynamoDB:

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure Amplify
amplify configure

# Initialize Amplify in the project
amplify init

# Add API (REST with Lambda + DynamoDB)
amplify add api

# Push to cloud
amplify push
```

Then update `src/app/api/rsvp/route.ts` to use Amplify's API.

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # Localized pages
│   │   ├── page.tsx        # Home
│   │   ├── schedule/       # Wedding timeline
│   │   ├── venue/          # Venue & region info
│   │   ├── travel/         # Getting there
│   │   ├── accommodation/  # Where to stay
│   │   ├── gifts/          # Gift registry
│   │   └── rsvp/           # RSVP form
│   ├── api/                # API routes
│   └── globals.css         # Global styles
├── components/             # React components
├── i18n/                   # Internationalization config
└── middleware.ts           # i18n middleware
messages/
├── en.json                 # English translations
├── fr.json                 # French translations
└── de.json                 # German translations
images/                     # Wedding images
```

## Customization

### Updating Content

Edit the translation files in `messages/` folder:
- `en.json` - English
- `fr.json` - French  
- `de.json` - German

### Styling

Colors and fonts are defined in `tailwind.config.ts`:
- Primary colors: Warm earth tones
- Gold accents: For highlights
- Sage green: For success states
- Fonts: Cormorant Garamond (serif) + Montserrat (sans)

### Images

Replace images in the `images/` folder:
- `castle pic*.png` - Venue photos
- `Proposal.JPG` - Couple photo

Images should be moved to `public/images/` for production.

## Wedding Details

- **Date**: Saturday, October 3rd, 2026
- **Ceremony**: 12:00 PM at Rheingauer Dom
- **Reception**: Burg Schwarzenstein
- **Brunch**: Sunday 11:00 AM

## Contact

Pierre Blanchet
- Email: pierre.blanchet.engineer@gmail.com
- Phone: +33 6 49 36 24 91

---

Made with ♥ for Amalie & Pierre
