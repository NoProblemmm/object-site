import { useApiTokenProvider } from "./ApiToken.provider";
import { type ISignInRequest } from "./data-details";
import { useApi } from "./hooks/useApi";

export const Api = () => {
  const { POST, GET, DELETE } = useApi;

  // Авторизация
  const signIn = async (data: ISignInRequest) => {
    const response = await POST(
      "login",
      {
        email: data.email,
        password: data.password,
      },
      {}
    );
    return response;
  };

  // Обновление токена
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      console.log("Нет токена рефреш");
    }
    const response = await POST("refresh-token", { refreshToken }, {});
    return response;
  };

  // Получение треков
  const getTrack = async () => {
    const response = await GET("tracks");
    return response;
  };

  // Получение треков пользователя
  const getMyTrack = async () => {
    const token = useApiTokenProvider.accessToken;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await GET("my-tracks", { headers });
      return response;
    } catch (error) {
      console.error("Ошибка загрузки моих треков:", error);
      return {};
    }
  };

  // Добавление трека в избранное
  const addMyTrack = async (trackId: number) => {
    const token = useApiTokenProvider.accessToken;
    const response = POST(
      "add-mytrack",
      { trackId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response;
  };

  // Удаление трека из избранных
  const deleteMyTrack = (trackId: number) => {
    const token = useApiTokenProvider.accessToken;
    const response = DELETE(
      "delete-mytrack",
      { trackId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response;
  };
  return {
    signIn,
    getTrack,
    getMyTrack,
    refreshToken,
    addMyTrack,
    deleteMyTrack,
  };
};
