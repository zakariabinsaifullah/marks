<?php
/**
 * Core Block Styles
 *
 * Registers custom style variations for core (and third-party) blocks.
 *
 * @package Marks_FSE
 */

if ( ! function_exists( 'marks_block_styles' ) ) :
	/**
	 * Registers all custom block style variations for the theme.
	 */
	function marks_block_styles() {
		register_block_style(
		'core/post-excerpt',
		array(
			'name'         => 'outline-link',
			'label'        => __( 'Outline Link', 'marks' ),
		)
	);
	}
endif;
add_action( 'init', 'marks_block_styles' );
