import CardComponent from "@/components/CardDetai/CardComponent";
import React from "react";

const ViewBlogs = ({ params }: { params: { id: number } }) => {
  console.log("data");
  return (
    <div>
      <CardComponent id={params.id} />
    </div>
  );
};

export default ViewBlogs;
