
"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Loader2 } from 'lucide-react';
import { generatePersonalizedBirthdayMessage } from '@/ai/flows/generate-personalized-birthday-message-flow';

const formSchema = z.object({
  relationshipType: z.string().min(1, "Ce champ est requis"),
  sharedMemories: z.string().min(5, "Dites-en nous un peu plus !"),
  messageTone: z.string().optional(),
});

interface BirthdayFormProps {
  onMessageGenerated: (message: string) => void;
}

export function BirthdayForm({ onMessageGenerated }: BirthdayFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      relationshipType: '',
      sharedMemories: '',
      messageTone: 'sincère',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await generatePersonalizedBirthdayMessage({
        relationshipType: values.relationshipType,
        sharedMemories: values.sharedMemories,
        messageTone: values.messageTone,
      });
      onMessageGenerated(response.birthdayMessage);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="relationshipType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relation</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue placeholder="Qui sont-ils pour vous ?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ami proche">Ami(e) proche</SelectItem>
                  <SelectItem value="partenaire">Partenaire</SelectItem>
                  <SelectItem value="membre de la famille">Membre de la famille</SelectItem>
                  <SelectItem value="collègue">Collègue</SelectItem>
                  <SelectItem value="meilleur ami">Meilleur(e) ami(e)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sharedMemories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Souvenirs ou anecdotes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="ex: ce voyage à Paris ; la chute de café ; notre passion pour les chats..." 
                  className="bg-white/5 border-white/10 resize-none h-24"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="messageTone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ton du message</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue placeholder="Sélectionnez un ton" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sincère">Sincère</SelectItem>
                  <SelectItem value="humoristique">Humoristique</SelectItem>
                  <SelectItem value="inspirant">Inspirant</SelectItem>
                  <SelectItem value="poétique">Poétique</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl group"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4 group-hover:animate-pulse" />
          )}
          {loading ? 'Synthèse en cours...' : 'Générer le Vœu Magique'}
        </Button>
      </form>
    </Form>
  );
}
