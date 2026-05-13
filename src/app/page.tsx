
"use client";

import React, { useState, useEffect } from 'react';
import { BirthdayForm } from '@/components/birthday-form';
import { FestivaCard } from '@/components/festiva-card';
import { Sparkles, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  const [personalizedMessage, setPersonalizedMessage] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-12 px-4 md:px-8 bg-background relative overflow-hidden">
      
      {/* Émojis décoratifs en arrière-plan */}
      <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-10 left-[10%] animate-float text-4xl">🎂</div>
        <div className="absolute top-[20%] right-[15%] animate-float text-6xl delay-700">🎈</div>
        <div className="absolute bottom-[15%] left-[20%] animate-float text-5xl delay-1000">🥂</div>
        <div className="absolute bottom-[20%] right-[10%] animate-float text-4xl delay-500">✨</div>
      </div>

      <div className="flex flex-col items-center space-y-12 relative z-10 w-full max-w-4xl">
        
        {/* En-tête minimaliste */}
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white">Festiva AI</span>
          </div>
        </div>

        {/* La carte interactive */}
        <div className="w-full flex justify-center items-center">
          <FestivaCard personalizedMessage={personalizedMessage} />
        </div>

        {/* Action pour générer ou modifier le message */}
        <div className="flex flex-col items-center space-y-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="rounded-full px-8 py-6 text-lg font-bold bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-sm group">
                <Wand2 className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Personnaliser le Vœu
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-panel border-white/10 sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                  <Wand2 className="text-primary" />
                  Créer un Vœu Magique
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <BirthdayForm onMessageGenerated={(msg) => {
                  setPersonalizedMessage(msg);
                  setIsDialogOpen(false);
                }} />
              </div>
            </DialogContent>
          </Dialog>
          <p className="text-muted-foreground/60 text-sm italic">
            Cliquez pour générer un message unique avec l'IA
          </p>
        </div>
      </div>

      {/* Pied de page */}
      <footer className="mt-20 text-muted-foreground/40 text-sm font-medium tracking-widest uppercase">
        Festiva AI &copy; {year || '2025'} — Créateur de Moments
      </footer>
    </main>
  );
}
