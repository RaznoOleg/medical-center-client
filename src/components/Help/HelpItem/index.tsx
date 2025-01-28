import React from 'react';
import CardWrapper from '../../Wrapper/CardWrapper';
import { ItemContainer } from '../../common/styles';
import { ContentContainer } from './styles';
import { HighlightedText } from '../../HighlightText';

interface IHelpItem {
  title: string;
  content: string;
  searchValue: string;
}

const HelpItem = ({ searchValue, title, content }: IHelpItem) => {
  return (
    <ItemContainer>
      <CardWrapper title={title} searchValue={searchValue}>
        <ContentContainer>
          <HighlightedText searchValue={searchValue} text={content} />
        </ContentContainer>
      </CardWrapper>
    </ItemContainer>
  );
};

export default HelpItem;
