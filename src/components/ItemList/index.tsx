import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ItemListContainer,
  ItemsList,
  NotFound,
  SearchContainer,
  SearchForm
} from './styles';
import Input from '../Input';
import { AddButton, LoadMoreButton } from '../common/styles';
import { FormValues } from '../common/types';
import { useTranslation } from 'react-i18next';
import { PATH } from '../../constants/routes';
import usePagination from '../../utils/hooks/usePagination';

interface ItemListProps<T> {
  data: T[];
  renderItem: (item: T, index: number, searchValue: string) => JSX.Element;
  placeholder: string;
  notFoundMessage: string;
  isButton?: boolean;
}

const ItemList = <T extends {}>({
  data,
  renderItem,
  placeholder,
  notFoundMessage,
  isButton = false
}: ItemListProps<T>) => {
  const { t } = useTranslation();

  const { control } = useForm<FormValues>({ mode: 'onChange' });

  const [searchValue, setSearchValue] = useState('');

  const { startIndex, endIndex, handleLoadMoreClick } = usePagination();

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    setSearchValue(e.currentTarget.search.value);
  };

  const getFilteredItems = (search: string, items: T[]) => {
    if (search.trim() !== '') {
      return items.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
      );
    }
    return items;
  };

  const filteredItems = getFilteredItems(searchValue, data);

  return (
    <ItemListContainer>
      <SearchContainer>
        <SearchForm onChange={handleChange}>
          <Input
            control={control}
            fullWidth
            name="search"
            placeholder={placeholder}
          />
        </SearchForm>
        {isButton && (
          <AddButton to={PATH.CREATE_PATIENT}>
            {t('Patient.addPatient')}
          </AddButton>
        )}
      </SearchContainer>
      <div>
        {filteredItems.length > 0 ? (
          <ItemsList>
            {filteredItems
              .slice(startIndex, endIndex)
              .map((item, index) => renderItem(item, index, searchValue))}
          </ItemsList>
        ) : (
          <NotFound>{notFoundMessage}</NotFound>
        )}

        {filteredItems.length > endIndex && (
          <LoadMoreButton onClick={handleLoadMoreClick}>
            {t('Common.loadMore')}
          </LoadMoreButton>
        )}
      </div>
    </ItemListContainer>
  );
};

export default ItemList;
