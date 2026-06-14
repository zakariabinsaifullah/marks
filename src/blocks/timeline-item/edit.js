import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { Fragment, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Inspector from './inspector';
import { RenderIcon } from '../../helpers';

const INNER_TEMPLATE = [['core/paragraph', { placeholder: __('Step 1:', 'marks'), className: 'timeline-step-label' }]];

const Edit = props => {
    const { attributes, setAttributes, isSelected } = props;
    const { iconName, customSvgCode, iconBgColor, iconSize } = attributes;

    const cssCustomProperties = {
        ...(iconBgColor && { '--icon-bg': iconBgColor }),
        '--icon-size': `${iconSize || 48}px`
    };

    const blockProps = useBlockProps({ style: cssCustomProperties });

    useEffect(() => {
        setAttributes({ blockStyle: cssCustomProperties });
    }, [iconBgColor, iconSize]);

    const innerBlockProps = useInnerBlocksProps({ className: 'timeline-content' }, { template: INNER_TEMPLATE, templateLock: false });

    return (
        <Fragment>
            {isSelected && <Inspector {...props} />}
            <div {...blockProps}>
                <div className="timeline-icon-row">
                    <div className="timeline-icon">
                        <RenderIcon customSvgCode={customSvgCode} iconName={iconName} size={Math.round((iconSize || 48) * 0.55)} />
                    </div>
                </div>
                <div className="timeline-card">
                    <div {...innerBlockProps} />
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;
