import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';
// @mui
import { Box, Typography } from '@mui/material';

// ----------------------------------------------------------------------
import { alpha, styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const PageTitleStyle = styled(Typography)(({ theme }) => ({
  textShadow: "5px 6px 8px rgba(0,0,0,0.27)",
}));

export const PageTitle = ({ children }) => (
  <>
    <PageTitleStyle variant="h4" gutterBottom>
      {children}
    </PageTitleStyle>
  </>
);
const Page = forwardRef(({ children, title = '', meta, ...other }, ref) => (
  <>
    <Helmet>
      <title>{`${title} | KNLT`}</title>
      {meta}
    </Helmet>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node,
};

export default Page;
