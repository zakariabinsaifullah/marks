import { useBlockProps, useInnerBlocksProps, InnerBlocks } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import Inspector from './inspector';

const Edit = props => {
    const { clientId } = props;

    const innerBlockCount = useSelect(
        select => select('core/block-editor').getBlockCount(clientId),
        [clientId]
    );

    const { insertBlock } = useDispatch('core/block-editor');

    useEffect(() => {
        if (innerBlockCount === 0) {
            const paragraph = wp.blocks.createBlock('core/paragraph', {
                placeholder: __('Start writing tab content…', 'marks')
            });
            insertBlock(paragraph, 0, clientId, false);
        }
    }, []);

    const blockProps = useBlockProps();

    const innerBlockProps = useInnerBlocksProps(
        { className: 'remote-tab-content' },
        {
            templateLock: false,
            renderAppender: InnerBlocks.ButtonBlockAppender
        }
    );

    return (
        <>
            <Inspector {...props} />
            <div {...blockProps}>
                <div {...innerBlockProps} />
            </div>
        </>
    );
};

export default Edit;
