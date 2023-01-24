interface CardProps {
  title: string;
  author: string;
  cardContents: {
    front: string;
    back: string;
  };
  cardCustomFront: CardCustom;
  cardCustomBack: CardCustom;
}

interface CardCustom {
  type: string;
  value: string;
  fontColor: string;
  file: File;
}

class Card {
  title: string;
  author: string;
  cardContents: {
    front: string;
    back: string;
  };
  cardCustomFront: CardCustom;
  cardCustomBack: CardCustom;
  constructor({
    title,
    author,
    cardContents,
    cardCustomFront,
    cardCustomBack,
  }: CardProps) {
    this.title = title;
    this.author = author;
    this.cardContents = cardContents;
    this.cardCustomFront = cardCustomFront;
    this.cardCustomBack = cardCustomBack;
  }

  genSubmitData() {
    let data = {
      title: this.title,
      author: this.author,
      front: {
        content: this.cardContents.front ? this.cardContents.front : '',
        ...(this.cardCustomFront.type === 'color' && {
          background: {
            color: this.cardCustomFront.value,
          },
        }),
        ...(this.cardCustomFront.type === 'gradient' && {
          background: {
            gradient: this.cardCustomFront.value,
          },
        }),
        ...(this.cardCustomFront.type === 'image' && {
          image: { filename: this.cardCustomFront.file.name },
        }),
        font: { color: this.cardCustomFront.fontColor },
      },
      back: {
        content: this.cardContents.back ? this.cardContents.back : '',
        ...(this.cardCustomBack.type === 'color' && {
          background: { color: this.cardCustomBack.value },
        }),
        ...(this.cardCustomBack.type === 'gradient' && {
          background: {
            gradient: this.cardCustomBack.value,
          },
        }),
        ...(this.cardCustomBack.type === 'image' && {
          image: { filename: this.cardCustomBack.file.name },
        }),
        font: { color: this.cardCustomBack.fontColor },
      },
    };

    return data;
  }
}

export default Card;
