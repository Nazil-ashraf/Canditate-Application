import { useState } from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Bolt from '../../assets/icons/bolt.png';
import CardDiolog from './cardDiolog';
import { useEffect } from 'react';
import Tick from '../../assets/icons/tick.png';

// Styled button component
const ColorButton = styled(Button)({
  color: 'rgb(0, 0, 0)',
  width: '100%',
  boxShadow: 'none',
  textTransform: 'capitalize',
  fontFamily: 'lexend-Regular',
  marginTop: '20px',
  padding: '10px',
  backgroundColor: 'rgb(85, 239, 196)',
  '&:hover': {
    backgroundColor: 'rgb(85, 239, 196)',
  },
});

// Main Card component
const Card = ({ Apidata }) => {
  const [openDialog, setOpenDiolog] = useState({ isOpen: false, data: '' });

  // Function to close dialog
  const handleCloseDiolog = () => {
    setOpenDiolog({ ...openDialog, isOpen: false });
  };

  // Function to open dialog
  const handleOpenDiolog = (data) => {
    setOpenDiolog({ ...openDialog, isOpen: true, data: data });
  };

  // Function to handle applying for job
  const handleApplyButton = (Link) => {
    window.open(Link, '_blank');
  };

  return (
    <div className='page-container--flex'>
      {Apidata?.length === 0 ? (
        <h1>No Jobs available for this category at the moment</h1>
      ) : (
        <>
          {Apidata?.map((data) => (
            <div className='card' key={data?.jdUid}>
              <div className='card--flex'>
                <img src={data.logoUrl} height={'50px'} width={'40px'} alt='company logo' />
                <div>
                  <h2>{data?.companyName}</h2>
                  <h3>{data?.jobRole}</h3>
                  <p className='card--sub-text'>{data?.location}</p>
                </div>
              </div>
              <p className='card--salary'>
                Estimated Salary :{' '}
                {data?.salaryCurrencyCode === 'USD' && '$'}
                {data?.minJdSalary ? data?.minJdSalary + ' -' : ''} {data?.maxJdSalary} LPA{' '}
                <img src={Tick} height={'20px'} className='card--icon' alt='tick' />
              </p>
              <p className='card--sub-heading'>About Company :</p>
              <p className='card--discription'>{data?.jobDetailsFromCompany}</p>
              <p className='card--view-job' onClick={() => handleOpenDiolog(data)}>
                View Job
              </p>
              {data?.minExp && (
                <>
                  <p className='card--experience-heading'>Minimum Experience</p>
                  <p className='card--salary'>{data?.minExp} Years</p>
                </>
              )}
              <ColorButton
                variant='contained'
                onClick={() => handleApplyButton(data?.jdLink)}
                startIcon={<img src={Bolt} height={'15'} width={'15'} alt='bolt icon' />}
              >
                Easy Apply
              </ColorButton>
            </div>
          ))}
          <CardDiolog handleClose={handleCloseDiolog} open={openDialog?.isOpen} data={openDialog?.data} />
        </>
      )}
    </div>
  );
};

export default Card;
