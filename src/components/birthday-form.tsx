
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
  relationshipType: z.string().min(1, "Required"),
  sharedMemories: z.string().min(5, "Tell us a bit more!"),
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
      messageTone: 'heartfelt',
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
              <FormLabel>Relationship</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue placeholder="Who are they to you?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="close friend">Close Friend</SelectItem>
                  <SelectItem value="partner">Partner</SelectItem>
                  <SelectItem value="family member">Family Member</SelectItem>
                  <SelectItem value="colleague">Colleague</SelectItem>
                  <SelectItem value="bestie">Best Friend Forever</SelectItem>
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
              <FormLabel>Shared Memories or Jokes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="e.g. that trip to Italy; the coffee spill; our cat obsession..." 
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
              <FormLabel>Tone</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="heartfelt">Heartfelt</SelectItem>
                  <SelectItem value="humorous">Humorous</SelectItem>
                  <SelectItem value="inspirational">Inspirational</SelectItem>
                  <SelectItem value="poetic">Poetic</SelectItem>
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
          {loading ? 'Synthesizing...' : 'Generate Magic Wish'}
        </Button>
      </form>
    </Form>
  );
}
