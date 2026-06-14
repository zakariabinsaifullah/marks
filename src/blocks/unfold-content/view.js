document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.marks-unfold-content').forEach(function (container) {
        var items = container.querySelectorAll('.wp-block-marks-unfold-content-item');
        if (!items.length) return;

        // ── Wrap body content ────────────────────────────────────
        items.forEach(function (item) {
            item.classList.remove('is-active');

            var content = item.querySelector('.unfold-content');
            if (!content) return;

            var children = Array.from(content.children);
            if (children.length < 2) return;

            var body = document.createElement('div');
            body.className = 'unfold-body';

            var inner = document.createElement('div');
            children.slice(1).forEach(function (child) {
                inner.appendChild(child);
            });
            body.appendChild(inner);
            content.appendChild(body);
        });

        // ── Activate first item ──────────────────────────────────
        items[0].classList.add('is-active');

        // ── Click handlers ───────────────────────────────────────
        items.forEach(function (item) {
            var wrapper = item.querySelector('.unfold-item-wrapper');
            if (!wrapper) return;

            wrapper.addEventListener('click', function () {
                var isAlreadyActive = item.classList.contains('is-active');

                // Remove active from all items
                items.forEach(function (sibling) {
                    sibling.classList.remove('is-active');
                });

                // Open the clicked item only if it wasn't already open
                if (!isAlreadyActive) {
                    // rAF ensures the "remove" paint happens before "add"
                    // giving CSS transitions a clean starting point.
                    requestAnimationFrame(function () {
                        item.classList.add('is-active');
                    });
                }
            });
        });
    });
});
