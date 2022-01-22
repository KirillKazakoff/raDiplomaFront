# Дипломный проект курса «React»

Дипломный проект представляет собой интернет-магазин обуви. Задача заключается в создании работающего приложения, всеми основными функциями которого можно пользоваться.

## Содержание

Приложение содержит следующие самостоятельные экраны (страницы):

1. Главная страница
1. Каталог товаров
1. Информационная страница
1. Страница товара
1. Корзина
1. 404

## Переходы между экранами

Навигационным центром приложения являются шапка и футер каждого экрана (страницы):

![Header](./assets/header-menu.png)

![Footer](./assets/footer-menu.png)

Из шапки можно попасть на следующие экраны:
* Логотип и ссылка "Главная" - ведут на главную страницу, URL - "/"
* Каталог - ведёт на страницу каталога, URL - "/catalog.html"
* О магазине - ведёт на страницу "О магазине", URL - "/about.html"
* Контакты - ведёт на страницу "Контакты", URL - "/contacts.html"

Из футера можно попасть на следующие экраны:
* О магазине - ведёт на страницу "О магазине", URL - "/about.html"
* Каталог - ведёт на страницу каталога, URL - "/catalog.html"
* Контакты - ведёт на страницу "Контакты", URL - "/contacts.html"

## Описание экранов

### Главная страница

Экран «Главная страница» доступен по умолчанию при открытии приложения.

![Frontpage](./assets/index-loading.png)

При загрузке любых данных с помощью сетевых запросов должен отображаться лоадер. У каждого "виджета" лоадер свой (т.е. у вас не должно быть одного лоадера на всё приложение).

После загрузки страница выглядит следующим образом:

![Frontpage](./assets/index-loaded.png)

Общая схема:

![Frontpage](./assets/index-loaded-comments.png)

Реализация:

1. Хиты продаж - GET http://localhost:7070/api/top-sales. В ответ приходит JSON, содержащий данные.

2. Категории каталога - GET http://localhost:7070/api/categories. В ответ приходит массив категорий без элемента "Все". Активный элемент выделен. При смене категории делается новый запрос, предыдущие загруженные данные удаляются.

3. Элементы каталога - GET http://localhost:7070/api/items (для варианта "Все"). При другой выбранной категории, происходит запрос вида GET http://localhost:7070/api/items?categoryId=X. Возвращается массив элементов, соответствующих запросу.

4. Загрузить ещё - при запросе элементов каталога загружаются следующие 6. При нажатии на "Загрузить ещё" загружаются ещё 6: GET http://localhost:7070/api/items?offset=6 (где `offset` определяет сколько элементов пропустить). Если сервер вернул пустой массив или меньше 6 элементов, то кнопка "Загрузить ещё" становится неактивной. На время загрузки над кнопкой так же показывается лоадер, сама кнопка отключается.

Рекламный баннер и текст на нём являются статичными.


### Каталог товаров

Экран «Каталог товаров» выглядит следующим образом:

![Catalog](./assets/catalog.png)

Фактически, он полностью повторяет функциональность каталога на главной странице, за одним исключением: у него есть поле поиска.

При заполнении этого поля отправляется запрос вида: GET http://localhost:7070/api/items?q=<текст в строке поиска>. При этом все правила относительно категории, кнопки "Загрузить ещё" сохраняются.

Если категория меняется, то данные перезагружаются с учётом строки поиска.

Строка поиска реагирует только на полный ввод (не live-поиск).

### Поиск

На всех страницах в шапке присутствует виджет поиска:

![Search](./assets/search-comments.png)

По умолчанию поисковое поле скрыто, отображается только иконка:

![Search](./assets/search-closed.png)

Эта иконка работает следующим образом: при первом клике открывает строку поиска, при втором - если был введён какой-то текст, то перенаправляет пользователя на страницу каталога (/catalog.html), при этом в поисковом поле отображён тот же текст, что был ввёден в строку поиска в шапке (и загрузка данных происходит исходя из этого):

![Search](./assets/search-catalog-comments.png)

Поиск на сервере работает по содержанию слова для названия (без учёта регистра, например можно найти "жар" в "Туфли Жар-птицы").

Если пользователь не ввёл никакой текст, то строка поиска просто схлопывается обратно (как сейчас реализовано в html).

### О магазине, Контакты

Это просто контентные страницы, в которые жёстко зашит контент. Никакой логики (кроме работы виджета поиска и ссылок) там нет.

### Страница товара

Страница товара выглядит следующим образом:

![Item](./assets/catalog-item.png)

Страница открывается при нажатии кнопок "Заказать" в карточках товаров. URL - /catalog/:id.html. Где id - это id товара.

Блок самого товара:

![Item](./assets/catalog-item-comments.png)

Ключевые моменты:
1. При загрузке показывается лоадер
2. Для загрузки полной информации о товаре делается запрос GET http://localhost:7070/api/items/:id, где id - это id товара
3. Слева выводится картинка (берется первая)
4. Сбоку выводится табличка с данными. Если каких-то в приходящем товаре нет, то поле оставляется пустым.
5. Размеры - выводятся все доступные размеры (у которых флаг `available` равен `true`). По умолчанию ни один размер не выбран. После выбора он становится выделенным, как на скриншоте. Кнопка "В корзину" активируется только тогда, когда есть размеры в наличии и выбран конкретный размер. Размер можно выбрать только один.
6. Количество - от 1 до 10.

Особые случаи: если ни одного размера не доступно, блок Количество и кнопка "В корзину" не отображаются.

После нажатия на кнопку "В корзину" пользователь перемещается в страницу корзины /cart.html.

### Страница корзины

В корзину можно попасть либо заказав что-то, либо кликнув на иконку корзины в шапке сайта.

Корзина выглядит следующим образом:

![Cart](./assets/cart-comments.png)

Блок корзина - отображает товары, находящиеся в корзине. 

Одной позицией считается пара - Товар + Размер. Т.е. если купить те же босоножки другого размера, то это будет две позиции в корзине. А если два раза купить босоножки того же размера - то изменится количество и общая стоимость (но запись останется в табличке одна).

Общая сумма расчитывается на базе суммирования всех позиций при отображении.

Соответственно, виджет корзинки отображает количество позиций в корзине:

![Cart](./assets/cart-widget.png)

Если в корзине товаров нет вообще, то розовый индикатор с числом отсутствует.

Блок оформления заказа позволяет оформить заказ - POST http://localhost:7070/api/order

В теле - JSON:
```json
{
  "owner": {
    "phone": "+7xxxxxxxxxxx",
    "address": "Moscow City",
  },
  "items": [
    {
      "id": 1,
      "price": 34000,
      "count": 1
    }
  ]
}
```

После успешного оформления заказа все данные корзины должны быть вычищены из state.
Пользователю показывается Loader и сообщение об успехе.

### 404

При вводе несуществующего url'а (не соответствующего ни одному из путей), пользователю показываться страница 404.html.
Ошибки также обрабатываются при просмотре деталей товара (т.е. сервер вернул вам ответ с кодом 404).
