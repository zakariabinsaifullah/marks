import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { tabLabel } = attributes;

    return (
        <InspectorControls>
            <PanelBody title={__('Tab Settings', 'marks')} initialOpen={true}>
                <TextControl
                    label={__('Tab Label', 'marks')}
                    help={__('This appears as the navigation button on the left side.', 'marks')}
                    value={tabLabel}
                    onChange={value => setAttributes({ tabLabel: value })}
                />
            </PanelBody>
        </InspectorControls>
    );
};

export default Inspector;
