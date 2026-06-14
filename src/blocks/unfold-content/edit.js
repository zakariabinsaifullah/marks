import { useBlockProps, useInnerBlocksProps, BlockControls } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { plus } from '@wordpress/icons';
import classNames from 'classnames';
import Inspector from './inspector';

const TEMPLATE = [
    ['marks/unfold-content-item', {}],
    ['marks/unfold-content-item', {}],
    ['marks/unfold-content-item', {}]
];

const Edit = props => {
    const { attributes, clientId, isSelected } = props;
    const { uniqueId, contentGap, itemsGap } = attributes;

    const cssCustomProperties = {
        ...(contentGap && { '--item-gap': `${contentGap}px` }),
        ...(itemsGap && { '--items-gap': `${itemsGap}px` })
    };

    const blockProps = useBlockProps({
        className: classNames(uniqueId),
        style: cssCustomProperties
    });

    const innerBlockProps = useInnerBlocksProps(
        { className: 'marks-unfold-content' },
        {
            allowedBlocks: ['marks/unfold-content-item'],
            template: TEMPLATE,
            templateLock: false,
            renderAppender: false
        }
    );

    const addItem = () => {
        const childBlocks = wp.data.select('core/block-editor').getBlocks(clientId);
        const newBlock = wp.blocks.createBlock('marks/unfold-content-item', {});
        wp.data.dispatch('core/block-editor').insertBlocks(newBlock, childBlocks.length, clientId);
    };

    return (
        <Fragment>
            {isSelected && <Inspector {...props} />}
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon={plus}
                        label={__('Add Item', 'marks')}
                        onClick={addItem}
                    />
                </ToolbarGroup>
            </BlockControls>
            <div {...blockProps}>
                <div {...innerBlockProps} />
            </div>
        </Fragment>
    );
};

export default Edit;
