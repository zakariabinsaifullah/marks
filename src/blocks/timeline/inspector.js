import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { NativeRangeControl, NativeUnitControl } from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { contentGap, itemsGap } = attributes;

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
                        resetFallbackValue={28}
                    />
                    <NativeRangeControl
                        label={__('Gap Between Items', 'marks')}
                        value={itemsGap}
                        onChange={value => setAttributes({ itemsGap: value })}
                        min={0}
                        max={100}
                        step={1}
                    />
                </PanelBody>
            </InspectorControls>
        </>
    );
};

export default Inspector;
