/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Flex, FlexItem, SearchControl, Icon, Button } from '@wordpress/components';

/**
 * ContentIcons Component
 * Displays the icon library grid with search functionality
 */
export const ContentIcons = ({ searchTerm, setSearchTerm, filteredIcons, currentIconName, handleIconSelect }) => {
    return (
        <>
            <Flex>
                <FlexItem>
                    <SearchControl
                        value={searchTerm}
                        onChange={setSearchTerm}
                        label={__('Search icons', 'marks')}
                        placeholder={__('Search...', 'marks')}
                        className="marks-modal__search"
                        size="compact"
                    />
                </FlexItem>
            </Flex>

            {filteredIcons.length === 0 ? (
                <p>{__('No icons found!', 'marks')}</p>
            ) : (
                <div className="marks-modal__icons">
                    {filteredIcons.map(iconData => (
                        <Button
                            key={iconData.name}
                            className={`marks-modal__icons-button ${currentIconName === iconData.name ? 'is-selected' : ''}`}
                            onClick={() => handleIconSelect(iconData)}
                        >
                            <Icon icon={iconData.icon} size={32} />
                            <span className="icon-title">{iconData.title}</span>
                        </Button>
                    ))}
                </div>
            )}
        </>
    );
};
