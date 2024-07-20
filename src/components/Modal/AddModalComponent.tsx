"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { mutate } from "swr";
interface props {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
}
function AddModalComponent(props: props) {
  const { isOpenModal, setIsOpenModal } = props;
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleClose = () => {
    setIsOpenModal(false);
    setContent("");
    setAuthor("");
    setTitle("");
  };

  const handleSubmit = () => {
    if (!title || !author || !content) {
      toast.error("Please enter complete information!");
    } else {
      fetch("http://localhost:8000/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author, content }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            toast.success("Create new blog succeed!");
            setIsOpenModal(false);
            handleClose();
            mutate("http://localhost:8000/blogs");
          }
        })
        .catch((error) => {});
    }
  };

  return (
    <>
      <Modal
        show={isOpenModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <Form.Label htmlFor="inputPassword5">Title</Form.Label>
          <Form.Control
            type="text"
            id="inputPassword5"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Label className="my-2" htmlFor="inputPassword5">
            Author
          </Form.Label>
          <Form.Control
            type="text"
            id="inputPassword5"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Form.Label htmlFor="inputPassword5" className="my-2">
            Content
          </Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            id="inputPassword5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ height: "100px" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleSubmit} variant="primary">
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddModalComponent;
