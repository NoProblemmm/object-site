import { useApiTokenProvider } from "./ApiToken.provider";
import { type ISignInRequest, type ISignUpRequest } from "./data-details";
import { useApi } from "./hooks/useApi";

export const Api = () => {
  const { POST, GET, DELETE } = useApi;
  const accessToken = useApiTokenProvider.accessToken;
  const refreshToken =
    useApiTokenProvider.refreshToken || localStorage.getItem("refresh_token");

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
  const updateToken = async () => {
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
    const headers = {
      Authorization: `Bearer ${accessToken}`,
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
    const response = POST(
      "add-mytrack",
      { trackId },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response;
  };

  // Удаление трека из избранных
  const deleteMyTrack = (trackId: number) => {
    const response = DELETE(
      "delete-mytrack",
      { trackId },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response;
  };

  // Получить мой профиль
  const getMyProfile = () => {
    const response = GET("getMyProfile", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  };

  // Запрос на композитора
  const requestComposerUser = (userId: number) => {
    const response = POST(
      "requestComposeUser",
      { userId },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response;
  };

  //!!! Изменение аватарки User (Не рабочий нужна DB)
  const setAvatarUser = (file: any) => {
    const response = POST(
      "setAvatarUser",
      { file },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response;
  };

  return {
    signIn,
    signUp,
    getTrack,
    getMyTrack,
    searchTrack,
    updateToken,
    addMyTrack,
    deleteMyTrack,
    getMyProfile,
    requestComposerUser,
    setAvatarUser,
  };
};
