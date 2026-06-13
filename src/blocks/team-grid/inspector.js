import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

import { NativeResponsiveControl, NativeUnitControl, NativeSelectControl, NativeTextareaControl } from '../../components';

export default function Inspector(props) {
    const { attributes, setAttributes } = props;
    const { columns, resMode, gap, rowGap, orderBy, selectedIds, descSource, showButton } = attributes;

    useEffect(() => {
        setAttributes({
            blockStyle: {
                ...(columns.Desktop !== 2 && { '--dcols': String(columns.Desktop) }),
                ...(columns.Tablet !== 2 && { '--tcols': String(columns.Tablet) }),
                ...(columns.Mobile !== 1 && { '--mcols': String(columns.Mobile) }),
                ...(gap && { '--gap': gap }),
                ...(rowGap && { '--row-gap': rowGap })
            }
        });
    }, [columns, gap, rowGap]);

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Card', 'marks')}>
                    <NativeSelectControl
                        label={__('Description', 'marks')}
                        value={descSource}
                        onChange={value => setAttributes({ descSource: value })}
                        options={[
                            { label: __('Professional Background', 'marks'), value: 'background' },
                            { label: __('Excerpt', 'marks'), value: 'excerpt' }
                        ]}
                        mb={0}
                    />
                    <ToggleControl
                        label={__('Show Button', 'marks')}
                        checked={showButton}
                        onChange={value => setAttributes({ showButton: value })}
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
                    <NativeUnitControl label={__('Gap', 'marks')} value={gap} onChange={value => setAttributes({ gap: value })} mb="16px" />
                    <NativeUnitControl
                        label={__('Row Gap', 'marks')}
                        value={rowGap}
                        onChange={value => setAttributes({ rowGap: value })}
                        mb={0}
                    />
                </PanelBody>

                <PanelBody title={__('Query', 'marks')} initialOpen={false}>
                    <NativeSelectControl
                        label={__('Order By', 'marks')}
                        value={orderBy}
                        onChange={value => setAttributes({ orderBy: value })}
                        options={[
                            { label: __('Menu Order', 'marks'), value: 'menu_order' },
                            { label: __('Date (newest)', 'marks'), value: 'date' },
                            { label: __('Name (A – Z)', 'marks'), value: 'title' },
                            { label: __('Random', 'marks'), value: 'rand' }
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
