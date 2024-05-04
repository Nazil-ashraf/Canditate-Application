import { useEffect, useState } from 'react';
import './App.scss';
import Card from './component/Card';
import Filter from './component/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiJSON } from './redux/slice/fetchingAPISlice';
import Loading from './atoms/loading';

const App = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(12);

  // access state from redux
  const { data, loading } = useSelector(state => state.JsonData);
  useEffect(() => {
    // fetch  Api
    dispatch(fetchApiJSON(page));
  }, [dispatch, page]);

  //infinite scrolling
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 50
    ) {
      setPage(prevPage => prevPage + 12);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='page-container'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Filter />
          <Card Apidata={data?.jdList} />
        </>
      )}
    </div>
  );
};

export default App;
