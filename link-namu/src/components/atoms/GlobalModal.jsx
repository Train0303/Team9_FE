import { useSelector } from "react-redux";
import { selectModal } from "../../store/slices/modalSlice";

import Container from "./Container";
import Overlay from "./Overlay";
import KakaoModal from "../organisms/KakaoModal";
import BookmarkAddModal from "../organisms/BookmarkAddModal";
import CategoryAddModal from "../organisms/CategoryAddModal";
import NotionModal from "../organisms/NotionModal";
import MODAL_TYPES from "../../constants/modal_types";
import { useCloseModal } from "../../hooks/useCloseModal";
import ShareLinkModal from "../organisms/ShareLinkModal";
import Menubar from "../molecules/Menubar";
import WorkspaceAddModal from "../organisms/WorkspaceAddModal";
import WorkspaceDeleteModal from "../organisms/WorkspaceDeleteModal";
import CategoryDeleteModal from "../organisms/CategoryDeleteModal";
import GoogleDocsModal from "../organisms/GoogleDocsModal";

const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.KakaoModal,
    component: <KakaoModal />,
  },
  {
    type: MODAL_TYPES.NotionModal,
    component: <NotionModal />,
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
  {
    type: MODAL_TYPES.WorkspaceAddModal,
    component: <WorkspaceAddModal />,
  },
  {
    type: MODAL_TYPES.ShareLinkModal,
    component: <ShareLinkModal />,
  },
  {
    type: MODAL_TYPES.Menubar,
    component: <Menubar />,
  },
  {
    type: MODAL_TYPES.WorkspaceDeleteModal,
    component: <WorkspaceDeleteModal />,
  },
  {
    type: MODAL_TYPES.CategoryDeleteModal,
    component: <CategoryDeleteModal />,
  },
  {
    type: MODAL_TYPES.GoogleDocsModal,
    component: <GoogleDocsModal />,
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