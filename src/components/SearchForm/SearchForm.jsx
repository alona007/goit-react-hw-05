import css from "./SearchForm.module.css";

export default function SearchForm({ setQuery, onFilter }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(e.target.search.value);
    onFilter(e.target.search.value);
    e.target.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input className={css.input} type="text" name="search" />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
}
