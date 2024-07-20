"use client";
import AddModalComponent from "@/components/Modal/AddModalComponent";
import DeleteModalComponent from "@/components/Modal/DeteleComponent";
import EditModalComponent from "@/components/Modal/EditComponent";
import Link from "next/link";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";

interface props {
  blogs: IBlog[];
}
function TableComponent(props: props) {
  const { blogs } = props;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
  const [isOpenModalView, setIsOpenModalView] = useState<boolean>(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
  const [dataDetails, setDataDetail] = useState<IBlog>({
    id: 0,
    author: "",
    content: "",
    title: "",
  });

  const fetchDetail = async (id: number) => {
    const res = await fetch(`http://localhost:8000/blogs/${id}`);
    const data = await res.json();
    setDataDetail({
      id: data.id,
      author: data.author,
      content: data.content,
      title: data.title,
    });
  };
  const handleEdit = (id: number) => {
    setIsOpenModalEdit(true);
    fetchDetail(id);
  };

  const handleDelete = (id: number) => {
    setIsOpenModalDelete(true);
    fetchDetail(id);
  };
  return (
    <div>
      <div className="my-2 mt-5">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Table Blogs</h3>
          <Button onClick={() => setIsOpenModal(true)}>Add</Button>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>
                  <Link href={`/${item.id}`} className="btn btn-primary">
                    {" "}
                    View
                  </Link>
                  <Button
                    className="ms-3"
                    variant="warning"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.id)}
                    className="ms-3"
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <AddModalComponent
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
      <EditModalComponent
        isOpenModal={isOpenModalEdit}
        setIsOpenModal={setIsOpenModalEdit}
        data={dataDetails}
      />
      <DeleteModalComponent
        isOpenModal={isOpenModalDelete}
        setIsOpenModal={setIsOpenModalDelete}
        data={dataDetails}
      />
    </div>
  );
}

export default TableComponent;
