import { useBlockProps, useInnerBlocksProps, RichText, BlockControls } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { plus } from '@wordpress/icons';
import classNames from 'classnames';
import Inspector from './inspector';
import './editor.scss';

const TEMPLATE = [
    ['marks/remote-tab-item', {}],
    ['marks/remote-tab-item', {}],
    ['marks/remote-tab-item', {}],
    ['marks/remote-tab-item', {}]
];

const Edit = props => {
    const { attributes, setAttributes, clientId } = props;
    const { uniqueId, heading, description, headingColor, descriptionColor, tabLabelColor, tabLabelActiveColor, leftBgColor, showHeading, showDescription, showDivider, blockStyle } = attributes;
    const [activeTab, setActiveTab] = useState(0);

    const innerBlocks = useSelect(
        select => select('core/block-editor').getBlocks(clientId),
        [clientId]
    );

    const selectedTabIndex = useSelect(select => {
        const selectedId = select('core/block-editor').getSelectedBlockClientId();
        if (!selectedId) return -1;
        const blocks = select('core/block-editor').getBlocks(clientId);
        const directIndex = blocks.findIndex(b => b.clientId === selectedId);
        if (directIndex >= 0) return directIndex;
        const parents = select('core/block-editor').getBlockParents(selectedId);
        for (let i = 0; i < blocks.length; i++) {
            if (parents.includes(blocks[i].clientId)) return i;
        }
        return -1;
    }, [clientId]);

    useEffect(() => {
        if (selectedTabIndex >= 0) setActiveTab(selectedTabIndex);
    }, [selectedTabIndex]);

    const cssCustomProperties = {
        ...(headingColor && { '--rt-heading-color': headingColor }),
        ...(descriptionColor && { '--rt-desc-color': descriptionColor }),
        ...(tabLabelColor && { '--rt-label-color': tabLabelColor }),
        ...(tabLabelActiveColor && { '--rt-label-active-color': tabLabelActiveColor }),
        ...(leftBgColor && { '--rt-left-bg': leftBgColor })
    };

    useEffect(() => {
        setAttributes({ blockStyle: cssCustomProperties });
    }, [headingColor, descriptionColor, tabLabelColor, tabLabelActiveColor, leftBgColor]);

    const blockProps = useBlockProps({
        className: classNames('marks-remote-tabs', uniqueId),
        style: cssCustomProperties
    });

    const innerBlockProps = useInnerBlocksProps(
        { className: 'remote-tabs-panels', 'data-active-tab': activeTab },
        {
            allowedBlocks: ['marks/remote-tab-item'],
            template: TEMPLATE
        }
    );

    const addTab = () => {
        const childBlocks = wp.data.select('core/block-editor').getBlocks(clientId);
        const newBlock = wp.blocks.createBlock('marks/remote-tab-item', {});
        wp.data.dispatch('core/block-editor').insertBlocks(newBlock, childBlocks.length, clientId);
    };

    return (
        <>
            <Inspector {...props} />
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon={plus}
                        label={__('Add Tab', 'marks')}
                        onClick={addTab}
                    />
                </ToolbarGroup>
            </BlockControls>
            <div {...blockProps}>
                <div className={classNames('remote-tabs-left', { 'has-no-header': !showHeading && !showDescription && !showDivider })}>
                    <div className="remote-tabs-header">
                        {showHeading && (
                            <RichText
                                tagName="h2"
                                className="remote-tabs-heading"
                                value={heading}
                                onChange={value => setAttributes({ heading: value })}
                                placeholder={__('Section Heading…', 'marks')}
                            />
                        )}
                        {showDescription && (
                            <RichText
                                tagName="p"
                                className="remote-tabs-description"
                                value={description}
                                onChange={value => setAttributes({ description: value })}
                                placeholder={__('Section description…', 'marks')}
                            />
                        )}
                        {showDivider && <hr className="remote-tabs-divider" />}
                    </div>
                    <div className="remote-tabs-nav">
                        {innerBlocks.map((block, i) => (
                            <button
                                key={block.clientId}
                                type="button"
                                className={classNames('remote-tab-btn', { 'is-active': activeTab === i })}
                                onClick={() => setActiveTab(i)}
                            >
                                {block.attributes.tabLabel || __('Tab Label', 'marks')}
                            </button>
                        ))}
                    </div>
                </div>
                <div {...innerBlockProps} />
            </div>
        </>
    );
};

export default Edit;
