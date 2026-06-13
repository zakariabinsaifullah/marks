<?php

function marks_register_team_cpt() {
    $labels = [
        'name'                  => _x( 'Team', 'Post Type General Name', 'marks' ),
        'singular_name'         => _x( 'Team Member', 'Post Type Singular Name', 'marks' ),
        'menu_name'             => __( 'Team', 'marks' ),
        'name_admin_bar'        => __( 'Team Member', 'marks' ),
        'archives'              => __( 'Team Archives', 'marks' ),
        'attributes'            => __( 'Team Attributes', 'marks' ),
        'parent_item_colon'     => __( 'Parent Team Member:', 'marks' ),
        'all_items'             => __( 'All Members', 'marks' ),
        'add_new_item'          => __( 'Add New Member', 'marks' ),
        'add_new'               => __( 'Add New', 'marks' ),
        'new_item'              => __( 'New Member', 'marks' ),
        'edit_item'             => __( 'Edit Member', 'marks' ),
        'update_item'           => __( 'Update Member', 'marks' ),
        'view_item'             => __( 'View Member', 'marks' ),
        'view_items'            => __( 'View Team', 'marks' ),
        'search_items'          => __( 'Search Team Member', 'marks' ),
        'not_found'             => __( 'Not found', 'marks' ),
        'not_found_in_trash'    => __( 'Not found in Trash', 'marks' ),
        'featured_image'        => __( 'Team Member Image', 'marks' ),
        'set_featured_image'    => __( 'Set Team Member Image', 'marks' ),
        'remove_featured_image' => __( 'Remove Team Member Image', 'marks' ),
        'use_featured_image'    => __( 'Use as Team Member Image', 'marks' ),
        'insert_into_item'      => __( 'Insert into item', 'marks' ),
        'uploaded_to_this_item' => __( 'Uploaded to this item', 'marks' ),
        'items_list'            => __( 'Team list', 'marks' ),
        'items_list_navigation' => __( 'Team list navigation', 'marks' ),
        'filter_items_list'     => __( 'Filter team list', 'marks' ),
    ];
    $args = [
        'label'                 => __( 'Team Member', 'marks' ),
        'labels'                => $labels,
        'supports'              => [ 'title', 'thumbnail', 'editor', 'revisions', 'excerpt' ],
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 20,
        'menu_icon'             => 'dashicons-groups',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => false,
        'can_export'            => true,
        'has_archive'           => false,
        'exclude_from_search'   => true,
        'publicly_queryable'    => true,
        'show_in_rest'          => true,
        'rewrite'               => [ 'slug' => 'team' ],
    ];
    register_post_type( 'marks-team', $args );
}
add_action( 'init', 'marks_register_team_cpt', 0 );


function marks_register_services_cpt() {
    $labels = [
        'name'                  => _x( 'Services', 'Post Type General Name', 'marks' ),
        'singular_name'         => _x( 'Service', 'Post Type Singular Name', 'marks' ),
        'menu_name'             => __( 'Services', 'marks' ),
        'name_admin_bar'        => __( 'Service', 'marks' ),
        'archives'              => __( 'Services Archives', 'marks' ),
        'attributes'            => __( 'Service Attributes', 'marks' ),
        'parent_item_colon'     => __( 'Parent Service:', 'marks' ),
        'all_items'             => __( 'All Services', 'marks' ),
        'add_new_item'          => __( 'Add New Service', 'marks' ),
        'add_new'               => __( 'Add New', 'marks' ),
        'new_item'              => __( 'New Service', 'marks' ),
        'edit_item'             => __( 'Edit Service', 'marks' ),
        'update_item'           => __( 'Update Service', 'marks' ),
        'view_item'             => __( 'View Service', 'marks' ),
        'view_items'            => __( 'View Services', 'marks' ),
        'search_items'          => __( 'Search Services', 'marks' ),
        'not_found'             => __( 'Not found', 'marks' ),
        'not_found_in_trash'    => __( 'Not found in Trash', 'marks' ),
        'featured_image'        => __( 'Service Image', 'marks' ),
        'set_featured_image'    => __( 'Set Service Image', 'marks' ),
        'remove_featured_image' => __( 'Remove Service Image', 'marks' ),
        'use_featured_image'    => __( 'Use as Service Image', 'marks' ),
        'insert_into_item'      => __( 'Insert into item', 'marks' ),
        'uploaded_to_this_item' => __( 'Uploaded to this item', 'marks' ),
        'items_list'            => __( 'Services list', 'marks' ),
        'items_list_navigation' => __( 'Services list navigation', 'marks' ),
        'filter_items_list'     => __( 'Filter services list', 'marks' ),
    ];
    $args = [
        'label'                 => __( 'Service', 'marks' ),
        'labels'                => $labels,
        'supports'              => [ 'title', 'editor', 'thumbnail', 'excerpt', 'revisions' ],
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 21,
        'menu_icon'             => 'dashicons-admin-generic',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => false,
        'can_export'            => true,
        'has_archive'           => false,
        'exclude_from_search'   => true,
        'publicly_queryable'    => true,
        'show_in_rest'          => true,
        'rewrite'               => [ 'slug' => 'services' ],
    ];
    register_post_type( 'marks-services', $args );
}
add_action( 'init', 'marks_register_services_cpt', 0 );

/**
 * Change the default title placeholder for the Team CPT to "Add name".
 */
function marks_team_title_placeholder( $title, $post ) {
    if ( 'marks-team' === $post->post_type ) {
        return __( 'Add name', 'marks' );
    }
    return $title;
}
add_filter( 'enter_title_here', 'marks_team_title_placeholder', 10, 2 );


function marks_team_meta_boxes() {
    add_meta_box(
        'marks_team_meta',
        __( 'Team Member Details', 'marks' ),
        'marks_team_meta_callback',
        'marks-team',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'marks_team_meta_boxes' );

function marks_team_meta_callback( $post ) {
    wp_nonce_field( 'marks_team_meta_nonce_action', 'marks_team_meta_nonce' );

    $designation = get_post_meta( $post->ID, '_team_designation', true );

    echo '<div style="margin-bottom: 15px;">';
    echo '<label for="team_designation" style="display:block; font-weight:bold; margin-bottom:5px;">' . __( 'Designation', 'marks' ) . '</label>';
    echo '<input type="text" id="team_designation" name="team_designation" value="' . esc_attr( $designation ) . '" style="width:100%;">';
    echo '</div>';
}

function marks_save_team_meta( $post_id ) {
    if ( ! isset( $_POST['marks_team_meta_nonce'] ) ) {
        return;
    }
    if ( ! wp_verify_nonce( $_POST['marks_team_meta_nonce'], 'marks_team_meta_nonce_action' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    if ( isset( $_POST['team_designation'] ) ) {
        update_post_meta( $post_id, '_team_designation', sanitize_text_field( wp_unslash( $_POST['team_designation'] ) ) );
    }
}
add_action( 'save_post_marks-team', 'marks_save_team_meta' );

function marks_team_columns( $columns ) {
	$new_columns = [];
	foreach ( $columns as $key => $title ) {
		$new_columns[ $key ] = $title;

		if ( 'title' === $key ) {
			$new_columns['post_id'] = __( 'ID', 'marks' );
		}

		if ( 'date' === $key ) {
			unset( $new_columns['date'] );
			$new_columns['team_designation'] = __( 'Designation', 'marks' );
			$new_columns['date']             = $title;
		}
	}
	return $new_columns;
}
add_filter( 'manage_marks-team_posts_columns', 'marks_team_columns' );


function marks_team_custom_column( $column, $post_id ) {
	switch ( $column ) {
		case 'post_id':
			printf(
				'<span class="marks-copy-id" data-id="%1$s" title="%2$s">%1$s</span>',
				esc_attr( $post_id ),
				esc_attr__( 'Click to copy ID', 'marks' )
			);
			break;

		case 'team_designation':
			echo esc_html( get_post_meta( $post_id, '_team_designation', true ) );
			break;
	}
}
add_action( 'manage_marks-team_posts_custom_column', 'marks_team_custom_column', 10, 2 );


function marks_team_admin_assets( $hook ) {
	global $post_type;

	if ( 'edit.php' !== $hook || 'marks-team' !== $post_type ) {
		return;
	}

	echo '<style>
		.column-post_id { width: 56px; text-align: center; }
		.marks-copy-id {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			min-width: 36px;
			padding: 2px 8px;
			background: #f0f0f1;
			border: 1px solid #c3c4c7;
			border-radius: 3px;
			font-size: 12px;
			font-family: monospace;
			cursor: pointer;
			user-select: none;
			transition: background 0.15s, color 0.15s;
		}
		.marks-copy-id:hover     { background: #dcdcde; }
		.marks-copy-id.is-copied { background: #00a32a; color: #fff; border-color: #00a32a; }
	</style>';
}
add_action( 'admin_head', 'marks_team_admin_assets' );


function marks_team_copy_id_script( $hook ) {
	global $post_type;

	if ( 'edit.php' !== $hook || 'marks-team' !== $post_type ) {
		return;
	}

	echo "<script>
		document.addEventListener( 'DOMContentLoaded', function () {
			document.querySelectorAll( '.marks-copy-id' ).forEach( function ( badge ) {
				badge.addEventListener( 'click', function () {
					const id   = this.dataset.id;
					const self = this;

					const markCopied = () => {
						self.classList.add( 'is-copied' );
						self.textContent = 'Copied!';
						setTimeout( () => {
							self.classList.remove( 'is-copied' );
							self.textContent = id;
						}, 1500 );
					};

					if ( navigator.clipboard && window.isSecureContext ) {
						navigator.clipboard.writeText( id ).then( markCopied );
					} else {
						const el = document.createElement( 'input' );
						el.value = id;
						el.style.cssText = 'position:absolute;left:-9999px;top:-9999px';
						document.body.appendChild( el );
						el.select();
						document.execCommand( 'copy' );
						document.body.removeChild( el );
						markCopied();
					}
				} );
			} );
		} );
	</script>";
}
add_action( 'admin_footer', 'marks_team_copy_id_script' );