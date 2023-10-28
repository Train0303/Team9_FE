import { useState } from "react";
import { useCloseModal } from "../../hooks/useCloseModal";

import ModalButtonBox from "../atoms/ModalButtonBox";
import ModalPrevButton from "../atoms/ModalPrevButton";
import ModalNextButton from "../atoms/ModalNextButton";
import ModalBase from "../molecules/ModalBase";

const MultiStepModalBase = ({
  children = [],
  size = "",
  lastButtonName = "확인",
  lastButtonHandler,
}) => {
  const [page, setPage] = useState(1);

  const goToPrevPage = () => {
    setPage((page) => Math.max(1, page - 1));
  };
  const goToNextPage = () => {
    setPage((page) => Math.min(children.length, page + 1));
  };

  const leftButton = () => {
    if (page === 1) return <div></div>;
    else
      return (
        <ModalPrevButton clickHandler={goToPrevPage}>이전</ModalPrevButton>
      );
  };
  const rightButton = () => {
    if (page === children.length)
      return (
        <ModalNextButton clickHandler={lastButtonHandler}>
          {lastButtonName}
        </ModalNextButton>
      );
    else
      return (
        <ModalNextButton clickHandler={goToNextPage}>다음</ModalNextButton>
      );
  };
  const buttonBox = () => {
    return (
      <ModalButtonBox>
        {leftButton()}
        {rightButton()}
      </ModalButtonBox>
    );
  };

  return (
    <>
      <ModalBase size={size}>
        {children[page - 1]}
        {buttonBox()}
      </ModalBase>
    </>
  );
};
export default MultiStepModalBase;
