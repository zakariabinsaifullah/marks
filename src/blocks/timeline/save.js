import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import classNames from 'classnames';

const Save = props => {
    const { attributes } = props;
    const { uniqueId, contentGap, iconBgColor } = attributes;

    const blockProps = useBlockProps.save({
        className: classNames(uniqueId),
        style: {
            ...(contentGap && { '--item-gap': `${contentGap}px` }),
            ...(iconBgColor && { '--icon-bg': iconBgColor })
        }
    });

    return (
        <div {...blockProps}>
            <div className="marks-timeline">
                <InnerBlocks.Content />
            </div>
        </div>
    );
};

export default Save;
