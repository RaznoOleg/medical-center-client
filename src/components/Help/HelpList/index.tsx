import { Help } from '../../common/types';
import HelpItem from '../HelpItem';
import { useTranslation } from 'react-i18next';
import { useHelpers } from '../../../constants/mockData';
import ItemList from '../../ItemList';

const HelpList = () => {
  const { t } = useTranslation();

  const helpers = useHelpers();

  return (
    <ItemList<Help>
      data={helpers}
      renderItem={(helper, index, searchValue) => (
        <HelpItem
          key={index}
          title={helper.question}
          content={helper.answer}
          searchValue={searchValue}
        />
      )}
      placeholder={t('Common.search')}
      notFoundMessage={t('Common.notFound')}
    />
  );
};

export default HelpList;
