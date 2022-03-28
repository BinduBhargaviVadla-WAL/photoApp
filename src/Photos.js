import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner,
  Container,
  Row,
  Col,
} from "reactstrap";
import Photo from "./Photo";

export default function Photos() {
  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(0);
  const [nextPage, setNextPage] = useState(2);
  const [album, setAlbum] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAlbum();
  }, []);
  const getAlbum = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/${currentPage}/photos`)
      .then((res) => {
        setAlbum(res.data);
        setLoading(false);
      });
  };
  const getFirstpage = () => {
    setCurrentPage(1);
    setPreviousPage(0);
    setNextPage(2);
    setLoading(true);
    getAlbum();
  };
  const getPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPreviousPage(currentPage - 1);
      setNextPage(currentPage + 1);
      setLoading(true);
    }
    getAlbum();
  };
  const getNextPage = () => {
    if (currentPage < 100) {
      setCurrentPage(currentPage + 1);
      setPreviousPage(currentPage + 1);
      setNextPage(currentPage - 1);
      setLoading(true);
    }
    getAlbum();
  };
  const getLastPage = () => {
    setCurrentPage(100);
    setPreviousPage(99);
    setNextPage(101);
    getAlbum();
  };

  return (
    <div>
      <div className='nav'>
        <h1>Photo App</h1>
        {loading}
      </div>
      {loading ? (
        <div className='d-flex justify-content-center'>
          <Spinner color='primary' type='grow'>
            Loading...
          </Spinner>
          <Spinner color='secondary' type='grow'>
            Loading...
          </Spinner>
          <Spinner color='success' type='grow'>
            Loading...
          </Spinner>
          <Spinner color='danger' type='grow'>
            Loading...
          </Spinner>
          <Spinner color='warning' type='grow'>
            Loading...
          </Spinner>
          <Spinner color='info' type='grow'>
            Loading...
          </Spinner>
          <Spinner color='light' type='grow'>
            Loading...
          </Spinner>
          <Spinner color='dark' type='grow'>
            Loading...
          </Spinner>
        </div>
      ) : (
        <Container className='card-container'>
          <Row>
            {album.map((val) => (
              <Photo photoDetails={val} />
            ))}
          </Row>
        </Container>
      )}
      <Row className='mt-5'>
        <Col className='lg-12 '>
          <Pagination className='container'>
            <PaginationItem>
              <PaginationLink
                first
                className='first'
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  getFirstpage();
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                previous
                className='prev'
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  getPrevPage();
                }}
              />
            </PaginationItem>
            <PaginationItem className='displayPageItem'>
              <PaginationLink
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  getAlbum();
                }}
              >
                <div className='d-flex justify-content-end'>
                  <div className='text-dark '>Page : {currentPage}</div>
                </div>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                next
                className='next'
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  getNextPage();
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                last
                className='last'
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  getLastPage();
                }}
              />
            </PaginationItem>
          </Pagination>
        </Col>
      </Row>
    </div>
  );
}
