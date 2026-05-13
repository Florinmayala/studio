'use server';
/**
 * @fileOverview A Genkit flow for generating personalized birthday messages.
 *
 * - generatePersonalizedBirthdayMessage - A function that generates a personalized birthday message.
 * - GeneratePersonalizedBirthdayMessageInput - The input type for the generatePersonalizedBirthdayMessage function.
 * - GeneratePersonalizedBirthdayMessageOutput - The return type for the generatePersonalizedBirthdayMessage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GeneratePersonalizedBirthdayMessageInputSchema = z.object({
  relationshipType: z
    .string()
    .describe(
      'The type of relationship with the birthday person (e.g., "close friend", "family member", "partner", "colleague").'
    ),
  sharedMemories: z
    .string()
    .describe(
      'Key shared memories or inside jokes to incorporate into the message, separated by semicolons. e.g., "that one trip to Hawaii; the time we pranked John; their love for cats"'
    ),
  messageTone: z
    .string()
    .optional()
    .describe(
      'The desired tone for the message (e.g., "heartfelt", "humorous", "inspirational"). Defaults to "heartfelt".'
    ),
});
export type GeneratePersonalizedBirthdayMessageInput = z.infer<
  typeof GeneratePersonalizedBirthdayMessageInputSchema
>;

const GeneratePersonalizedBirthdayMessageOutputSchema = z.object({
  birthdayMessage: z
    .string()
    .describe('A personalized, emotionally resonant birthday message.'),
});
export type GeneratePersonalizedBirthdayMessageOutput = z.infer<
  typeof GeneratePersonalizedBirthdayMessageOutputSchema
>;

export async function generatePersonalizedBirthdayMessage(
  input: GeneratePersonalizedBirthdayMessageInput
): Promise<GeneratePersonalizedBirthdayMessageOutput> {
  return generatePersonalizedBirthdayMessageFlow(input);
}

const generatePersonalizedBirthdayMessagePrompt = ai.definePrompt({
  name: 'generatePersonalizedBirthdayMessagePrompt',
  input: { schema: GeneratePersonalizedBirthdayMessageInputSchema },
  output: { schema: GeneratePersonalizedBirthdayMessageOutputSchema },
  prompt: `You are an expert birthday message generator, capable of crafting personalized, emotional, and unique birthday wishes.
Your goal is to create a heartfelt and memorable message for an interactive birthday card.

Consider the following details:
Relationship Type: {{{relationshipType}}}
Shared Memories: {{{sharedMemories}}}

Desired Tone: {{{messageTone}}} (If not specified, aim for a heartfelt and warm tone.)

Craft a birthday message that is sincere, reflects the bond you share, and incorporates the shared memories in a subtle yet meaningful way. The message should be appropriate for the specified relationship type and tone. Make it special and unique.

Birthday Message:`,
});

const generatePersonalizedBirthdayMessageFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedBirthdayMessageFlow',
    inputSchema: GeneratePersonalizedBirthdayMessageInputSchema,
    outputSchema: GeneratePersonalizedBirthdayMessageOutputSchema,
  },
  async (input) => {
    const { output } = await generatePersonalizedBirthdayMessagePrompt(input);
    return output!;
  }
);
