import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  ActionsContainer,
  StyledDesktopDateTimePicker,
  StyledFilter,
  StyledLabel,
  Trash,
} from './TimeFilter.style';
import { CalendarIcon } from '../../icons';
import { colorPalette } from '../../../context/theme/lightMode';

interface TimeFilterProps {
  onChange: (date: string | null | undefined) => void;
  value?: string;
  label: string;
}

export const TimeFilter = ({ label, onChange, value }: TimeFilterProps) => {
  return (
    <StyledFilter>
      <StyledLabel>{label}</StyledLabel>{' '}
      <ActionsContainer>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StyledDesktopDateTimePicker
            value={value ? dayjs(value) : null}
            onChange={date => {
              onChange(date ? new Date(date.toString()).toISOString() : null);
            }}
            slots={{
              openPickerIcon: () => (
                <CalendarIcon size={20} color={colorPalette.link.color} />
              ),
            }}
          />
        </LocalizationProvider>
        <Trash
          onClick={() => {
            onChange(null);
          }}
          size={35}
          color={colorPalette.link.color}
        />
      </ActionsContainer>
    </StyledFilter>
  );
};
