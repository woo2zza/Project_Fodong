import "./mainStyle.css"; // 모달 스타일을 정의한 CSS 파일

const CharModal = ({ isOpen, closeModal, book }) => {
  if (!isOpen) return null; // isOpen이 false이면 모달을 렌더링하지 않음

  // isOpen이 true일 때 모달 컨텐츠 렌더링
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{book.title}</h2>
        <p>등장인물: {book.characters}</p>
        {/* 캐릭터들을 쉼표로 구분하여 표시 */}
        <p>설명: {book.description}</p>
        <div className="char-select">
          {/* 캐릭터 배열을 반복 처리하여 각 캐릭터 이름을 표시 */}
          {book.characters.map((character, index) => (
            <div key={index}>
              {character} <br />
              {index}
            </div>
          ))}
        </div>
        <button className="modal_button" onClick={closeModal}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default CharModal;
