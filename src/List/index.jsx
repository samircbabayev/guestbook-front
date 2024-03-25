import { Center } from "@chakra-ui/react";
import { useGetList } from "../hooks";
import { Layout } from "./Layout";
import { PageSkeleton } from "./Skeleton";
import { Table } from "./Table";
import { useState } from "react";

export const List = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onChangePageHandler = (event, pageNumber) => {
    if (event === "prev") {
      setCurrentPage((prev) => prev - 1);
    }
    if (event === "next") {
      setCurrentPage((prev) => prev + 1);
    }
    if (event === "custom") {
      setCurrentPage(pageNumber);
    }
  };

  const { data, mutate } = useGetList({ page: currentPage });



  return (
    <Center pt="30px">
      <Layout mutate={mutate} >
        {!!data ? (
        <Table data={data} mutate={mutate} onChangePageHandler={onChangePageHandler} />
        ) : (
          <PageSkeleton />
        )}
      </Layout>
    </Center>
  );
};
