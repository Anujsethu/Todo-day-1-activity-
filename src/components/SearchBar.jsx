export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="🔍 Search todos by title..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
