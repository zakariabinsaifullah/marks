import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { NativeRangeControl } from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { contentGap, itemsGap } = attributes;

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Unfold Content Settings', 'marks')} initialOpen={true}>
                    <NativeRangeControl
                        label={__('Icon → Heading Gap', 'marks')}
                        value={contentGap}
                        onChange={value => setAttributes({ contentGap: value })}
                        min={0}
                        max={60}
                        step={1}
                        resetFallbackValue={20}
                    />
                </PanelBody>
            </InspectorControls>
        </>
    );
};

export default Inspector;
