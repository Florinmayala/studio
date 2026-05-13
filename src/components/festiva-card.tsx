"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Gift, Crown, Share2, Volume2, VolumeX, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ConfettiCanvas, { ConfettiRef } from './confetti-canvas';
import { Badge } from '@/components/ui/badge';

interface FestivaCardProps {
  personalizedMessage?: string;
}

export function FestivaCard({ personalizedMessage }: FestivaCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const confettiRef = useRef<ConfettiRef>(null);
  
  const profileImg = PlaceHolderImages.find(img => img.id === 'birthday-person');

  const handleReveal = () => {
    setIsRevealed(true);
    confettiRef.current?.fire();
    if (!isMuted) {
      const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
      audio.volume = 0.4;
      audio.play().catch(e => console.log("Audio play blocked by browser"));
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto p-4 perspective-1000">
      <ConfettiCanvas ref={confettiRef} />
      
      <Card className="glass-panel overflow-hidden border-none animate-float rounded-[2.5rem]">
        <CardContent className="p-8 md:p-12 flex flex-col items-center text-center space-y-8">
          
          {/* Header Area */}
          <div className="relative">
            <div className="absolute -top-10 -right-2 transform rotate-12 z-20">
              <Crown className="w-12 h-12 text-yellow-400 fill-yellow-400 filter drop-shadow-md animate-bounce" />
            </div>
            <div className="relative w-48 h-64 rounded-3xl p-1 bg-gradient-to-tr from-primary via-accent to-yellow-400 animate-pulse-glow">
              <div className="w-full h-full rounded-[1.4rem] overflow-hidden border-4 border-background relative bg-muted flex items-center justify-center">
                {profileImg?.imageUrl && !imageError ? (
                  <Image
                    src={profileImg.imageUrl}
                    alt="Blessing"
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                    priority
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground p-4">
                    <User className="w-16 h-16 mb-2 opacity-20" />
                    <span className="text-xs text-center">Image non trouvée dans /public</span>
                    <span className="text-[10px] mt-2 opacity-50 px-4">IMG_1292.JPG</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Titles */}
          <div className="space-y-2">
            <Badge variant="outline" className="border-primary text-primary px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
              Célébration Royale
            </Badge>
            <h1 className="text-4xl md:text-6xl dancing-headline text-white leading-tight">
              Joyeux Anniversaire Blessing !
            </h1>
            <p className="text-muted-foreground font-light text-lg">
              À la personne la plus incroyable aujourd'hui.
            </p>
          </div>

          {/* Interactive Reveal Area */}
          <div className="w-full relative min-h-[120px] flex items-center justify-center">
            {!isRevealed ? (
              <Button 
                onClick={handleReveal}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-10 py-8 rounded-2xl text-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl group"
              >
                <Gift className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                Révéler la Surprise
              </Button>
            ) : (
              <div className="animate-in fade-in zoom-in duration-700 w-full">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Gift className="w-20 h-20 text-accent" />
                  </div>
                  <p className="text-xl md:text-2xl font-medium text-white italic leading-relaxed font-headline">
                    {personalizedMessage || "Je te souhaite une journée aussi brillante que ton sourire et aussi belle que ton cœur, Blessing. Que chaque instant soit rempli de la joie que tu apportes au monde ! BISOUS FLORIN"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-center gap-6 pt-4 border-t border-white/10 w-full">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-muted-foreground hover:text-white"
              title="Activer/Désactiver le son"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button 
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-muted-foreground hover:text-white"
              title="Partager la carte"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
