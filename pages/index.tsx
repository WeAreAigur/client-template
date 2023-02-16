import { FormEvent, useState } from 'react';
import { jokeGptPipeline } from '#/pipelines/jokegpt';

export default function Home() {
	const [subject, setSubject] = useState<string>('');
	const [joke, setJoke] = useState<string>('');

	const fetchJoke = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		jokeGptPipeline.vercel.invokeStream({ subject }, (str) => {
			setJoke((joke) => joke + str);
		});
	};

	return (
		<div>
			<form onSubmit={fetchJoke}>
				<input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
				<button type="submit">Fetch Me a Joke Ye Olde Jokester</button>
			</form>
			<p>{joke}</p>
		</div>
	);
}
