"use client";
import TableComponent from "@/components/Table/TableComponent";
import useSWR from "swr";

export default function Home() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (isLoading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ fontSize: "20px", height: "90vh", color: "blue" }}
      >
        ....Loading
      </div>
    );

  return (
    <div>
      <TableComponent blogs={data} />
    </div>
  );
}
