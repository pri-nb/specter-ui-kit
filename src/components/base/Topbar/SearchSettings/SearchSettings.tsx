import { CloseIcon } from '../../../icons';
import {
  AdditionalSearchSettingContainer,
  AdditionalSearchSettingTitle,
  CloseSearchSettings,
  SearchOperator,
  SearchOperatorContainer,
  SearchSettingsFiltersContainer,
  StyledButton,
  StyledSearchSettings,
} from './SearchSettings.style';
import { SearchType } from './SearchSettings.types';
import { Divider } from '@mui/material';

export interface SearchSettingsProps {
  searchSettingsStyleOverrides?: string;
  searchType?: SearchType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (searchType: SearchType, extraInfo?: any) => void;
  setSearchType?: (searchType: SearchType) => void;
  close: () => void;
}

/**
 * TODO: document component functionality
 *
 * [Figma](https://https://www.figma.com/file/...)
 *
 * ```tsx
 * <SearchSettings />
 * ```
 */
export function SearchSettings({
  searchSettingsStyleOverrides,
  searchType,
  onChange,
  close,
}: SearchSettingsProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSearchSettingsChange = (searchType: SearchType, extraInfo?: any) => {
    onChange?.(searchType, extraInfo);
  };

  const supportedOperators = ['OR', 'AND', 'NOT', '*', '"', ')', '('];

  return (
    <StyledSearchSettings
      searchSettingsStyleOverrides={searchSettingsStyleOverrides}
    >
      <SearchSettingsFiltersContainer>
        <StyledButton
          selected={searchType === SearchType.Semantic}
          onClick={() => onSearchSettingsChange(SearchType.Semantic)}
        >
          חיפוש סמנטי
        </StyledButton>
        <StyledButton
          selected={searchType === SearchType.Exact}
          onClick={() => onSearchSettingsChange(SearchType.Exact)}
        >
          חיפוש מדויק
        </StyledButton>
        {searchType === SearchType.Exact && (
          <AdditionalSearchSettingContainer>
            <Divider />
            <AdditionalSearchSettingTitle>
              לדיוק טיב החיפוש:
            </AdditionalSearchSettingTitle>
            <SearchOperatorContainer>
              {supportedOperators.map(operator => (
                <SearchOperator
                  onClick={() =>
                    onSearchSettingsChange(SearchType.Exact, { operator })
                  }
                >
                  {operator}
                </SearchOperator>
              ))}
            </SearchOperatorContainer>
          </AdditionalSearchSettingContainer>
        )}
      </SearchSettingsFiltersContainer>

      <CloseSearchSettings onClick={close}>
        <CloseIcon size={24} />
      </CloseSearchSettings>
    </StyledSearchSettings>
  );
}
