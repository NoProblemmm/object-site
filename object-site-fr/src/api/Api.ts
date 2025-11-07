import { useApiTokenProvider } from "./ApiToken.provider";
import { type ISignInRequest, type ISignUpRequest } from "./data-details";
import { useApi } from "./hooks/useApi";

export const Api = () => {
  const { POST, GET, DELETE } = useApi;

  // Авторизация
  const signIn = async (data: ISignInRequest) => {
    const response = await POST(
      "signIn",
      {
        email: data.email,
        password: data.password,
      },
      {}
    );
    return response;
  };

  // Регистрация
  const signUp = async (data: ISignUpRequest) => {
    const response = await POST(
      "signUp",
      {
        name: data.name,
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
      console.log("Not session!");
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
    }
  };

  // Поиск трека (кодирование)
  const searchTrack = async (name: string) => {
    try {
      const codeName = encodeURIComponent(name);
      const response = await GET(`searchTrack?name=${codeName}`);
      return response;
    } catch (error) {
      console.log(error);
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

  // Получить мой профиль
  const getMyProfile = () => {
    const token = useApiTokenProvider.accessToken;
    const response = GET("getMyProfile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  };
  return {
    signIn,
    signUp,
    getTrack,
    getMyTrack,
    searchTrack,
    refreshToken,
    addMyTrack,
    deleteMyTrack,
    getMyProfile,
  };
};
