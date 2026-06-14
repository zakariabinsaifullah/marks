import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import classNames from 'classnames';

const Save = props => {
    const { attributes } = props;
    const { uniqueId, heading, description, showHeading, showDescription, showDivider, blockStyle } = attributes;

    const blockProps = useBlockProps.save({
        className: classNames('marks-remote-tabs', uniqueId),
        style: blockStyle
    });

    return (
        <div {...blockProps}>
            <div className="remote-tabs-left">
                <div className="remote-tabs-header">
                    {showHeading && <RichText.Content tagName="h2" className="remote-tabs-heading" value={heading} />}
                    {showDescription && <RichText.Content tagName="p" className="remote-tabs-description" value={description} />}
                    {showDivider && <hr className="remote-tabs-divider" />}
                </div>
                <div className="remote-tabs-nav" role="tablist" aria-label="Tab Navigation"></div>
            </div>
            <div className="remote-tabs-panels">
                <InnerBlocks.Content />
            </div>
        </div>
    );
};

export default Save;
