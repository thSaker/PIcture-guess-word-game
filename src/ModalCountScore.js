import { Modal, Button } from "react-bootstrap";
function ModalCountScore({
  show,
  handleClose,
  isNext,
  setIsNext,
  nextQuestion,
  userAnswer,
}) {
  const handleCheckQuestion = () => {
    if (isNext) {
      nextQuestion(userAnswer)
      setIsNext(false)
    }
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>Thông báo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isNext ? <p>Bạn đã trả lời đúng!</p> : <p>Bạn đã trả lời sai</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCheckQuestion}>
          {isNext ? "Next Question" : "OK"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCountScore;
