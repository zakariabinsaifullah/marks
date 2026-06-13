/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { NativeSelectControl } from '../../components';

import './style.scss';

const SUPPORTED_BLOCKS = [ 'core/group' ];

const ELLIPSE_OPTIONS = [
    { label: __( 'None',          'marks' ), value: 'none'  },
    { label: __( 'Olive Ellipse', 'marks' ), value: 'olive' },
    { label: __( 'Brown Ellipse', 'marks' ), value: 'brown' },
    { label: __( 'Navy Ellipse',      'marks' ), value: 'navy'      },
    { label: __( 'Dark Plum Ellipse', 'marks' ), value: 'dark-plum' }
];

/**
 * Add overlayEllipse attribute to supported blocks.
 */
addFilter(
    'blocks.registerBlockType',
    'marks/group-overlay-ellipse-add-attributes',
    ( settings, name ) => {
        if ( ! SUPPORTED_BLOCKS.includes( name ) ) {
            return settings;
        }

        return {
            ...settings,
            attributes: {
                ...settings.attributes,
                overlayEllipse: {
                    type: 'string',
                    default: 'none'
                }
            }
        };
    }
);

/**
 * Add "Overlay Ellipse" select to the core/group inspector.
 */
addFilter(
    'editor.BlockEdit',
    'marks/group-overlay-ellipse-add-inspector-controls',
    createHigherOrderComponent( BlockEdit => {
        return props => {
            const { name, attributes, setAttributes } = props;

            if ( ! SUPPORTED_BLOCKS.includes( name ) ) {
                return <BlockEdit { ...props } />;
            }

            return (
                <>
                    <BlockEdit { ...props } />
                    <InspectorControls>
                        <PanelBody title={ __( 'Overlay Ellipse', 'marks' ) } initialOpen={ false }>
                            <NativeSelectControl
                                label={ __( 'Ellipse Style', 'marks' ) }
                                value={ attributes.overlayEllipse || 'none' }
                                options={ ELLIPSE_OPTIONS }
                                onChange={ v => setAttributes( { overlayEllipse: v } ) }
                            />
                        </PanelBody>
                    </InspectorControls>
                </>
            );
        };
    } )
);

/**
 * Apply ellipse classes in the editor preview.
 */
addFilter(
    'editor.BlockListBlock',
    'marks/group-overlay-ellipse-add-styles',
    createHigherOrderComponent( BlockListBlock => {
        return props => {
            const { name, attributes } = props;

            if ( ! SUPPORTED_BLOCKS.includes( name ) ) {
                return <BlockListBlock { ...props } />;
            }

            const ellipse = attributes.overlayEllipse;

            if ( ! ellipse || ellipse === 'none' ) {
                return <BlockListBlock { ...props } />;
            }

            const classes = [
                props.className,
                'has-overlay-ellipse',
                `has-overlay-ellipse--${ ellipse }`
            ].filter( Boolean ).join( ' ' );

            return <BlockListBlock { ...props } className={ classes } />;
        };
    } )
);
