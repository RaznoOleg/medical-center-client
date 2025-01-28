import { Grid } from '@mui/material';
import { DNA } from 'react-loader-spinner';

function Loader() {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: 'auto' }}
      >
        <DNA
          visible={true}
          height="120"
          width="120"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </Grid>
    </>
  );
}

export default Loader;
