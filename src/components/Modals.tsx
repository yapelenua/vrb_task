import Modal from 'react-modal';
import InfoModalComponent from '../components/InfoModalComponent';
import CreateModalComponent from '../components/CreateModalComponent';
import { useStore } from '../store/moviesStore';

export default function FavoritePage() {
  const { modalIsOpen, createModalIsOpen } = useStore();

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => useStore.setState({ modalIsOpen: false })}
        contentLabel="Edit Modal"
      >
        <InfoModalComponent />
      </Modal>
      <Modal
        isOpen={createModalIsOpen}
        onRequestClose={() => useStore.setState({ createModalIsOpen: false })}
        contentLabel="Create Modal"
      >
        <CreateModalComponent />
      </Modal>
    </div>
  );
}
