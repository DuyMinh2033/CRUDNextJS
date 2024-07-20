"use client";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface props {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  data: IBlog;
}

function DeleteModalComponent(props: props) {
  const { isOpenModal, setIsOpenModal, data } = props;
  const handleSubmit = () => {
    fetch(`http://localhost:8000/blogs/${data.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((d) => {
        if (d) {
          toast.warning("Deleted succeed!");
          setIsOpenModal(false);
          mutate("http://localhost:8000/blogs");
        }
      })
      .catch((error) => {});
  };
  console.log("data", data);
  return (
    <>
      <Modal
        show={isOpenModal}
        onHide={() => setIsOpenModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Do you want to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <Form.Label htmlFor="inputPassword5">Title: {data.title}</Form.Label>
          <Form.Text> </Form.Text>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setIsOpenModal(false)} variant="secondary">
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

export default DeleteModalComponent;
