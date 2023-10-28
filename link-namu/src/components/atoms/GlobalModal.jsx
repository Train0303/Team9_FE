import { useSelector } from "react-redux";
import { selectModal } from "../../store/slices/modalSlice";

import Container from "./Container";
import Overlay from "./Overlay";
import KakaoFileUploadModal from "../organisms/KakaoFileUploadModal";
import BookmarkAddModal from "../organisms/BookmarkAddModal";
import CategoryAddModal from "../organisms/CategoryAddModal";
import MODAL_TYPES from "../../constants/modal_types";
import { useCloseModal } from "../../hooks/useCloseModal";

const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.KakaoModal,
    component: <KakaoFileUploadModal />,
  },
  {
    type: MODAL_TYPES.NotionModal,
    component: null,
  },
  {
    type: MODAL_TYPES.GoogleModal,
    component: null,
  },
  {
    type: MODAL_TYPES.BookmarkAddModal,
    component: <BookmarkAddModal />,
  },
  {
    type: MODAL_TYPES.CategoryAddModal,
    component: <CategoryAddModal />,
  },
];

function GlobalModal() {
  const { modalType, isOpen } = useSelector(selectModal);
  const closeModal = useCloseModal();
  if (!isOpen) return;

  const findModal = MODAL_COMPONENTS.find((modal) => {
    return modal.type === modalType;
  });
  const renderModal = () => {
    return findModal.component;
  };

  return (
    <Container>
      <Overlay onClick={closeModal} />
      {renderModal()}
    </Container>
  );
}

export default GlobalModal;
