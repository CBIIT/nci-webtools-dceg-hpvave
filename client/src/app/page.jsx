"use client";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import { Row, Col, Card, Button } from "react-bootstrap";
import {
  BsFillQuestionCircleFill,
  BsBook,
  BsLightningFill,
} from "react-icons/bs"; // Importing icons

export default function Home() {
  return (
    <>
      <div className="bg-primary-dark">
        <div className="cover-image">
          <Container>
            <Row className="py-5">
              <Col className="d-flex align-items-center justify-content-center">
                <div className="text-center">
                  <h1 className="font-title text-light mb-3">HPV Visuals</h1>
                  <hr className="border-white" />
                  <p className="lead text-light">
                    (H2) HPV-Automated Visual Evaluation (PAVE) Protocol:
                    Validating a Novel Cervical Screening Strategy
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <div className="bg-light my-5">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={4} className="mb-5 mb-md-0 d-flex">
              <Card className="w-100 d-flex flex-column h-100">
                <div className="card-middle-top-circle">
                  <BsFillQuestionCircleFill size={30} color="#fff" />
                </div>
                <Card.Body className="text-center flex-grow-1 d-flex flex-column justify-content-between">
                  <div className="mb-2">
                    <h2 className="h4">
                      Browse cervical Images and Quiz Yourself
                    </h2>
                  </div>
                  <Button
                    href="#"
                    variant="primary"
                    className="w-75 mx-auto mt-2"
                  >
                    Explore
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4} className="mb-5 mb-md-0 d-flex">
              <Card className="w-100 d-flex flex-column h-100">
                <div className="card-middle-top-circle">
                  <BsBook size={30} color="#fff" />
                </div>
                <Card.Body className="text-center flex-grow-1 d-flex flex-column justify-content-between">
                  <div className="mb-2">
                    <h2 className="h4">Learn about the PAVE Protocol</h2>
                  </div>
                  <Button
                    href="#"
                    variant="primary"
                    className="w-75 mx-auto mt-2"
                  >
                    Explore
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4} className="mb-5 mb-md-0 d-flex">
              <Card className="w-100 d-flex flex-column h-100">
                <div className="card-middle-top-circle">
                  <BsLightningFill size={30} color="#fff" />
                </div>
                <Card.Body className="text-center flex-grow-1 d-flex flex-column justify-content-between">
                  <div className="mb-2">
                    <h2 className="h4">Lessons Learned</h2>
                  </div>
                  <Button
                    href="#"
                    variant="primary"
                    className="w-75 mx-auto mt-2"
                  >
                    Explore
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <div>
                This website describes PAVE,
                <a
                  href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10491363/"
                  target="_blank"
                >
                  {" "}
                  Human Papillomavirus Automated Visual Evaluation, (PAVE) a
                  protocol to evaluate a novel cervical screening and triage
                  protocol
                </a>{" "}
                for resource-limited settings, including areas with high HIV
                prevalence. PAVE is part of a global strategy to reduce cervical
                cancer burden and part of the NCI Cancer Moonshot.
              </div>
              <div>
                This website was developed for researchers, public health
                workers, clinicians, and others who are interested in learning
                about novel strategies for cervical cancer screening in settings
                with limited resources. This site describes the science
                underlying the PAVE strategy, descriptions of participating
                partners, and an annotated bibliography. For clinicians, there
                is also an image library to test your visual diagnostic skills.
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
