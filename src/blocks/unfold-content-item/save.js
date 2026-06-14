import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { RenderIcon } from '../../helpers';

const Save = props => {
    const { attributes } = props;
    const { iconName, customSvgCode, blockStyle, iconSize } = attributes;

    const blockProps = useBlockProps.save({ style: blockStyle });

    return (
        <div {...blockProps}>
            <div className="unfold-item-wrapper">
                <div className="unfold-icon">
                    <RenderIcon
                        customSvgCode={customSvgCode}
                        iconName={iconName}
                        size={Math.round((iconSize || 52) * 0.5)}
                    />
                </div>
                <div className="unfold-content">
                    <InnerBlocks.Content />
                </div>
            </div>
        </div>
    );
};

export default Save;
