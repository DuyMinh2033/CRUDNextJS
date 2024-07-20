"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import useSWR, { Fetcher } from "swr";

interface props {
  id: number;
}
function CardComponent(props: props) {
  const { id } = props;

  const fetcher: Fetcher<IBlog, string> = (url: string) =>
    fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blogs/${id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ fontSize: "20px", height: "90vh", color: "blue" }}
      >
        ....Loading
      </div>
    );
  }
  return (
    <>
      <Link href={"/"} className="btn btn-dark mt-4 mb-2">
        Back
      </Link>
      <Card>
        <Card.Header>Quote</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>Author: {data?.author}</p>
            <footer className="blockquote-footer">
              {data?.title}
              <p>{data?.content}</p>
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardComponent;
