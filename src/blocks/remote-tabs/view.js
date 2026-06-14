document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.wp-block-marks-remote-tabs').forEach(function (container) {
        var panels         = container.querySelectorAll('.wp-block-marks-remote-tab-item');
        var navContainer   = container.querySelector('.remote-tabs-nav');
        var panelsContainer = container.querySelector('.remote-tabs-panels');

        if (!panels.length || !navContainer) return;

        // Build nav buttons
        panels.forEach(function (panel, index) {
            var label = panel.getAttribute('data-label') || 'Tab ' + (index + 1);
            var btn   = document.createElement('button');
            btn.className   = 'remote-tab-btn';
            btn.textContent = label;
            btn.setAttribute('type', 'button');
            btn.setAttribute('role', 'tab');
            btn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');

            btn.addEventListener('click', function () {
                navContainer.querySelectorAll('.remote-tab-btn').forEach(function (b) {
                    b.classList.remove('is-active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('is-active');
                btn.setAttribute('aria-selected', 'true');
                panelsContainer.setAttribute('data-active-tab', String(index));
            });

            navContainer.appendChild(btn);
        });

        // Show first tab via data attribute (CSS handles hide/show)
        panelsContainer.setAttribute('data-active-tab', '0');
        var firstBtn = navContainer.querySelector('.remote-tab-btn');
        if (firstBtn) firstBtn.classList.add('is-active');
    });
});
