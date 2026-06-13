import { useState } from '@wordpress/element';
import { Modal, Button, TextareaControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const CustomiconModal = ({ customiconPanel, setCustomiconPanel, onInsert, value }) => {
    const [code, setCode] = useState(value || '');
    const [size, setSize] = useState(30);

    if (!customiconPanel) return null;

    const handleInsert = () => {
        if (code.trim() === '') {
            wp.data.dispatch('core/notices').createNotice('error', __('Please enter SVG code', 'marks'), {
                isDismissible: true
            });
            return;
        }
        onInsert(code);
    };

    return (
        <Modal className="svgib__modal custom-svg" title={__('Custom SVG', 'marks')} onRequestClose={() => setCustomiconPanel(false)}>
            <div className="svg-controls">
                <RangeControl label={__('SVG Preview Size', 'marks')} value={size} onChange={v => setSize(v)} min={20} max={150} />
            </div>
            <div className="svgib-modal__wrapper">
                <div className="svg-code">
                    <TextareaControl
                        label={__('SVG Code', 'marks')}
                        help={__('Paste your SVG code here.', 'marks')}
                        value={code}
                        onChange={v => setCode(v)}
                        placeholder={__('<svg>...</svg>', 'marks')}
                        rows={10}
                    />
                </div>
                <div className="svg-preview" style={{ width: size, height: size }}>
                    {code ? (
                        <div dangerouslySetInnerHTML={{ __html: code }} />
                    ) : (
                        <div className="preview-text">{__('SVG Preview', 'marks')}</div>
                    )}
                </div>
            </div>
            <div className="insert-svg">
                <Button variant="primary" onClick={handleInsert}>
                    {__('Insert SVG', 'marks')}
                </Button>
            </div>
        </Modal>
    );
};

export default CustomiconModal;
