'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

// Physical gift options
const GIFT_ITEMS = [
  { id: 'kitchenaid', name: 'KitchenAid Stand Mixer', description: 'Professional 5-quart mixer in our chosen color', price: '€450', emoji: '🍰' },
  { id: 'dyson-vacuum', name: 'Dyson V15 Vacuum', description: 'Cordless vacuum for our new home', price: '€650', emoji: '🧹' },
  { id: 'nespresso', name: 'Nespresso Vertuo Machine', description: 'Coffee machine with milk frother', price: '€280', emoji: '☕' },
  { id: 'le-creuset', name: 'Le Creuset Dutch Oven', description: '5.5 quart round dutch oven', price: '€350', emoji: '🍲' },
  { id: 'airfryer', name: 'Philips Airfryer XXL', description: 'Large capacity air fryer', price: '€250', emoji: '🍟' },
  { id: 'luggage-set', name: 'Samsonite Luggage Set', description: 'Matching 3-piece luggage for our honeymoon travels', price: '€500', emoji: '🧳' },
  { id: 'wine-fridge', name: 'Wine Cooler', description: '24-bottle wine refrigerator', price: '€400', emoji: '🍷' },
  { id: 'bedding', name: 'Luxury Bedding Set', description: 'Egyptian cotton king-size sheets and duvet', price: '€300', emoji: '🛏️' },
  { id: 'artwork', name: 'Commissioned Artwork', description: 'Custom painting for our living room', price: '€600', emoji: '🎨' },
  { id: 'camera', name: 'Polaroid Camera', description: 'Instant camera with film packs', price: '€180', emoji: '📸' },
  { id: 'blanket', name: 'Cashmere Throw Blanket', description: 'Luxury throw for cozy evenings', price: '€200', emoji: '🧶' },
  { id: 'garden', name: 'Garden Set', description: 'Quality garden tools and planters', price: '€250', emoji: '🌱' },
];

interface ClaimModalProps {
  gift: typeof GIFT_ITEMS[0];
  onClose: () => void;
  onClaim: (name: string) => void;
}

function ClaimModal({ gift, onClose, onClaim }: ClaimModalProps) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSubmitting(true);
    await onClaim(name);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-md w-full p-8 shadow-xl">
        <h3 className="font-serif text-2xl text-primary-800 mb-4">
          {gift.emoji} {gift.name}
        </h3>
        <p className="text-primary-600 mb-6">{gift.description}</p>
        <p className="text-gold-600 font-medium mb-6">{gift.price}</p>
        
        <form onSubmit={handleSubmit}>
          <label className="block text-primary-700 font-medium mb-2">
            Your name (to confirm this gift)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="input-field mb-6"
            required
          />
          
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-primary-300 text-primary-600 hover:bg-primary-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim()}
              className="flex-1 btn-primary"
            >
              {isSubmitting ? 'Claiming...' : 'Claim This Gift'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function GiftsPage() {
  const t = useTranslations('gifts');
  const [claimedGifts, setClaimedGifts] = useState<string[]>([]);
  const [selectedGift, setSelectedGift] = useState<typeof GIFT_ITEMS[0] | null>(null);
  const [claimSuccess, setClaimSuccess] = useState<string | null>(null);

  useEffect(() => {
    // Fetch claimed gifts on load
    fetch('/api/gifts')
      .then(res => res.json())
      .then(data => setClaimedGifts(data.claimedGifts || []))
      .catch(console.error);
  }, []);

  const handleClaim = async (giftId: string, claimedBy: string) => {
    try {
      const response = await fetch('/api/gifts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ giftId, claimedBy }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setClaimedGifts([...claimedGifts, giftId]);
        setClaimSuccess(giftId);
        setTimeout(() => setClaimSuccess(null), 3000);
      } else if (data.claimed) {
        // Already claimed, refresh the list
        setClaimedGifts([...claimedGifts, giftId]);
        alert('This gift was just claimed by someone else!');
      }
    } catch (error) {
      console.error('Error claiming gift:', error);
      alert('Something went wrong. Please try again.');
    }
    
    setSelectedGift(null);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-24 bg-primary-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-title">{t('title')}</h1>
          <p className="section-subtitle">{t('subtitle')}</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-lg text-primary-600">
            Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, 
            we&apos;ve put together some options below.
          </p>
        </div>
      </section>

      {/* Monetary Contribution - Primary */}
      <section className="py-24 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white p-8 md:p-12 border-2 border-gold-300 shadow-lg">
            <div className="text-center mb-8">
              <span className="text-5xl">💝</span>
              <h2 className="font-serif text-3xl text-primary-800 mt-4">Honeymoon Fund</h2>
              <div className="h-px w-24 bg-gold-500 mx-auto my-6"></div>
            </div>
            
            <p className="text-primary-600 text-center text-lg mb-4">
              <strong>This is our preferred option!</strong>
            </p>
            <p className="text-primary-600 text-center mb-8">
              As we&apos;re setting up our new home in Berlin, a monetary contribution towards our honeymoon 
              adventure would mean the world to us. We&apos;re dreaming of exploring new places together and 
              creating unforgettable memories.
            </p>
            
            <div className="bg-gold-50 p-6 text-center border border-gold-200">
              <p className="text-primary-700 mb-4">
                If you&apos;d like to contribute to our honeymoon fund, please request our bank details:
              </p>
              <a 
                href="mailto:pierre.blanchet.engineer@gmail.com?subject=Wedding Gift - Bank Details Request"
                className="btn-primary inline-block"
              >
                Request Bank Details
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Physical Gifts */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-primary-800 mb-2">Physical Gift Registry</h2>
            <p className="text-primary-600">
              If you prefer to give something tangible, here are some items we&apos;d love. 
              Click to claim a gift — once claimed, it will be marked as taken (anonymously).
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GIFT_ITEMS.map((gift) => {
              const isClaimed = claimedGifts.includes(gift.id);
              const justClaimed = claimSuccess === gift.id;
              
              return (
                <div 
                  key={gift.id}
                  className={`card relative transition-all ${
                    isClaimed 
                      ? 'opacity-60 bg-gray-50' 
                      : 'hover:shadow-lg cursor-pointer'
                  } ${justClaimed ? 'ring-2 ring-sage-500' : ''}`}
                  onClick={() => !isClaimed && setSelectedGift(gift)}
                >
                  {isClaimed && (
                    <div className="absolute top-2 right-2 bg-primary-200 text-primary-700 text-xs px-2 py-1 rounded">
                      ✓ Claimed
                    </div>
                  )}
                  {justClaimed && (
                    <div className="absolute top-2 right-2 bg-sage-500 text-white text-xs px-2 py-1 rounded">
                      ✓ Thank you!
                    </div>
                  )}
                  <div className="text-3xl mb-2">{gift.emoji}</div>
                  <h3 className="font-serif text-xl text-primary-800 mb-2">{gift.name}</h3>
                  <p className="text-primary-500 text-sm mb-4">{gift.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${isClaimed ? 'text-gray-400' : 'text-gold-600'}`}>
                      {gift.price}
                    </span>
                    {!isClaimed && (
                      <span className="text-sm text-sage-600 hover:text-sage-800">
                        Click to claim →
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-12 p-6 bg-primary-50 border border-primary-200">
            <p className="text-primary-600 italic">
              Once you claim a gift, please contact us to coordinate delivery or purchase. 
              We&apos;ll happily provide specific preferences (colors, sizes, etc.)
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-primary-200 mb-6">
            Questions about gifts? Get in touch!
          </p>
          <div className="space-y-2">
            <p>
              <a href="mailto:pierre.blanchet.engineer@gmail.com" className="text-gold-300 hover:text-gold-200">
                pierre.blanchet.engineer@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Claim Modal */}
      {selectedGift && (
        <ClaimModal
          gift={selectedGift}
          onClose={() => setSelectedGift(null)}
          onClaim={(name) => handleClaim(selectedGift.id, name)}
        />
      )}
    </div>
  );
}
