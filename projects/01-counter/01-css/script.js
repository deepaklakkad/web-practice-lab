// Counter logic with bounds and animations
(() => {
	const MIN = 1;
	const MAX = 9999;

	const valueSpan = document.querySelector('.value span');
	const bubble = document.querySelector('.value');
	const btnPlus = document.querySelector('.btn.plus');
	const btnMinus = document.querySelector('.btn.minus');

	if (!valueSpan || !bubble || !btnPlus || !btnMinus) return;

	const getValue = () => {
		const n = parseInt(valueSpan.textContent, 10);
		return Number.isFinite(n) ? n : MIN;
	};

	const clamp = (n) => Math.min(MAX, Math.max(MIN, n));

	const updateButtons = (val) => {
		btnPlus.disabled = val >= MAX;
		btnMinus.disabled = val <= MIN;
		btnPlus.setAttribute('aria-disabled', String(btnPlus.disabled));
		btnMinus.setAttribute('aria-disabled', String(btnMinus.disabled));
	};

	const triggerAnimation = (direction) => {
		const cls = direction === 'inc' ? 'animate-inc' : 'animate-dec';
		bubble.classList.remove('animate-inc', 'animate-dec');
		// Force reflow so same animation can retrigger
		void bubble.offsetWidth;
		bubble.classList.add(cls);
	};

	bubble.addEventListener('animationend', (e) => {
		if (e.animationName === 'bumpInc' || e.animationName === 'bumpDec') {
			bubble.classList.remove('animate-inc', 'animate-dec');
		}
	});

	btnPlus.addEventListener('click', () => {
		const current = getValue();
		if (current >= MAX) return; // no change at upper bound
	    const next = clamp(current + 1);
		valueSpan.textContent = String(next);
		updateButtons(next);
		triggerAnimation('inc');
	});

	btnMinus.addEventListener('click', () => {
		const current = getValue();
		if (current <= MIN) return; // no change at lower bound
		const next = clamp(current - 1);
		valueSpan.textContent = String(next);
		updateButtons(next);
		triggerAnimation('dec');
	});

	// Initialize button states on load
	updateButtons(getValue());
})();

