import { Aigur, createClient } from '@aigur/client';

export const aigur: Aigur = createClient({
	apiKeys: {
		openai: process.env.OPENAI_KEY!,
	},
});
