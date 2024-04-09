import { useContext, /* useEffect, */ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/Context';
import AddressForm from '../../components/AddressForm';
import './_Checkout.scss';

export default function Checkout() {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const { user, /* setUser, */ setOrderReceived, basket, setBasket } =
    useContext(Context);

  const navigate = useNavigate();

  const handleBuy = async () => {
    try {
      const date = new Date();
      const minutes =
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      const oderDate =
        date.getDate() +
        '.' +
        (date.getMonth() + 1) +
        '.' +
        date.getFullYear() +
        ' - ' +
        date.getHours() +
        ':' +
        minutes; // how to get '00' and not '0' just one zero ??

      let numOfBooksOrdered = [];
      let booksIDs = [];

      basket.basketItems.map((item) => {
        numOfBooksOrdered.push(item.quantity);
        booksIDs.push(item._id);
      });

      let order = {
        date: oderDate,
        books: booksIDs,
        quantity: numOfBooksOrdered,
        totalPrice: basket.totalPrice.toFixed(2),
        userId: user._id,
      };

      const token = sessionStorage.getItem('token');
      if (token) {
        const response = await fetch(`${import.meta.env.VITE_PLACE_ORDER}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', token: token },
          body: JSON.stringify({ order: order }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setOrderReceived(data.message);
            setBasket(null);
            localStorage.removeItem('basket');
            navigate('/thankyou');
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // this causes fetch-loop !!

  /*  useEffect(() => {
    fetch(`http://localhost:8000/api/user/${user._id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setUser(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [user]); */

  return (
    <div className='checkout-page'>
      {!user.address && (
        <div className='checkout-container'>
          <AddressForm
            showAddressForm={showAddressForm}
            setShowAddressForm={setShowAddressForm}
          />
          <h3>Total Price: {basket?.totalPrice?.toFixed(2)}€</h3>
        </div>
      )}
      {user.address && (
        <div className='checkout-container'>
          <h3>Shiping Address</h3>
          <div className='checkout-address'>
            <p>{user.address.street}</p>
            <p>{user.address.zip}</p>
            <p>{user.address.city}</p>
            <p>{user.address.country}</p>
          </div>

          <div className='edit-address-container'>
            {!showAddressForm && (
              <button onClick={() => setShowAddressForm(!showAddressForm)}>
                Edit your address
              </button>
            )}

            {showAddressForm && (
              <AddressForm setShowAddressForm={setShowAddressForm} />
            )}
          </div>
          <h3>Total Price: {basket?.totalPrice.toFixed(2)}€</h3>

          <button className='buy-btn' onClick={handleBuy}>
            Buy
          </button>
        </div>
      )}
    </div>
  );
}
