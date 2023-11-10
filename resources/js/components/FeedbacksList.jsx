import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header";
import Pagination from "react-js-pagination";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Feedback from "./Feedback";

function FeedbacksList() {
    const [showFeedback, setShowFeedback] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [list, setList] = useState({
        feedbacks: {
            data: [],
        },
    });

    const fetchData = async (pageNumber = 1) => {
        const api = await fetch(`/user/feedbacks?page=${pageNumber}`);
        setList({
            feedbacks: await api.json(),
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const viewFeedback = (feedback) => {
        setSelectedFeedback(feedback);
        setShowFeedback(true);
    };

    const handleCloseFeedback = () => {
        setSelectedFeedback(null);
        setShowFeedback(false);
    };

    return (
        <>
            <Header />
            <div className="d-flex justify-content-center my-5">
                <div className="col-md-10 col-sm-12 px-5">
                    <h2>Feedbacks List</h2>
                    <Table striped bordered hover className="my-5">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Votes</th>
                                <th>User</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list?.feedbacks?.data ? (
                                list?.feedbacks?.data?.map((feedback) => (
                                    <tr key={feedback?.id}>
                                        <td>{feedback?.title}</td>
                                        <td>
                                            <Badge bg="primary">
                                                {feedback?.category}
                                            </Badge>
                                        </td>
                                        <td>
                                            {feedback?.votes_count}
                                        </td>
                                        <td>{feedback?.user.name}</td>
                                        <td>
                                            <Button size="md"  variant="secondary" onClick={() => {viewFeedback(feedback)}}>
                                                View
                                            </Button>
                                            
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">Loading...</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-center my-4">
  <nav aria-label="Page navigation">
    <ul className="pagination">
      <li className={`page-item ${list?.feedbacks?.current_page === 1 && 'disabled'}`}>
        <button className="page-link" onClick={() => fetchData(1)}>First</button>
      </li>
      {Array.from({ length: list?.feedbacks?.total_pages }, (_, index) => (
        <li key={index} className={`page-item ${list?.feedbacks?.current_page === index + 1 && 'active'}`}>
          <button className="page-link" onClick={() => fetchData(index + 1)}>{index + 1}</button>
        </li>
      ))}
      <li className={`page-item ${list?.feedbacks?.current_page === list?.feedbacks?.total_pages && 'disabled'}`}>
        <button className="page-link" onClick={() => fetchData(list?.feedbacks?.total_pages)}>Last</button>
      </li>
    </ul>
  </nav>
</div>

                    {showFeedback && (
                        <Feedback
                            feedback={selectedFeedback}
                            onClose={handleCloseFeedback}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default FeedbacksList;

if (document.getElementById("user-panel")) {
    const Index = ReactDOM.createRoot(document.getElementById("user-panel"));
    Index.render(
        <React.StrictMode>
            <FeedbacksList />
        </React.StrictMode>
    );
}
