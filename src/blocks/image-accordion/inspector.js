import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

import {
    NativeRangeControl,
    PanelColorControl
} from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { height, overlayColor } = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('Accordion Settings', 'marks')} initialOpen={true}>
                    <NativeRangeControl
                        label={__('Height (px)', 'marks')}
                        value={height}
                        onChange={value => setAttributes({ height: value })}
                        min={200}
                        max={900}
                        step={10}
                        resetFallbackValue={500}
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <PanelBody title={__('Overlay Color', 'marks')} initialOpen={true}>
                    <PanelColorControl
                        label={__('Inactive Overlay Color', 'marks')}
                        colorSettings={[
                            {
                                value: overlayColor,
                                onChange: color => setAttributes({ overlayColor: color }),
                                label: __('Color', 'marks')
                            }
                        ]}
                    />
                </PanelBody>
            </InspectorControls>
        </>
    );
};

export default Inspector;
