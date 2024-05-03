interface IProps {
  searchText:string;
  onHandleSearch: (e: any)=>void
}

export default function FavoritePage({searchText, onHandleSearch}: IProps) {

  return (
    <input
    type="text"
    value={searchText}
    onChange={onHandleSearch}
    placeholder="Search by movie title"
    className="mt-4 p-2 rounded border"
  />
  );
}