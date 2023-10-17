import { Modal, Button } from "react-bootstrap";

function ModalRestart(props) {
  const handleRestartClick = () => {
    props.setChosenLetters(Array(props.numCharacters).fill(""));
    props.setAvailableLetters(
      props.shuffleArray([
        ...props.word.split(""),
        ...props.generateRandomNonDuplicateLetters(props.word.split(""), 4),
      ])
    );
    props.setDeletedLetters([]);
    props.onRestart(true); 
    props.onHide();
  };
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Bắt đầu lại
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Điểm hiện tại: {props.score}<br />
          Bạn có chắc chắn muốn bắt đầu lại?
        </p>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button variant="danger" onClick={handleRestartClick}>Restart</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalRestart;
