<?php
/**
 * Block & Pattern Categories
 *
 * Registers custom block categories and block pattern categories
 * used throughout this theme.
 *
 * @package Marks_FSE
 */

if ( ! function_exists( 'marks_block_categories' ) ) :
	/**
	 * Adds the "Brilliant Blocks" category to the block inserter.
	 *
	 * @param  array                   $block_categories     Existing block categories.
	 * @param  WP_Block_Editor_Context $block_editor_context Current editor context.
	 * @return array
	 */
	function marks_block_categories( $block_categories, $block_editor_context ) {
		return array_merge(
			array(
				array(
					'slug'  => 'marks-blocks',
					'title' => __( 'Marks Blocks', 'marks' ),
				),
			),
			$block_categories

		);
	}
endif;
add_filter( 'block_categories_all', 'marks_block_categories', 10, 2 );


if ( ! function_exists( 'marks_pattern_categories' ) ) :
	/**
	 * Registers the "Marks" block pattern category.
	 */
	function marks_pattern_categories() {
		register_block_pattern_category(
			'marks',
			array(
				'label'       => __( 'Marks', 'marks' ),
				'description' => __( 'A collection of Marks patterns.', 'marks' ),
			)
		);
	}
endif;
add_action( 'init', 'marks_pattern_categories' );
