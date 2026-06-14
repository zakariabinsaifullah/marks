import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { Fragment, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Inspector from './inspector';
import { RenderIcon } from '../../helpers';

const TEMPLATE = [
    ['core/heading', { level: 4, placeholder: __('Heading…', 'marks') }],
    ['core/paragraph', { placeholder: __('Description…', 'marks') }]
];

const Edit = props => {
    const { attributes, setAttributes, isSelected } = props;
    const { iconName, customSvgCode, iconSize } = attributes;

    const cssCustomProperties = {
        ...(iconSize && { '--icon-size': `${iconSize}px` })
    };

    const blockProps = useBlockProps({
        className: 'is-active',
        style: cssCustomProperties
    });

    const innerBlockProps = useInnerBlocksProps(
        { className: 'unfold-content' },
        {
            template: TEMPLATE,
            templateLock: false
        }
    );

    useEffect(() => {
        setAttributes({ blockStyle: cssCustomProperties });
    }, [iconSize]);

    return (
        <Fragment>
            {isSelected && <Inspector {...props} />}
            <div {...blockProps}>
                <div className="unfold-item-wrapper">
                    <div className="unfold-icon">
                        <RenderIcon customSvgCode={customSvgCode} iconName={iconName} />
                    </div>
                    <div {...innerBlockProps} />
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;
