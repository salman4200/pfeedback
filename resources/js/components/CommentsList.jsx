import React, { useEffect, useState } from "react";
import Header from "./Header";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

function CommentsList() {
    const [comments, setComments] = useState([]);

    const fetchData = async () => {
        try {
            const api = await fetch(`/user/comments`);
            const data = await api.json();
            setComments(data);
        } catch (error) {
            console.error("Error fetching comments: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Header />
            <div className="d-flex justify-content-center my-5">
                <div className="col-md-10 col-sm-12 px-5">
                    <h2>Comments List</h2>
                    <Table striped bordered hover className="my-3">
                        <thead>
                            <tr>
                                <th>Comment Text</th>
                                <th>User</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments.map((comment) => (
                                <tr key={comment.id}>
                                    <td>{comment.text}</td>
                                    <td>{comment.user.name}</td>
                                    <td>
                                        <Button size="sm" variant="primary">
                                            View
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default CommentsList;
s