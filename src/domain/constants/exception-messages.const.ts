const EXCEPTION_MESSAGES = {
  INVALID_DATA: 'Один или несколько параметров не прошли валидацию',
  BAD_REQUEST: 'Некорректные параметры запроса',
  NOT_FOUND: 'Не удалось найти информацию на сервере',
  FORBIDDEN: 'Доступ запрещен',
  UNAUTHORIZED: 'Неавторизированный запрос',
  ERROR_SENDING_INTERSERVER_REQUEST: 'Ошибка отправки межсерверного запроса',
  INTERNAL_SERVER_ERROR: 'Внутренняя ошибка сервера',
};

export default EXCEPTION_MESSAGES;
