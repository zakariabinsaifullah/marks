import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { RenderIcon } from '../../helpers';

const Save = props => {
    const { attributes } = props;
    const { iconName, customSvgCode, blockStyle, iconSize } = attributes;

    const blockProps = useBlockProps.save({ style: blockStyle });

    return (
        <div {...blockProps}>
            <div className="timeline-icon-row">
                <div className="timeline-icon">
                    <RenderIcon customSvgCode={customSvgCode} iconName={iconName} size={Math.round((iconSize || 48) * 0.55)} />
                </div>
            </div>
            <div className="timeline-card">
                <div className="timeline-content">
                    <InnerBlocks.Content />
                </div>
            </div>
        </div>
    );
};

export default Save;
