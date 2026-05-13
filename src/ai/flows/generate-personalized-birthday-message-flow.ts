
'use server';
/**
 * @fileOverview Un flux Genkit pour générer des vœux d'anniversaire personnalisés.
 *
 * - generatePersonalizedBirthdayMessage - Une fonction qui génère un message d'anniversaire personnalisé.
 * - GeneratePersonalizedBirthdayMessageInput - Le type d'entrée pour la fonction.
 * - GeneratePersonalizedBirthdayMessageOutput - Le type de sortie pour la fonction.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GeneratePersonalizedBirthdayMessageInputSchema = z.object({
  relationshipType: z
    .string()
    .describe(
      'Le type de relation avec la personne dont c\'est l\'anniversaire (ex: "ami proche", "famille", "partenaire", "collègue").'
    ),
  sharedMemories: z
    .string()
    .describe(
      'Souvenirs partagés ou blagues privées à incorporer dans le message.'
    ),
  messageTone: z
    .string()
    .optional()
    .describe(
      'Le ton souhaité pour le message (ex: "sincère", "humoristique", "inspirant", "poétique").'
    ),
});
export type GeneratePersonalizedBirthdayMessageInput = z.infer<
  typeof GeneratePersonalizedBirthdayMessageInputSchema
>;

const GeneratePersonalizedBirthdayMessageOutputSchema = z.object({
  birthdayMessage: z
    .string()
    .describe('Un message d\'anniversaire personnalisé en français, émouvant et unique.'),
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
  prompt: `Tu es un expert en rédaction de vœux d'anniversaire, capable de créer des messages personnalisés, émouvants et uniques.
Ton but est de créer un message chaleureux et mémorable pour une carte d'anniversaire interactive.

**IMPORTANT : Ton message doit être rédigé exclusivement en français.**

Détails à prendre en compte :
Type de relation : {{{relationshipType}}}
Souvenirs communs : {{{sharedMemories}}}
Ton souhaité : {{{messageTone}}} (Si non spécifié, utilise un ton sincère et chaleureux.)

Rédige un vœu d'anniversaire sincère qui reflète le lien spécial que vous partagez, en intégrant les souvenirs mentionnés de manière naturelle et touchante. Le message doit être adapté à la relation et au ton demandés. Fais en sorte qu'il soit exceptionnel.

Message d'anniversaire :`,
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
