
"use client";

import React, { useState } from 'react';
import { BirthdayForm } from '@/components/birthday-form';
import { FestivaCard } from '@/components/festiva-card';
import { Sparkles, Calendar, Heart, Zap } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  const [personalizedMessage, setPersonalizedMessage] = useState<string>('');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-12 px-4 md:px-8 bg-background relative overflow-hidden">
      
      {/* Émojis décoratifs en arrière-plan */}
      <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-10 left-[10%] animate-float text-4xl">🎂</div>
        <div className="absolute top-[20%] right-[15%] animate-float text-6xl delay-700">🎈</div>
        <div className="absolute bottom-[15%] left-[20%] animate-float text-5xl delay-1000">🥂</div>
        <div className="absolute bottom-[20%] right-[10%] animate-float text-4xl delay-500">✨</div>
      </div>

      <div className="container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Côté gauche : Marque & Générateur */}
        <div className="flex flex-col space-y-8 text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl font-bold tracking-tighter text-white">Festiva AI</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
              Sublimez chaque <span className="text-primary italic">Célébration</span>.
            </h2>
            <p className="text-xl text-muted-foreground font-light max-w-lg leading-relaxed">
              Créez des vœux d'anniversaire profondément personnels et émouvants grâce à l'IA, présentés dans une expérience luxueuse et interactive.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-[2rem] border-white/5">
            <Tabs defaultValue="generator" className="w-full">
              <TabsList className="bg-white/5 border border-white/10 w-full p-1 h-12 rounded-xl mb-6">
                <TabsTrigger value="generator" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">
                  <Zap className="w-4 h-4 mr-2" /> Synthétiseur de Vœux
                </TabsTrigger>
                <TabsTrigger value="about" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">
                   Fonctionnalités
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="generator">
                <BirthdayForm onMessageGenerated={(msg) => setPersonalizedMessage(msg)} />
              </TabsContent>
              
              <TabsContent value="about">
                <div className="space-y-6 py-4">
                  <FeatureItem 
                    icon={<Heart className="text-accent" />} 
                    title="Profondeur Émotionnelle" 
                    desc="Une IA qui comprend les nuances des relations pour rédiger des messages sincères."
                  />
                  <FeatureItem 
                    icon={<Calendar className="text-primary" />} 
                    title="Touche Personnalisée" 
                    desc="Intégrez vos souvenirs communs et vos blagues privées en toute fluidité."
                  />
                  <FeatureItem 
                    icon={<Zap className="text-yellow-400" />} 
                    title="Magie Instantanée" 
                    desc="Génération en temps réel de cartes élégantes avec des effets visuels haut de gamme."
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Côté droit : La carte interactive */}
        <div className="flex justify-center items-center">
          <FestivaCard personalizedMessage={personalizedMessage} />
        </div>
      </div>

      {/* Pied de page */}
      <footer className="mt-20 text-muted-foreground/40 text-sm font-medium tracking-widest uppercase">
        Festiva AI &copy; {new Date().getFullYear()} — Créateur de Moments
      </footer>
    </main>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="text-white font-bold">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
