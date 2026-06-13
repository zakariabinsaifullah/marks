import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

import {
    NativeResponsiveControl,
    NativeUnitControl,
    NativeSelectControl,
    NativeTextareaControl,
} from '../../components';

export default function Inspector(props) {
    const { attributes, setAttributes } = props;
    const {
        columns,
        resMode,
        gap,
        rowGap,
        orderBy,
        selectedIds,
        cardStyle,
        imageTextGap,
    } = attributes;

    useEffect(() => {
        setAttributes({
            blockStyle: {
                ...(columns.Desktop !== 2 && { '--dcols': String(columns.Desktop) }),
                ...(columns.Tablet !== 2  && { '--tcols': String(columns.Tablet) }),
                ...(columns.Mobile !== 1  && { '--mcols': String(columns.Mobile) }),
                ...(gap          && { '--gap': gap }),
                ...(rowGap       && { '--row-gap': rowGap }),
                ...(imageTextGap && { '--image-text-gap': imageTextGap }),
            }
        });
    }, [ columns, gap, rowGap, imageTextGap ]);

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Card Style', 'marks')}>
                    <NativeSelectControl
                        label={__('Style', 'marks')}
                        value={cardStyle}
                        onChange={value => setAttributes({ cardStyle: value })}
                        options={[
                            { label: __('Style 1 — Overlay', 'marks'),     value: 'style1' },
                            { label: __('Style 2 — Below Image', 'marks'), value: 'style2' },
                        ]}
                        mb={0}
                    />
                </PanelBody>

                <PanelBody title={__('Grid', 'marks')}>
                    <NativeResponsiveControl label={__('Columns', 'marks')} props={props}>
                        <RangeControl
                            value={columns[resMode]}
                            onChange={value => setAttributes({ columns: { ...columns, [resMode]: value } })}
                            min={1}
                            max={6}
                            __next40pxDefaultSize
                        />
                    </NativeResponsiveControl>
                    <NativeUnitControl
                        label={__('Gap', 'marks')}
                        value={gap}
                        onChange={value => setAttributes({ gap: value })}
                        mb={0}
                    />
                    <NativeUnitControl
                        label={__('Row Gap', 'marks')}
                        value={rowGap}
                        onChange={value => setAttributes({ rowGap: value })}
                        mb={0}
                    />
                </PanelBody>

                { cardStyle === 'style2' && (
                    <PanelBody title={__('Style 2', 'marks')} initialOpen={false}>
                        <NativeUnitControl
                            label={__('Image to Text Gap', 'marks')}
                            value={imageTextGap}
                            onChange={value => setAttributes({ imageTextGap: value })}
                            mb={0}
                        />
                    </PanelBody>
                )}

                <PanelBody title={__('Query', 'marks')} initialOpen={false}>
                    <NativeSelectControl
                        label={__('Order By', 'marks')}
                        value={orderBy}
                        onChange={value => setAttributes({ orderBy: value })}
                        options={[
                            { label: __('Menu Order', 'marks'),    value: 'menu_order' },
                            { label: __('Date (newest)', 'marks'), value: 'date' },
                            { label: __('Name (A – Z)', 'marks'),  value: 'title' },
                            { label: __('Random', 'marks'),        value: 'rand' },
                        ]}
                    />
                    <NativeTextareaControl
                        label={__('Show Specific Members', 'marks')}
                        value={selectedIds}
                        onChange={value => setAttributes({ selectedIds: value })}
                        placeholder="5, 12, 34"
                        help={__('Enter post IDs separated by commas. Leave empty to show all.', 'marks')}
                    />
                </PanelBody>
            </InspectorControls>
        </>
    );
}
