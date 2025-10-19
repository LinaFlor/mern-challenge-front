import React from "react";
import { Table } from "react-bootstrap";

export default function FilesTable() {

    return (
    <Table striped bordered hover>
        <thead>
            <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </Table>
    )
};
