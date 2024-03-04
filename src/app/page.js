import Link from 'next/link';
import useState from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 10}&limit=10`);
      const data = await response.json();
      setData(data.results);
      setLoading(false);
      console.log(data.results);
    };
    fetchData();
  }, [page]);

  return (
    <div>
      <h1>Pokemon List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((pokemon, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{pokemon.name}</td>
                <td>
                  <Link href={`/pokemon/${index + 1}`}>
                    <a>Details</a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)} disabled={loading}>
          Next
        </button>
      </div>
    </div>
  );
}
