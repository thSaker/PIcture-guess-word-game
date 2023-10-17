import { Modal, Button } from "react-bootstrap";
function ModalEndGame({
  show,
  handleClose,
  score,
  restart,
  setCurrentQuestion,
  setScore,
}) {
  function handleRestart() {
    restart();
    setCurrentQuestion(0);
    setScore(0);
    handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>Thông báo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Bạn đã hoàn thành trò chơi với số điểm: {score}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Thoát
        </Button>
        <Button variant="info" onClick={handleRestart}>
          Bắt đầu lại
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEndGame;
