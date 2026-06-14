document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.marks-unfold-content').forEach(container => {
        const items = container.querySelectorAll('.wp-block-marks-unfold-content-item');
        if (!items.length) return;

        // ── Wrap body content ────────────────────────────────────
        items.forEach(item => {
            item.classList.remove('is-active');

            const content = item.querySelector('.unfold-content');
            if (!content) return;

            const children = Array.from(content.children);
            if (children.length < 2) return;

            const body = document.createElement('div');
            body.className = 'unfold-body';

            const inner = document.createElement('div');
            inner.className = 'unfold-inner';
            children.slice(1).forEach(child => {
                inner.appendChild(child);
            });
            body.appendChild(inner);
            content.appendChild(body);
        });

        // ── Activate first item ──────────────────────────────────
        items[0].classList.add('is-active');

        // ── Click handlers ───────────────────────────────────────
        items.forEach(item => {
            const wrapper = item;
            if (!wrapper) return;

            wrapper.addEventListener('click', () => {
                const isAlreadyActive = item.classList.contains('is-active');

                // Remove active from all items
                items.forEach(sibling => {
                    sibling.classList.remove('is-active');
                    sibling.style.marginTop = '';
                });

                // Open the clicked item only if it wasn't already open
                if (!isAlreadyActive) {
                    // rAF ensures the "remove" paint happens before "add"
                    // giving CSS transitions a clean starting point.
                    requestAnimationFrame(() => {
                        item.classList.add('is-active');
                        if (item !== items[0]) {
                            item.style.marginTop = '30px';
                        }
                    });
                }
            });
        });
    });
});
