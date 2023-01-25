import { useEffect, useState } from 'react';
import CardApi from '../_lib/api/CardApi';

const getCustom = (cardSide: any) => {
  let custom = { type: '', value: '' };
  const background = cardSide.background;
  if (background) {
    custom = background.color
      ? { type: 'color', value: background.color }
      : { type: 'gradient', value: background.gradient };
  } else if (cardSide.image) {
    custom = {
      type: 'image',
      value: `http://localhost:5000/uploads/images/${cardSide.image.filename}`,
    };
  }
  return custom;
};

const useFetchCard = (id: number | null) => {
  const [card, setCard] = useState<any>();

  useEffect(() => {
    if (!id) return;
    const fetchCard = async (id: number) => {
      const data = (await CardApi.getCard(id)).data;
      const { title, author, front, back } = data;
      const cardCustom = [getCustom(front), getCustom(back)];
      const cardData = {
        cardInfo: {
          title: title,
          author: author,
        },
        cardContents: {
          front: front.content,
          back: back.content,
        },
        cardCustomFront: {
          type: cardCustom[0].type,
          value: cardCustom[0].value,
          fontColor: front.font.color,
          ...(cardCustom[0].type === 'image' && {
            file: new File([], front.image.filename),
          }),
        },
        cardCustomBack: {
          type: cardCustom[1].type,
          value: cardCustom[1].value,
          fontColor: back.font.color,
          ...(cardCustom[1].type === 'image' && {
            file: new File([], back.image.filename),
          }),
        },
      };
      setCard(cardData);
    };

    fetchCard(id);
  }, [id]);

  return card;
};

export default useFetchCard;
