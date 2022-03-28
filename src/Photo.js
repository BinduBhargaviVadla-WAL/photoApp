import {
  Col,
  CardBody,
  CardGroup,
  Card,
  CardTitle,
  CardImg,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import React, { useState } from "react";

function Photo({ photoDetails }) {
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const toggle = (url, title) => {
    setModal(!modal);
    setImage(url);
    setTitle(title);
  };
  return (
    <Col xl='2' md='3' sm='4' xs='6'>
      <CardGroup>
        <Card className='card-size '>
          <CardImg
            alt='Card image cap'
            src={photoDetails.thumbnailUrl}
            top
            width='100%'
            onClick={() => toggle(photoDetails.url, photoDetails.title)}
          />
          <CardBody>
            <CardTitle className='card-title'>{photoDetails.title}</CardTitle>
          </CardBody>
        </Card>
        <Modal
          isOpen={modal}
          toggle={toggle}
          className='modal-container'
          fullscreen
        >
          <ModalHeader
            className='d-flex flex-column justify-content-center'
            toggle={toggle}
          >
            {title}
          </ModalHeader>
          <ModalBody className='d-flex flex-column justify-content-center align-items-center'>
            <img src={image} alt={photoDetails.id} />
          </ModalBody>
        </Modal>
      </CardGroup>
    </Col>
  );
}
export default Photo;
