import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { NativeRangeControl, NativeUnitControl, PanelColorControl } from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { contentGap, itemsGap, iconBgColor } = attributes;

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Timeline Settings', 'marks')} initialOpen={true}>
                    <NativeRangeControl
                        label={__('Gap (icon → content)', 'marks')}
                        value={contentGap}
                        onChange={value => setAttributes({ contentGap: value })}
                        min={0}
                        max={100}
                        step={1}
                        resetFallbackValue={16}
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <PanelBody title={__('Icon', 'marks')} initialOpen={true}>
                    <PanelColorControl
                        label={__('Icon Background', 'marks')}
                        colorSettings={[
                            {
                                value: iconBgColor,
                                onChange: color => setAttributes({ iconBgColor: color }),
                                label: __('Background', 'marks')
                            }
                        ]}
                    />
                </PanelBody>
            </InspectorControls>
        </>
    );
};

export default Inspector;
