export const columns = [
    {header: { title: "Title" }, width: 1, accessor: "title", ordering: {
        ascending: (one, two) => one.title === two.title ? 0 : one.title > two.title ? -1 : 1,
        descending: (one, two) => one.title === two.title ? 0 : one.title > two.title ? 1 : -1
    }},
    { header: { title: "Year" }, width: 1, accessor: "year", ordering: {
        ascending: (one, two) => one.year - two.year,
        descending: (one, two) => two.year - one.year
    }},
    { header: { title: "Director" }, width: 1, accessor: "director" },
    { header: { title: "Cast" }, width: 2, accessor: "cast" },
    { header: { title: "Genre" }, width: 1, accessor: "genre" },
    { header: { title: "Notes" }, width: 1, accessor: "notes" },
];