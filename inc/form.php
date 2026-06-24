<?php
/**
 * Contact Settings — admin page under Appearance menu.
 *
 * Options:
 *   marks_phone_number          – Phone Number
 *   marks_tab_contact_label     – Label for the "Contacts Us" tab
 *   marks_tab_booking_label     – Label for the "Book a Call" tab
 *   marks_form_title            – Contacts Us tab title (panel heading)
 *   marks_form_description      – Contacts Us tab description paragraph
 *   marks_form_shortcode        – Form Shortcode (rendered on Contacts Us tab)
 *   marks_booking_title         – Book a Call tab title
 *   marks_booking_description   – Book a Call tab description paragraph
 *   marks_calendly_iframe       – Full <iframe> snippet rendered on Book a Call tab
 *
 * @package Marks_FSE
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// ── Enqueue front-end assets ───────────────────────────────────────────────────

add_action( 'wp_enqueue_scripts', 'marks_form_panel_assets' );

function marks_form_panel_assets() {
	$version = wp_get_theme()->get( 'Version' );

	wp_enqueue_style(
		'marks-form-panel',
		get_theme_file_uri( 'assets/css/form-panel.css' ),
		array(),
		$version
	);

	wp_enqueue_script(
		'marks-form-panel',
		get_theme_file_uri( 'assets/js/form-panel.js' ),
		array(),
		$version,
		true
	);
}

// ── Inject panel HTML into every page footer ───────────────────────────────────

add_action( 'wp_footer', 'marks_form_panel_html' );

function marks_form_panel_html() {
	$phone              = get_option( 'marks_phone_number', '' );
	$shortcode          = get_option( 'marks_form_shortcode', '' );
	$title              = get_option( 'marks_form_title', 'Contact us' );
	$description        = get_option( 'marks_form_description', '' );
	$tab_contact_label  = get_option( 'marks_tab_contact_label', 'Contacts Us' );
	$tab_booking_label  = get_option( 'marks_tab_booking_label', 'Book a Call with Us' );
	$booking_title      = get_option( 'marks_booking_title', 'Book a Call with Us!' );
	$booking_desc       = get_option( 'marks_booking_description', '' );
	$calendly_iframe    = get_option( 'marks_calendly_iframe', '' );

	// Allowed tags for sanitizing the Calendly iframe snippet on output.
	$iframe_allowed_html = [
		'iframe' => [
			'src'             => [],
			'width'           => [],
			'height'          => [],
			'style'           => [],
			'frameborder'     => [],
			'allow'           => [],
			'allowfullscreen' => [],
			'title'           => [],
			'loading'         => [],
			'referrerpolicy'  => [],
		],
	];

	$panel_label = $title ? $title : __( 'Contact us', 'marks' );

	// Don't render the panel if nothing to show.
	if ( ! $phone && ! $shortcode && ! $title && ! $description && ! $booking_title && ! $booking_desc && ! $calendly_iframe ) {
		return;
	}
	?>
	<div id="marks-form-overlay" class="marks-form-overlay" aria-hidden="true"></div>

	<div
		id="marks-contact"
		class="marks-form-panel"
		role="dialog"
		aria-modal="true"
		aria-label="<?php echo esc_attr( $panel_label ); ?>"
		aria-hidden="true"
	>
		<div class="marks-form-panel__header">
			<?php if ( $phone ) : ?>
			<a href="tel:<?php echo esc_attr( preg_replace( '/[^\d+]/', '', $phone ) ); ?>" class="marks-form-panel__phone">
				<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<path d="M3.62 7.79C5.06 10.62 7.38 12.93 10.21 14.38L12.41 12.18C12.68 11.91 13.08 11.82 13.43 11.94C14.55 12.31 15.76 12.51 17 12.51C17.55 12.51 18 12.96 18 13.51V17C18 17.55 17.55 18 17 18C7.61 18 0 10.39 0 1C0 0.45 0.45 0 1 0H4.5C5.05 0 5.5 0.45 5.5 1C5.5 2.25 5.7 3.45 6.07 4.57C6.18 4.92 6.1 5.31 5.82 5.59L3.62 7.79Z" fill="currentColor"/>
				</svg>
				<?php echo esc_html( $phone ); ?>
			</a>
			<?php else : ?>
			<span></span>
			<?php endif; ?>

			<button class="marks-form-panel__close" aria-label="<?php esc_attr_e( 'Close contact panel', 'marks' ); ?>">
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
				</svg>
			</button>
		</div>

		<div class="marks-form-panel__body">
			<nav class="marks-form-panel__tabs" role="tablist" data-active-tab="0" aria-label="<?php esc_attr_e( 'Contact options', 'marks' ); ?>">
				<button
					type="button"
					class="marks-form-panel__tab is-active"
					role="tab"
					aria-selected="true"
					aria-controls="marks-tab-contact"
					data-tab-index="0"
				><?php echo esc_html( $tab_contact_label ); ?></button>
				<button
					type="button"
					class="marks-form-panel__tab"
					role="tab"
					aria-selected="false"
					aria-controls="marks-tab-booking"
					data-tab-index="1"
					tabindex="-1"
				><?php echo esc_html( $tab_booking_label ); ?></button>
			</nav>

			<div class="marks-form-panel__panels">
				<section
					id="marks-tab-contact"
					class="marks-form-panel__panel"
					role="tabpanel"
				>
					<?php if ( $title ) : ?>
						<h2 class="marks-form-panel__title"><?php echo esc_html( $title ); ?></h2>
					<?php endif; ?>

					<?php if ( $description ) : ?>
						<p class="marks-form-panel__desc"><?php echo esc_html( $description ); ?></p>
					<?php endif; ?>

					<?php if ( $shortcode ) : ?>
						<?php echo do_shortcode( $shortcode ); ?>
					<?php endif; ?>
				</section>

				<section
					id="marks-tab-booking"
					class="marks-form-panel__panel"
					role="tabpanel"
					hidden
				>
					<?php if ( $booking_title ) : ?>
						<h2 class="marks-form-panel__title"><?php echo esc_html( $booking_title ); ?></h2>
					<?php endif; ?>

					<?php if ( $booking_desc ) : ?>
						<p class="marks-form-panel__desc"><?php echo esc_html( $booking_desc ); ?></p>
					<?php endif; ?>

					<?php if ( $calendly_iframe ) : ?>
						<div class="marks-form-panel__calendly">
							<?php echo wp_kses( $calendly_iframe, $iframe_allowed_html ); ?>
						</div>
					<?php endif; ?>
				</section>
			</div>
		</div>
	</div>
	<?php
}

// ── Register settings ──────────────────────────────────────────────────────────

/**
 * Sanitize the Calendly iframe option — strip everything except the
 * <iframe> tag and a safe allowlist of its attributes.
 */
function marks_sanitize_iframe( $value ) {
	$allowed = [
		'iframe' => [
			'src'             => [],
			'width'           => [],
			'height'          => [],
			'style'           => [],
			'frameborder'     => [],
			'allow'           => [],
			'allowfullscreen' => [],
			'title'           => [],
			'loading'         => [],
			'referrerpolicy'  => [],
		],
	];
	return wp_kses( (string) $value, $allowed );
}

add_action( 'admin_init', 'marks_form_register_settings' );

function marks_form_register_settings() {
	register_setting(
		'marks_form_group',
		'marks_phone_number',
		[
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => '',
		]
	);

	register_setting(
		'marks_form_group',
		'marks_tab_contact_label',
		[
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => 'Contacts Us',
		]
	);

	register_setting(
		'marks_form_group',
		'marks_tab_booking_label',
		[
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => 'Book a Call with Us',
		]
	);

	register_setting(
		'marks_form_group',
		'marks_form_title',
		[
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => 'Contact us',
		]
	);

	register_setting(
		'marks_form_group',
		'marks_form_description',
		[
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_textarea_field',
			'default'           => '',
		]
	);

	register_setting(
		'marks_form_group',
		'marks_form_shortcode',
		[
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => '',
		]
	);

	register_setting(
		'marks_form_group',
		'marks_booking_title',
		[
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => 'Book a Call with Us!',
		]
	);

	register_setting(
		'marks_form_group',
		'marks_booking_description',
		[
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_textarea_field',
			'default'           => '',
		]
	);

	register_setting(
		'marks_form_group',
		'marks_calendly_iframe',
		[
			'type'              => 'string',
			'sanitize_callback' => 'marks_sanitize_iframe',
			'default'           => '',
		]
	);
}

// ── Add menu page under Appearance ────────────────────────────────────────────

add_action( 'admin_menu', 'marks_form_add_menu' );

function marks_form_add_menu() {
	add_theme_page(
		__( 'Contact Settings', 'marks' ),
		__( 'Contact', 'marks' ),
		'manage_options',
		'marks-form',
		'marks_form_render_page'
	);
}

// ── Render settings page ───────────────────────────────────────────────────────

function marks_form_render_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Contact Settings', 'marks' ); ?></h1>

		<?php settings_errors( 'marks_form_group' ); ?>

		<?php /* ── Trigger ID hint ── */ ?>
		<div style="
			background: #f0f6fc;
			border-left: 4px solid #2271b1;
			border-radius: 0 4px 4px 0;
			padding: 14px 18px;
			margin: 16px 0 24px;
			max-width: 600px;
		">
			<p style="margin: 0 0 8px; font-weight: 600; color: #1d2327;">
				<?php esc_html_e( 'How to open this contact panel', 'marks' ); ?>
			</p>
			<p style="margin: 0 0 10px; color: #3c434a; font-size: 13px;">
				<?php esc_html_e( 'Add the following ID as the href value on any link or button to open the slide-in contact panel:', 'marks' ); ?>
			</p>
			<div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
				<code id="marks-trigger-id" style="
					background: #1d2327;
					color: #7dd3fc;
					padding: 6px 14px;
					border-radius: 4px;
					font-size: 14px;
					font-family: monospace;
					letter-spacing: 0.5px;
					user-select: all;
				">#marks-contact</code>
				<button
					type="button"
					onclick="
						navigator.clipboard.writeText('#marks-contact');
						this.textContent = '✓ Copied!';
						setTimeout(() => this.textContent = 'Copy', 2000);
					"
					style="
						background: #2271b1;
						color: #fff;
						border: none;
						border-radius: 4px;
						padding: 5px 14px;
						font-size: 13px;
						cursor: pointer;
					"
				><?php esc_html_e( 'Copy', 'marks' ); ?></button>
			</div>
			<p style="margin: 10px 0 0; color: #646970; font-size: 12px;">
				<?php esc_html_e( 'Example:', 'marks' ); ?>
				<code style="background:#eee; padding: 2px 6px; border-radius: 3px;">&lt;a href="#marks-contact"&gt;Get in Touch&lt;/a&gt;</code>
			</p>
		</div>

		<form method="post" action="options.php">
			<?php settings_fields( 'marks_form_group' ); ?>

			<table class="form-table" role="presentation">
				<tr>
					<th scope="row">
						<label for="marks_phone_number">
							<?php esc_html_e( 'Phone Number', 'marks' ); ?>
						</label>
					</th>
					<td>
						<input
							type="text"
							id="marks_phone_number"
							name="marks_phone_number"
							value="<?php echo esc_attr( get_option( 'marks_phone_number' ) ); ?>"
							class="regular-text"
							placeholder="e.g. 818-408-7117"
						/>
					</td>
				</tr>
				<tr>
					<th scope="row">
						<label for="marks_tab_contact_label">
							<?php esc_html_e( 'Contacts Us Tab Label', 'marks' ); ?>
						</label>
					</th>
					<td>
						<input
							type="text"
							id="marks_tab_contact_label"
							name="marks_tab_contact_label"
							value="<?php echo esc_attr( get_option( 'marks_tab_contact_label', 'Contacts Us' ) ); ?>"
							class="regular-text"
							placeholder="<?php esc_attr_e( 'Contacts Us', 'marks' ); ?>"
						/>
						<p class="description">
							<?php esc_html_e( 'Text shown on the first tab in the contact panel.', 'marks' ); ?>
						</p>
					</td>
				</tr>
				<tr>
					<th scope="row">
						<label for="marks_tab_booking_label">
							<?php esc_html_e( 'Book a Call Tab Label', 'marks' ); ?>
						</label>
					</th>
					<td>
						<input
							type="text"
							id="marks_tab_booking_label"
							name="marks_tab_booking_label"
							value="<?php echo esc_attr( get_option( 'marks_tab_booking_label', 'Book a Call with Us' ) ); ?>"
							class="regular-text"
							placeholder="<?php esc_attr_e( 'Book a Call with Us', 'marks' ); ?>"
						/>
						<p class="description">
							<?php esc_html_e( 'Text shown on the second tab in the contact panel.', 'marks' ); ?>
						</p>
					</td>
				</tr>
				<tr>
					<th scope="row">
						<label for="marks_form_title">
							<?php esc_html_e( 'Contacts Us Tab Title', 'marks' ); ?>
						</label>
					</th>
					<td>
						<input
							type="text"
							id="marks_form_title"
							name="marks_form_title"
							value="<?php echo esc_attr( get_option( 'marks_form_title', 'Contact us' ) ); ?>"
							class="regular-text"
							placeholder="<?php esc_attr_e( 'Contact us', 'marks' ); ?>"
						/>
						<p class="description">
							<?php esc_html_e( 'Heading shown on the Contacts Us tab.', 'marks' ); ?>
						</p>
					</td>
				</tr>
				<tr>
					<th scope="row">
						<label for="marks_form_description">
							<?php esc_html_e( 'Contacts Us Tab Description', 'marks' ); ?>
						</label>
					</th>
					<td>
						<textarea
							id="marks_form_description"
							name="marks_form_description"
							class="regular-text"
							rows="4"
							placeholder="<?php esc_attr_e( 'We are here to help you...', 'marks' ); ?>"
						><?php echo esc_textarea( get_option( 'marks_form_description', '' ) ); ?></textarea>
						<p class="description">
							<?php esc_html_e( 'Short paragraph shown below the title on the Contacts Us tab.', 'marks' ); ?>
						</p>
					</td>
				</tr>
				<tr>
					<th scope="row">
						<label for="marks_form_shortcode">
							<?php esc_html_e( 'Form Shortcode', 'marks' ); ?>
						</label>
					</th>
					<td>
						<input
							type="text"
							id="marks_form_shortcode"
							name="marks_form_shortcode"
							value="<?php echo esc_attr( get_option( 'marks_form_shortcode' ) ); ?>"
							class="regular-text"
						/>
						<p class="description">
							<?php esc_html_e( 'Enter the shortcode, e.g. [gravityform id="1" title="false"]', 'marks' ); ?>
						</p>
					</td>
				</tr>
				<tr>
					<th scope="row">
						<label for="marks_booking_title">
							<?php esc_html_e( 'Book a Call Title', 'marks' ); ?>
						</label>
					</th>
					<td>
						<input
							type="text"
							id="marks_booking_title"
							name="marks_booking_title"
							value="<?php echo esc_attr( get_option( 'marks_booking_title', 'Book a Call with Us!' ) ); ?>"
							class="regular-text"
							placeholder="<?php esc_attr_e( 'Book a Call with Us!', 'marks' ); ?>"
						/>
						<p class="description">
							<?php esc_html_e( 'Heading shown on the Book a Call tab.', 'marks' ); ?>
						</p>
					</td>
				</tr>
				<tr>
					<th scope="row">
						<label for="marks_booking_description">
							<?php esc_html_e( 'Book a Call Description', 'marks' ); ?>
						</label>
					</th>
					<td>
						<textarea
							id="marks_booking_description"
							name="marks_booking_description"
							class="regular-text"
							rows="4"
							placeholder="<?php esc_attr_e( 'If you are looking for a team to help guide your next steps...', 'marks' ); ?>"
						><?php echo esc_textarea( get_option( 'marks_booking_description', '' ) ); ?></textarea>
						<p class="description">
							<?php esc_html_e( 'Short paragraph shown below the title on the Book a Call tab.', 'marks' ); ?>
						</p>
					</td>
				</tr>
				<tr>
					<th scope="row">
						<label for="marks_calendly_iframe">
							<?php esc_html_e( 'Calendly Iframe Code', 'marks' ); ?>
						</label>
					</th>
					<td>
						<textarea
							id="marks_calendly_iframe"
							name="marks_calendly_iframe"
							class="large-text code"
							rows="6"
							placeholder='<iframe src="https://calendly.com/your-link" style="width:100%;min-width:320px;height:700px;" frameborder="0"></iframe>'
						><?php echo esc_textarea( get_option( 'marks_calendly_iframe', '' ) ); ?></textarea>
						<p class="description">
							<?php esc_html_e( 'Paste the full <code>&lt;iframe&gt;</code> snippet provided by Calendly (or any other scheduling tool). Only the iframe tag and its safe attributes will be kept.', 'marks' ); ?>
						</p>
					</td>
				</tr>
			</table>

			<?php submit_button(); ?>
		</form>
	</div>
	<?php
}
