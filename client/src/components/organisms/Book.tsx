import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {
  sceneStyle,
  bookStyle,
  coverStyle,
  paperStyle,
  pageStyle,
  contentStyle,
} from '../../styles/book';
import CardUI from '../atoms/CardUI';
import ArrowButton from '../atoms/ArrowButton';
import Cover from '../molecules/Cover';

// page 수 = Math.ceil(totalCardNum / limit)
// 장(sheet) 수 = Math.ceil(page/2)
function Book() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ArrowButton icon={faArrowLeft} type="prev" />

      {/* <!-- Book --> */}
      <div css={sceneStyle}>
        <div css={bookStyle}>
          {/* <!-- Book Cover (Front) --> */}
          {/* <div css={coverStyle}></div> */}

          {/* <!-- Page 1 --> */}
          <div css={paperStyle}>
            <div css={pageStyle('front')}>
              <div css={contentStyle}>
                <CardUI title="가나다라마바사 아자차카 타파하" />
                <CardUI title="안녕" />
                <CardUI title="반가워요" />
                <CardUI title="bye" />
              </div>
            </div>

            <div css={pageStyle('back')}>
              <div css={contentStyle}>
                <CardUI title="안녕" />
                <CardUI title="반가워요" />
                <CardUI title="hi" />
                <CardUI title="bye" />
              </div>
            </div>
          </div>

          <Cover order="last" />
          <div css={coverStyle('last')}></div>
        </div>
      </div>

      <ArrowButton icon={faArrowRight} type="next" />
    </div>
  );
}

export default Book;
