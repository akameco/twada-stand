'use strict';

const speech = new webkitSpeechRecognition(); // eslint-disable-line
speech.lang = 'ja-JP';
speech.onerror = (ev) => {
	console.log(ev);
	speech.stop();
};
speech.onnomatch = () => speech.stop();
speech.onend = () => {
	speech.stop();
	speech.start();
};

document.addEventListener('DOMContentLoaded', () => {
	const mainEl = document.querySelector('#main');
	speech.onresult = event => {
		const results = event.results;
		if (results[0] && results[0][0]) {
			const said = results[0][0].transcript.trim();
			console.log(said);
			if (/^テスト.*ない$/.test(said)) {
				mainEl.innerHTML = `<img src='./twada.png'>`;
				setTimeout(() => {
					mainEl.innerHTML = null;
				}, 2000);
			}
		}
	};

	speech.start();
});
