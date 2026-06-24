(function () {
    'use strict';

    var PANEL_ID   = 'marks-contact';
    var OVERLAY_ID = 'marks-form-overlay';
    var OPEN_CLASS = 'is-open';
    var LOCK_CLASS = 'marks-panel-open';

    var lastTrigger = null;

    function panel()   { return document.getElementById( PANEL_ID ); }
    function overlay() { return document.getElementById( OVERLAY_ID ); }

    function openPanel() {
        var p = panel(), o = overlay();
        if ( ! p || ! o ) return;

        p.classList.add( OPEN_CLASS );
        o.classList.add( OPEN_CLASS );
        document.body.classList.add( LOCK_CLASS );
        p.setAttribute( 'aria-hidden', 'false' );

        var closeBtn = p.querySelector( '.marks-form-panel__close' );
        if ( closeBtn ) closeBtn.focus();
    }

    function closePanel() {
        var p = panel(), o = overlay();
        if ( ! p || ! o ) return;

        p.classList.remove( OPEN_CLASS );
        o.classList.remove( OPEN_CLASS );
        document.body.classList.remove( LOCK_CLASS );
        p.setAttribute( 'aria-hidden', 'true' );

        if ( lastTrigger ) lastTrigger.focus();
        lastTrigger = null;
    }

    // ── Tab switching inside the panel ──────────────────────────────────────────
    function initTabs() {
        var p = panel();
        if ( ! p ) return;

        var tabs    = p.querySelector( '.marks-form-panel__tabs' );
        var tabBtns = p.querySelectorAll( '.marks-form-panel__tab' );
        var panels  = p.querySelectorAll( '.marks-form-panel__panel' );
        if ( ! tabs || ! tabBtns.length || ! panels.length ) return;

        tabBtns.forEach( function ( btn, i ) {
            btn.addEventListener( 'click', function () {
                activateTab( i );
            } );
        } );

        function activateTab( index ) {
            tabBtns.forEach( function ( b, j ) {
                var active = ( j === index );
                b.classList.toggle( 'is-active', active );
                b.setAttribute( 'aria-selected', active ? 'true' : 'false' );
                b.tabIndex = active ? 0 : -1;
                if ( panels[ j ] ) panels[ j ].hidden = ! active;
            } );
            tabs.setAttribute( 'data-active-tab', String( index ) );
        }
    }

    // Trigger: <a href="#marks-contact"> or [data-open="marks-contact"]
    document.addEventListener( 'click', function ( e ) {
        var trigger = e.target.closest(
            'a[href="#' + PANEL_ID + '"], [data-open="' + PANEL_ID + '"]'
        );

        if ( trigger ) {
            e.preventDefault();
            lastTrigger = trigger;
            openPanel();
            return;
        }

        // Close button inside panel
        if ( e.target.closest( '.marks-form-panel__close' ) ) {
            closePanel();
            return;
        }

        // Click on overlay
        var o = overlay();
        if ( o && e.target === o ) {
            closePanel();
        }
    } );

    // Escape key
    document.addEventListener( 'keydown', function ( e ) {
        var p = panel();
        if ( e.key === 'Escape' && p && p.classList.contains( OPEN_CLASS ) ) {
            closePanel();
        }
    } );

    initTabs();

})();
