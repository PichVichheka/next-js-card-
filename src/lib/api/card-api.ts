import axiosInstance from "./request";

export const cardRequest = () => {
  const CREATE_CARD = async (payload: any) => {
    return await axiosInstance({
      url: "/card/create-card",
      method: "POST",
      data: payload,
    });
  };

  const UPDATE_CARD = async (cardId: string, payload: any) => {
    return await axiosInstance({
      url: `/card/update-card/${cardId}`,
      method: "PUT",
      data: payload,
    });
  };

  const DELETE_CARD = async (cardId: string) => {
    return await axiosInstance({
      url: `/card/delete-card/${cardId}`,
      method: "DELETE",
    });
  };

  return {
    CREATE_CARD,
    UPDATE_CARD,
    DELETE_CARD,
  };
};
