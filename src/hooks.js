import useSWR from "swr";
import axios from "axios";
import { getQueryString } from "./util";

export const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export const useGetList = (queryParams) => {
  const listFetcher = () =>
    axios
      .get(
        `http://localhost:8000/api/guestbooks?${getQueryString(queryParams)}`
      )
      .then((res) => res.data);
  const { data, isLoading, mutate } = useSWR(
    `/list?${getQueryString(queryParams)}`,
    listFetcher,
    options
  );

  return { data, isLoading, mutate };
};

export const useGetImages = (id) => {
  const imagesFetcher = () =>
    axios
      .get(`http://localhost:8000/api/guestbooks/${id}/images`)
      .then((res) => res.data);
  const { data, isLoading } = useSWR(`/images/${id}`, imagesFetcher, options);
  return { images: data?.data, message: data?.message, isLoading };
};

export const useSendMessage = () => {
  const sendMessage = (data) => axios
                              .post(`http://localhost:8000/api/guestbooks/add`,data, {
                                headers: {
                                  'accept': 'application/json',
                                  'Accept-Language': 'en-US,en;q=0.8',
                                  'Content-Type': `multipart/form-data;`,
                                }
                              })
                              .then((res) => res.data)
                              .catch((error) => error);
  return {sendMessage};
}

export const useDeleteMessage = () => {
  const deleteMessage = (id) => axios
                                .delete(`http://localhost:8000/api/guestbooks/${id}/delete`)
                              .then((res) => res.data)
                              .catch((error) => error);
  return {deleteMessage};
}