<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$show_heading     = isset( $attributes['showHeading'] ) ? (bool) $attributes['showHeading'] : true;
$show_description = isset( $attributes['showDescription'] ) ? (bool) $attributes['showDescription'] : true;
$show_divider     = isset( $attributes['showDivider'] ) ? (bool) $attributes['showDivider'] : true;
$heading          = isset( $attributes['heading'] ) ? $attributes['heading'] : 'Who We Serve';
$description      = isset( $attributes['description'] ) ? $attributes['description'] : '';
$unique_id        = isset( $attributes['uniqueId'] ) ? $attributes['uniqueId'] : '';
$block_style      = isset( $attributes['blockStyle'] ) ? $attributes['blockStyle'] : [];

// Build inline style from blockStyle object (same as save.js)
$style_parts = [];
foreach ( $block_style as $property => $value ) {
    $style_parts[] = esc_attr( $property ) . ': ' . esc_attr( $value );
}

$has_no_header   = ! $show_heading && ! $show_description && ! $show_divider;
$wrapper_classes = trim( 'marks-remote-tabs ' . $unique_id );
$wrapper_attrs   = [ 'class' => $wrapper_classes ];
if ( ! empty( $style_parts ) ) {
    $wrapper_attrs['style'] = implode( '; ', $style_parts );
}

$inner_content = '';
foreach ( $block->inner_blocks as $inner_block ) {
    $inner_content .= $inner_block->render();
}
?>
<div <?php echo get_block_wrapper_attributes( $wrapper_attrs ); ?>>
    <div class="remote-tabs-left<?php echo $has_no_header ? ' has-no-header' : ''; ?>">
        <div class="remote-tabs-header">
            <?php if ( $show_heading && $heading ) : ?>
                <h2 class="remote-tabs-heading"><?php echo wp_kses_post( $heading ); ?></h2>
            <?php endif; ?>
            <?php if ( $show_description && $description ) : ?>
                <p class="remote-tabs-description"><?php echo wp_kses_post( $description ); ?></p>
            <?php endif; ?>
            <?php if ( $show_divider ) : ?>
                <hr class="remote-tabs-divider" />
            <?php endif; ?>
        </div>
        <div class="remote-tabs-nav" role="tablist" aria-label="Tab Navigation"></div>
    </div>
    <div class="remote-tabs-panels">
        <?php echo $inner_content; ?>
    </div>
</div>
