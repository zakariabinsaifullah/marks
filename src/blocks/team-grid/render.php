<?php
/**
 * Team Grid block render template.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks content (unused).
 * @var WP_Block $block      Block instance.
 */

$order_by     = $attributes['orderBy']     ?? 'menu_order';
$selected_ids = $attributes['selectedIds'] ?? '';
$desc_source  = $attributes['descSource']   ?? 'background';
$show_button  = $attributes['showButton']   ?? false;
$block_style  = $attributes['blockStyle']   ?? [];

$post_in = [];
if ( ! empty( trim( $selected_ids ) ) ) {
	$post_in = array_values(
		array_filter(
			array_map( 'absint', explode( ',', $selected_ids ) ),
			fn( $id ) => $id > 0
		)
	);
}

$style_parts = [];
foreach ( $block_style as $property => $value ) {
	if ( ! empty( $value ) ) {
		$style_parts[] = esc_attr( $property ) . ':' . esc_attr( $value );
	}
}
$inline_style = implode( ';', $style_parts );

$wrapper_attributes = get_block_wrapper_attributes(
	! empty( $inline_style ) ? [ 'style' => $inline_style ] : []
);

$query_args = [
	'post_type'      => 'marks-team',
	'posts_per_page' => -1,
	'post_status'    => 'publish',
	'no_found_rows'  => true,
];

if ( ! empty( $post_in ) ) {
	$query_args['post__in'] = $post_in;
	$query_args['orderby']  = 'post__in';
} else {
	$query_args['orderby'] = $order_by;
	$query_args['order']   = 'ASC';
}

$members_query = new WP_Query( $query_args );

if ( ! $members_query->have_posts() ) {
	echo '<div ' . $wrapper_attributes . '>';
	echo '<p class="marks-team-grid__empty">' . esc_html__( 'No team members found.', 'marks' ) . '</p>';
	echo '</div>';
	return;
}
?>

<div <?php echo $wrapper_attributes; ?>>

	<div class="marks-team-grid__grid">

		<?php while ( $members_query->have_posts() ) : $members_query->the_post(); ?>
		<?php
			$post_id     = get_the_ID();
			$name        = get_the_title();
			$designation = get_post_meta( $post_id, '_team_designation', true );
			$permalink   = get_permalink( $post_id );

			if ( 'excerpt' === $desc_source ) {
				$description = has_excerpt( $post_id ) ? get_the_excerpt( $post_id ) : '';
			} else {
				$description = get_post_meta( $post_id, '_team_background', true );
			}

			$image_url = get_the_post_thumbnail_url( $post_id, 'medium' );
			$image_alt = get_post_meta( get_post_thumbnail_id( $post_id ), '_wp_attachment_image_alt', true ) ?: $name;
		?>

		<a href="<?php echo esc_url( $permalink ); ?>" class="marks-team-card">
			<?php if ( has_post_thumbnail() ) : ?>
			<div class="marks-team-card__image-wrap">
				<img
					src="<?php echo esc_url( $image_url ); ?>"
					alt="<?php echo esc_attr( $image_alt ); ?>"
					class="marks-team-card__image"
					loading="lazy"
				>
			</div>
			<?php endif; ?>

			<div class="marks-team-card__header">
				<h3 class="marks-team-card__name">
					<?php echo esc_html( $name ); ?>
				</h3>
				<?php if ( $designation ) : ?>
				<p class="marks-team-card__designation">
					<?php echo esc_html( $designation ); ?>
				</p>
				<?php endif; ?>
			</div>

			<?php if ( $description ) : ?>
			<p class="marks-team-card__description">
				<?php echo esc_html( $description ); ?>
			</p>
			<?php endif; ?>

			<?php if ( $show_button ) : ?>
			<span class="marks-team-card__btn">
				<?php echo esc_html( $name ); ?>
			</span>
			<?php endif; ?>
		</a>

		<?php endwhile; wp_reset_postdata(); ?>

	</div>

</div>