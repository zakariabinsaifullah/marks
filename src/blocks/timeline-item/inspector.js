import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { PanelColorControl, NativeIconPicker, NativeRangeControl } from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { iconName, customSvgCode, iconBgColor, iconSize } = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('Icon', 'marks')} initialOpen={false}>
                    <NativeIconPicker
                        label={__('Select Icon', 'marks')}
                        onIconSelect={(name, iconType) => {
                            setAttributes({ iconName: name, customSvgCode: '' });
                        }}
                        onCustomSvgInsert={({ customSvgCode: svg }) => {
                            setAttributes({ customSvgCode: svg, iconName: '' });
                        }}
                        iconName={iconName}
                        customSvgCode={customSvgCode}
                    />
                </PanelBody>
            </InspectorControls>
        </>
    );
};

export default Inspector;
