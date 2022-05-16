export default {
  translation: {
    loginForm: {
      login: 'Войти',
      welcomeHeader: 'Войти',
      usernameLabel: 'Ваш ник',
      passwordLabel: 'Пароль',
      noAccount: 'Нет аккаунта?',
      registration: 'Регистрация',
      errors: {
        nameRequired: 'Вы не ввели имя пользователя',
        passwordRequired: 'Вы не ввели пароль',
        userNotExist: 'Неверные имя пользователя или пароль',
      },
    },
    registrationForm: {
      welcomeHeader: 'Регистрация',
      usernameLabel: 'Имя пользователя',
      passwordLabel: 'Пароль',
      passwordConfirmLabel: 'Подтвердите пароль',
      submitButton: 'Зарегистрироваться',
      errors: {
        nameRequired: 'Вы не ввели имя пользователя',
        nameMinLength: 'От 3 до 20 символов',
        nameMaxLength: 'От 3 до 20 символов',
        passwordRequired: 'Вы не ввели пароль',
        passwordMinLength: 'Не менее 6 символов',
        passwordConfirmRequired: 'Необходимо подтвердить пароль',
        oneOf: 'Пароли должны совпадать',
        userExist: 'Такой пользователь уже зарегистрирован',
      },
    },
    chatMessages: {
      errors: {
        sendError: 'Не удалось отправить сообщение, повторите попытку позже...',
      },
    },
    channelsList: {
      header: 'Каналы',
      actionDelete: 'Удалить',
      actionRename: 'Переименовать',
      modal: {
        cancelButton: 'Отменить',
        add: {
          button: 'Отправить',
          header: 'Создать канал',
          holderText: 'Введите имя нового канала',
        },
        rename: {
          button: 'Отправить',
          header: 'Переименовать канал',
          holderText: 'Введите новое имя канала...',
        },
        remove: {
          button: 'Удалить',
          header: 'Удалить канал',
          holderText: '',
          confirm: 'Уверены?',
        },
        errors: {
          emptyField: 'Вы не ввели имя канала.',
          minLength: 'Имя канала не может быть меньше 3ех символов.',
          maxLength: 'Имя канала не может быть больше 20 символов.',
          noOneOf: 'Данное имя уже занято.',
        },
      },
    },
    chatHeader: {
      counter: {
        сount_zero: '{{count}} сообщений',
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
    },
    navBar: {
      button: {
        logout: 'Выход',
      },
    },
    toast: {
      remove: 'Канал удален',
      add: 'Создан новый канал',
      rename: 'Канал переименован',
    },
    appErrors: {
      modal: {
        title: 'Что то пошло не так как задумывалось...',
        failFetch: 'Ошибка соединения',
      },
    },
  },
};
