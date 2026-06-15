import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, RangeControl } from '@wordpress/components';
import { PanelColorControl } from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { headingColor, descriptionColor, tabLabelColor, tabLabelActiveColor, leftBgColor, navMarginTop, showHeading, showDescription, showDivider } = attributes;

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Content Visibility', 'marks')} initialOpen={true}>
                    <ToggleControl
                        label={__('Show Heading', 'marks')}
                        checked={showHeading}
                        onChange={value => setAttributes({ showHeading: value })}
                    />
                    <ToggleControl
                        label={__('Show Description', 'marks')}
                        checked={showDescription}
                        onChange={value => setAttributes({ showDescription: value })}
                    />
                    <ToggleControl
                        label={__('Show Divider', 'marks')}
                        checked={showDivider}
                        onChange={value => setAttributes({ showDivider: value })}
                    />
                </PanelBody>
                <PanelBody title={__('Spacing', 'marks')} initialOpen={false}>
                    <RangeControl
                        label={__('Nav Margin Top (px)', 'marks')}
                        value={navMarginTop ?? 32}
                        onChange={value => setAttributes({ navMarginTop: value })}
                        min={0}
                        max={120}
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <PanelColorControl
                    label={__('Colors', 'marks')}
                    colorSettings={[
                        {
                            label: __('Heading', 'marks'),
                            value: headingColor,
                            onChange: color => setAttributes({ headingColor: color })
                        },
                        {
                            label: __('Description', 'marks'),
                            value: descriptionColor,
                            onChange: color => setAttributes({ descriptionColor: color })
                        },
                        {
                            label: __('Tab Label', 'marks'),
                            value: tabLabelColor,
                            onChange: color => setAttributes({ tabLabelColor: color })
                        },
                        {
                            label: __('Tab Label Active', 'marks'),
                            value: tabLabelActiveColor,
                            onChange: color => setAttributes({ tabLabelActiveColor: color })
                        },
                        {
                            label: __('Left Background', 'marks'),
                            value: leftBgColor,
                            onChange: color => setAttributes({ leftBgColor: color })
                        }
                    ]}
                />
            </InspectorControls>
        </>
    );
};

export default Inspector;
