export const ALL_MODELS = [
   "gpt-4",
   "gpt-4-1106-preview",
   "gpt-4-vision-preview",
   "gpt-3.5-turbo",
   "gpt-3.5-turbo-16k",
];

export type LLMConfig = {
   model: (typeof ALL_MODELS)[number];
   temperature?: number;
   topP?: number;
   sendMemory?: boolean;
   maxTokens?: number;
};
