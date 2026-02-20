'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// Inline translations for the login page (outside [locale] routing)
const translations = {
  en: {
    title: "Amalie & Pierre",
    welcome: "Welcome",
    instruction: "Please enter the password from your invitation",
    passwordLabel: "Password",
    submitButton: "Enter",
    errorMessage: "Incorrect password. Please try again.",
    loadingMessage: "Checking..."
  },
  fr: {
    title: "Amalie & Pierre",
    welcome: "Bienvenue",
    instruction: "Veuillez entrer le mot de passe de votre invitation",
    passwordLabel: "Mot de passe",
    submitButton: "Entrer",
    errorMessage: "Mot de passe incorrect. Veuillez réessayer.",
    loadingMessage: "Vérification..."
  },
  de: {
    title: "Amalie & Pierre",
    welcome: "Willkommen",
    instruction: "Bitte geben Sie das Passwort von Ihrer Einladung ein",
    passwordLabel: "Passwort",
    submitButton: "Eintreten",
    errorMessage: "Falsches Passwort. Bitte versuchen Sie es erneut.",
    loadingMessage: "Wird geprüft..."
  }
};

function getLanguage(): 'en' | 'fr' | 'de' {
  if (typeof navigator === 'undefined') return 'en';
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith('fr')) return 'fr';
  if (lang.startsWith('de')) return 'de';
  return 'en';
}

function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<'en' | 'fr' | 'de'>('en');
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    setLang(getLanguage());
  }, []);

  const t = translations[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    try {
      const res = await fetch('/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push(redirect);
        router.refresh();
      } else {
        setError(true);
        setPassword('');
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Decorative element */}
        <div className="mb-8">
          <p className="font-serif text-primary-400 text-lg tracking-widest uppercase mb-2">
            {t.title}
          </p>
          <div className="w-16 h-px bg-gold-400 mx-auto" />
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-light text-primary-800 mb-2">
          {t.welcome}
        </h1>
        <p className="text-primary-500 font-light mb-10">
          {t.instruction}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.passwordLabel}
              className="input-field text-center tracking-widest"
              autoFocus
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm font-light">
              {t.errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? t.loadingMessage : t.submitButton}
          </button>
        </form>

        <div className="mt-12">
          <div className="w-8 h-px bg-primary-200 mx-auto" />
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <p className="text-primary-400">Loading...</p>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
