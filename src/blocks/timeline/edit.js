import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
import Inspector from './inspector';

const TEMPLATE = [
    ['marks/timeline-item', {}],
    ['marks/timeline-item', {}],
    ['marks/timeline-item', {}]
];

const Edit = props => {
    const { attributes, clientId, isSelected } = props;
    const { uniqueId, contentGap, itemsGap } = attributes;

    const cssCustomProperties = {
        ...(contentGap && { '--item-gap':  `${contentGap}px` }),
        ...(itemsGap   && { '--items-gap': `${itemsGap}px`  }),
    };

    const blockProps = useBlockProps({
        className: classNames(uniqueId),
        style: cssCustomProperties
    });

    const innerBlockProps = useInnerBlocksProps(
        { className: 'marks-timeline' },
        {
            allowedBlocks: ['marks/timeline-item'],
            template: TEMPLATE,
            templateLock: false,
            renderAppender: () => {
                const childBlocks = wp.data.select('core/block-editor').getBlocks(clientId);
                return (
                    <button
                        className="marks-timeline-add-btn"
                        onClick={() => {
                            const newBlock = wp.blocks.createBlock('marks/timeline-item', {});
                            wp.data
                                .dispatch('core/block-editor')
                                .insertBlocks(newBlock, childBlocks.length, clientId);
                        }}
                    >
                        {__('+ Add Timeline Item', 'marks')}
                    </button>
                );
            }
        }
    );

    return (
        <Fragment>
            {isSelected && <Inspector {...props} />}
            <div {...blockProps}>
                <div {...innerBlockProps} />
            </div>
        </Fragment>
    );
};

export default Edit;
