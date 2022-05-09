export default {
  translation: {
    loginForm: {
      login: 'Войти',
      welcomeHeader: 'Войти',
      usernameLabel: 'Имя пользователя',
      passwordLabel: 'Пароль',
      noAccount: 'Нет аккаунта?',
      registration: 'Регистрация',
      errors: {
        userNotExist: 'Такой пользователь не зарегистрирован',
      },
    },
    registrationForm: {
      errors: {},
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
    appErrors: {
      modal: {
        title: 'Что то пошло не так как задумывалось...',
        body: 'Молодой человек, ну вы что, не видите что у нас обед? Приходте позже!',
      },
    },
  },
};