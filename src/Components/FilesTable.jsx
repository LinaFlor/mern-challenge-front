import {useState, useEffect} from "react";
import { Table, Spinner} from "react-bootstrap";
import { getFilesData } from "../api/filesClient";

export default function FilesTable() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({hasError: false, message: ""});
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getFilesData();
                setFiles(data);
            } catch (err) {
                console.error(err);
                setError({hasError: true, message: err.message || "Error fetching files data"});
                setFiles([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const renderRows = () => {
      return files.map((file) =>
        file.lines?.map((line, index) => (
          <tr key={`${file.file}-${index}`}>
            <td>{file.file}</td>
            <td>{line.text}</td>
            <td>{line.number}</td>
            <td>{line.hex}</td>
          </tr>
        ))
      );
    };


    return (
      <div className="my-4 mx-5">
        {loading &&
         <div className="text-center my-5">
            <Spinner animation="border" role="status" />
         </div>
        }
        {!loading && error.hasError && (
          <div className="text-center my-5 text-danger">Error: {error.message}</div>
        )}
        {!loading && !error.hasError && (
          <>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Filter by file name"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <Table striped bordered hover align="middle">
              <thead className="table-light">
                <tr>
                  <th>File Name</th>
                  <th>Text</th>
                  <th>Number</th>
                  <th>Hex</th>
                </tr>
              </thead>
              <tbody>
                  {renderRows()}
              </tbody>
            </Table>
          </> 
        )}
        {!loading && files.length === 0 && !error.hasError && (
          <div className="text-center my-5">No files available.</div>
        )}
      </div>
    );
};
