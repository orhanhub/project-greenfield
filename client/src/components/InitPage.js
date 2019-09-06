import React from 'react';
import BasicList from './BasicList.js';
import StyleImages from './overview/StyleImages.js';
import ProductInfo from './overview/ProductInfo.js';
import css from './overview/Overview.css';
import CssBaseLine from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const InitPage = ({store, getInitMain, getStyles, setCurrent}) => {

  return (
    <React.Fragment>
      <CssBaseLine />
      <BasicList 
        store={store}
        getInitMain={getInitMain}
        getStyles={getStyles}
      />
      <Container>
        <StyleImages
          store={store.mainItem}
          setCurrent={setCurrent}
        />
      </Container>
      <ProductInfo
        store={store.mainItem}
      />
    </React.Fragment>
  )
}

export default InitPage;