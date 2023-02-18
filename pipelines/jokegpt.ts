import { aigur } from '#/services/aigur';

import { gpt3PredictionStream, replaceString } from '@aigur/client';

export const jokeGptPipeline = aigur.pipeline.create<{ subject: string }, ReadableStream>({
	id: 'jokegpt',
	stream: true,
	flow: (flow) =>
		flow
			.node(replaceString, ({ input }) => ({
				text: input.subject,
				modifier: 'tell me a joke about $(text)$',
			}))
			.node(gpt3PredictionStream, ({ prev }) => ({
				prompt: prev.text,
			}))
			.output(({ prev }) => prev.stream),
});
