import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Button, Container, Card, Row } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    // eslint-disable-next-line no-unused-expressions
    super(props),
      (this.state = {
        setBookName: "",
        setReview: "",
        fetchData: [],
        reviewUpdate: "",
      });
  }

  insertData = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({
      [nam]: val,
    });
  };

  updateData = (event) => {
    this.setState({
      reviewUpdate: event.target.value,
    });
  };

  componentDidMount() {
    axios.get("/api/get").then((response) => {
      this.setState({
        fetchData: response.data,
      });
    });
  }

  submit = () => {
    axios.post("/api/insert", this.state).then(() => {
      alert("success post");
    });
    console.log(this.state);
    document.location.reload();
  };

  delete = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Do you want to delete? ")) {
      axios.delete(`/api/delete/${id}`);
      document.location.reload();
    }
  };

  edit = (id) => {
    axios.put(`/api/update/${id}`, this.state);
    document.location.reload();
  };

  render() {
    let card = this.state.fetchData.map((val, key) => {
      return (
        <React.Fragment>
          <Card style={{ width: "18rem" }} className="m-2">
            <Card.Body>
              <Card.Title>{val.book_name}</Card.Title>
              <Card.Text>{val.book_review}</Card.Text>
              <input
                name="reviewUpdate"
                onChange={this.updateData}
                placeholder="Update Review"
              ></input>
              <Button
                className="m-2"
                onClick={() => {
                  this.edit(val.id);
                }}
              >
                Update
              </Button>
              <Button
                onClick={() => {
                  this.delete(val.id);
                }}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        </React.Fragment>
      );
    });

    return (
      <div className="App">
        <h1>Dockerized Fullstack React Application</h1>
        <div className="form">
          <input
            name="setBookName"
            placeholder="Enter Book Name"
            onChange={this.insertData}
          />
          <input
            name="setReview"
            placeholder="Enter Review"
            onChange={this.insertData}
          />
        </div>
        <Button className="my-2" variant="primary" onClick={this.submit}>
          Submit
        </Button>{" "}
        <br />
        <br />
        <Container>
          <Row>{card}</Row>
        </Container>
      </div>
    );
  }
}

export default App;
