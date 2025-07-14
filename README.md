1. Старый код

У тебя в проекте используется старый вид поиска. Добавь хук useSearch с нужным параметром на страницы где есть поиск. И убери весь лишний код

```js
const handleSearch = (term, usersData = users) => {
  if (!term.trim()) {
    setFilteredUsers(usersData);
    setTotalPages(Math.ceil(usersData.length / itemsPerPage));
    return;
  }

  const filtered = usersData.filter(
    user =>
      user.name.toLowerCase().includes(term.toLowerCase()) ||
      user.username.toLowerCase().includes(term.toLowerCase()) ||
      user.email.toLowerCase().includes(term.toLowerCase()),
  );
  setFilteredUsers(filtered);
  setTotalPages(Math.ceil(filtered.length / itemsPerPage));
};
```

2. Пагинация ок, но не то чуть-чуть. Нам нужен именно постраничный вывод (1,2,3,5) и тд. Но с ограничением, чтобы 1000 страниц в ряд не шла. Тебе нужно убрать в Paginator вот это:

```jsx
<span className={styles.pageInfo}>
  Страница {currentPage} из {totalPages}
</span>
```

и добавить кнопки для каждой страницы как написано в задании:

`Кнопки с самими страницами, при этом активная страница должна быть понятна пользователю.`

3. Со страницы Users можно убрать пагинацию, она не нужна там же всего 10 пользаков

4. useSearchParams

Так не делаем, потому что в useSearchParams есть механизм для управления этими параметрами без костылей. Добавил в пагинатор, погляди

```js
const handlePageChange = newPage => {
  if (newPage < 1 || newPage > totalPages) return;

  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set('page', newPage);
  navigate(`?${newSearchParams.toString()}`, { replace: true });
};
```

5. Лишнее условие:

у тебя внутри Pagination есть уже такое условие, тут нужно его убрать в Posts

```jsx
{
  totalPages > 1 && (
    <Pagination currentPage={currentPage} totalPages={totalPages} />
  );
}
```

6. Чтобы добавить пагинацию на страницу слишком много кода надо писать. Надо это как-то унифицировать и вынести в отдельные модули.

Вот это 100% надо, чтобы руками такое не писать каждый раз:

```js
const getPaginatedUsers = () => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return filteredPosts.slice(startIndex, startIndex + itemsPerPage);
};
```

Либо по максимуму всё что связанно с пагинацией засунуть в сам компонент пагинации. А где надо просто его импортировать и пропсами передать все что требуется для пагинации.

7. Пункт 5 про данные пользователя в посте из задачи не выполнен
