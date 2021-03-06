import React from 'react';
import Intro from '../components/Intro/Intro';
import PrivateInfo from '../components/PrivateInfo/PrivateInfo';
import { Container } from 'reactstrap';

const Page404 = () => {

  return (
    <React.Fragment>
      <Intro introType={'local'} label='404 страница отсутствует'/>
      <Container>
        {/* <PrivateInfo/> */}
      </Container>
    </React.Fragment>
  )
}

export default Page404;