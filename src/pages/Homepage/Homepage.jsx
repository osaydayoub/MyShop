import CustomerPage from '../CustomerPage/CustomerPage';
import DeliveryPage from '../DeliveryPage/DeliveryPage';
import StorePage from '../StorePage/StorePage';
import Header from '../../components/Header/Header';
import { useData } from '../../context/DataContext';
const [Customer, Store, Delivery] = ['Customer', 'Store', 'Delivery'];

function Homepage() {
  const { currentUserType } = useData()
  return (
    <>
      <Header />
      {currentUserType &&
        <div className='page'>

          {!currentUserType && <h1>wating for data</h1>}
          {/* <h1>Homepage</h1> */}
          {currentUserType === Customer && <CustomerPage />}
          {currentUserType === Store && <StorePage />}
          {currentUserType === Delivery && <DeliveryPage />}

        </div>}
    </>
  )
}

export default Homepage