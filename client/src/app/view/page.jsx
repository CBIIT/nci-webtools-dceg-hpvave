"use client";
import { useRecoilState } from "recoil";
import { Container, Row, Col, Card, Pagination, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Document } from "flexsearch";

import { exploreState, modalState } from "./view.state";
import ImageModal from "../../components/modal";

export default function Explore() {
  const [_openSidebar, _setOpenSidebar] = useState(true);
  const [page, setPage] = useState(1);
  const [explore, setExplore] = useRecoilState(exploreState);
  const [modal, setModal] = useRecoilState(modalState);
  const [numCards, setNumCards] = useState(12); //Number of cards per page
  const [data, setData] = useState([]);
  const [filterOption, setFilterOption] = useState("All"); // Initially set to "All"

  // Create a function to handle filter change
  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  // Function to calculate the number of pages based on filtered data
  function getFilteredPages() {
    const filteredData = data.filter(
      (item) =>
        filterOption === "All" || item.detailedGroundTruth === filterOption
    );
    const totalPages = Math.ceil(filteredData.length / numCards);
    return totalPages;
  }

  // Adjust pagination based on filter
  useEffect(() => {
    setPage(1); // Reset page to 1 when filter changes
  }, [filterOption]);

  const document = new Document({
    document: {
      index: [
        "imageId",
        "detailedGroundTruth",
        "ageEnroll",
        "cervResult",
        "colImpression",
        "hpvResult",
        "qcColpoBiopsy",
        "qcCyto",
      ],
      store: true,
    },
  });

  useEffect(() => {
    fetch("/images/hpv-data.json")
      .then((res) => res.json())
      .then((r) => {
        setData(r);
        r.forEach((item) => {
          document.add({
            _id: item._id,
            _image: item._image,
            ageEnroll: item.ageEnroll,
            cervResult: item.cervResult,
            colImpression: item.colImpression,
            dob: item.dob,
            detailedGroundTruth: item.detailedGroundTruth,
            hpvResult: item.hpvResult,
            qcColpoBiopsy: item.qcColpoBiopsy,
            qcCyto: item.qcCyto,
          });
        });
      });
  }, []);

  function getPages() {
    const paginationItems = [];

    for (var i = 1; i <= Math.ceil(data.length / numCards); i++) {
      paginationItems.push(i);
    }
    return paginationItems;
  }

  function showModal(e) {
    const item = e;

    const body = {
      _id: item._id,
      _image: item._image,
      ageEnroll: item.ageEnroll,
      cervResult: item.cervResult,
      colImpression: item.colImpression,
      detailedGroundTruth: item.detailedGroundTruth,
      hpvResult: item.hpvResult,
      qcColpoBiopsy: item.qcColpoBiopsy,
      qcCyto: item.qcCyto,
    };

    setModal((state) => ({ ...state, body: body, open: true }));
  }

  function handleSearch(e) {
    e.preventDefault();

    console.log(document.search(e.target.value, { enrich: true }));
  }

  return (
    <>
      <ImageModal />
      <Container className="py-3">
        <Row>
          <Col>
            <article className="shadow px-3 py-2 rounded">
              <Row>
                <Col className="mb-3" lg={8} xl={8}>
                  {" "}
                  <h1 className="text-primary mb-3">View Images</h1>
                </Col>
                <Col>
                  {/* Dropdown menu */}
                  <Form.Group className="mb-3" controlId="filterOption">
                    <Form.Label>Filter by Detailed Ground Truth</Form.Label>
                    <Form.Select
                      value={filterOption}
                      onChange={handleFilterChange}
                    >
                      <option value="All">All</option>
                      {/* Unique detailedGroundTruth values */}
                      {[
                        ...new Set(
                          data.map((item) => item.detailedGroundTruth)
                        ),
                      ].map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              {/*<Form.Group className="mb-3" controlId="ageEnroll">
                <Form.Label >Search</Form.Label>
                <Form.Control
                  name="ageEnroll"
                  onChange={handleSearch}
                />
              </Form.Group>*/}{" "}
              <div className="pb-0">
                The images below include information on HPV, cytology, and
                histology diagnoses. They allow you to test the accuracy of your
                visual diagnosis. Try to determine the diagnosis before clicking
                on the image to see the results.{" "}
              </div>
              <div>
                Some of these images show classic examples of normal, low-grade,
                high-grade, and cancer. Because the visual appearance of these
                conditions varies considerably, the biopsy diagnoses for some of
                the images may surprise you.
              </div>
              <hr />
              {/* <Row>
                {data.map((e) => {
                  return (
                    e._id < numCards * page &&
                    e._id >= numCards * (page - 1) && (
                      <Col className="mb-3" lg={6} xl={4}>
                        <Card
                          className="shadow"
                          onClick={() => showModal(e)}
                          style={{ cursor: "pointer" }}
                        >
                          <Card.Img
                            height="368px"
                            variant="top"
                            src={e._image}
                            alt={`Image ${e._id + 1}`}
                          />
                          <Card.Body>
                            <Card.Text className="d-flex justify-content-center">
                              {"Image " + (e._id + 1)}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    )
                  );
                })}
              </Row> */}
              <Row>
                {data
                  .filter(
                    (item) =>
                      filterOption === "All" ||
                      item.detailedGroundTruth === filterOption
                  )
                  .map((e) => {
                    return (
                      e._id < numCards * page &&
                      e._id >= numCards * (page - 1) && (
                        <Col className="mb-3" lg={6} xl={4}>
                          <Card
                            className="shadow"
                            onClick={() => showModal(e)}
                            style={{ cursor: "pointer" }}
                          >
                            <Card.Img
                              height="368px"
                              variant="top"
                              src={e._image}
                              alt={`Image ${e._id + 1}`}
                            />
                            <Card.Body>
                              <Card.Text className="d-flex justify-content-center">
                                {"Image " + (e._id + 1)}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      )
                    );
                  })}
              </Row>
              {/* <Pagination className="d-flex justify-content-end">
                {page > 1 && (
                  <Pagination.Prev onClick={() => setPage(page - 1)} />
                )}
                {getPages().map((pageNumber) => (
                  <Pagination.Item
                    key={pageNumber}
                    active={pageNumber === page}
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </Pagination.Item>
                ))}
                {page < getPages().length && (
                  <Pagination.Next onClick={() => setPage(page + 1)} />
                )}
              </Pagination> */}
              <Pagination className="d-flex justify-content-end">
                {page > 1 && (
                  <Pagination.Prev onClick={() => setPage(page - 1)} />
                )}
                {Array.from({ length: getFilteredPages() }).map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === page}
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                {page < getFilteredPages() && (
                  <Pagination.Next onClick={() => setPage(page + 1)} />
                )}
              </Pagination>
            </article>
          </Col>
        </Row>
      </Container>
    </>
  );
}
