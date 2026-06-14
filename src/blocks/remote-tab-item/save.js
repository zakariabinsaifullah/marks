import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

const Save = props => {
    const { attributes } = props;
    const { tabLabel } = attributes;

    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps} data-label={tabLabel} role="tabpanel">
            <div className="remote-tab-content">
                <InnerBlocks.Content />
            </div>
        </div>
    );
};

export default Save;
