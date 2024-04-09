import { useContext, useEffect, useReducer } from 'react';
import { createBasket, createBasketItem } from '../utils/storageHelpers';
import { Context } from '../context/Context';

const key = 'basket';

export const useBasketStorage = () => {
  const { basket, setBasket } = useContext(Context);

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    // console.log('LocalStorage', basket);

    localStorage.setItem(key, JSON.stringify(basket));
    forceUpdate();
  }, [basket]);

  const persistToStorage = (book) => {
    if (basket) {
      let newBasket = basket;

      const matchedIndex = basket.basketItems.findIndex(
        (basketItem) => basketItem._id === book._id
      );
      if (matchedIndex !== -1) {
        newBasket.basketItems[matchedIndex].quantity += 1;
      } else {
        newBasket = {
          //...newBasket, // shouldn't be basket here?
          ...basket,
          // basketItems: [...newBasket.basketItems, createBasketItem(book)], // shouldn't be basket here?
          basketItems: [...basket.basketItems, createBasketItem(book)],
        };
      }

      const totalPrice = basket.basketItems.reduce(
        (a, b) => a + b.price * b.quantity,
        0
      );
      setBasket({ ...newBasket, totalPrice });
    } else {
      setBasket(createBasket(book));
    }
  };

  const removeFromBasket = (id) => {
    if (basket) {
      let newBasket = basket;

      const updatedBasketItems = basket.basketItems.filter(
        (book) => book._id !== id
      );

      if (updatedBasketItems) {
        newBasket = {
          ...basket,
          basketItems: updatedBasketItems,
        };
      }
      const totalPrice = updatedBasketItems.reduce(
        (a, b) => a + b.price * b.quantity,
        0
      );
      setBasket({ ...newBasket, totalPrice });
    }
  };

  const decreaseQuantity = (id) => {
    if (basket) {
      let newBasket = basket;
      const matchedIndex = basket.basketItems.findIndex(
        (basketItem) => basketItem._id === id
      );
      if (matchedIndex !== -1) {
        newBasket.basketItems[matchedIndex].quantity -= 1;
      }

      const totalPrice = basket.basketItems.reduce(
        (a, b) => a + b.price * b.quantity,
        0
      );
      setBasket({ ...newBasket, totalPrice });
    }
  };

  const increaseQuantity = (id) => {
    if (basket) {
      let newBasket = basket;
      const matchedIndex = basket.basketItems.findIndex(
        (basketItem) => basketItem._id === id
      );
      if (matchedIndex !== -1) {
        newBasket.basketItems[matchedIndex].quantity += 1;
      }

      const totalPrice = basket.basketItems.reduce(
        (a, b) => a + b.price * b.quantity,
        0
      );
      setBasket({ ...newBasket, totalPrice });
    }
  };

  return {
    basket,
    persistToStorage,
    removeFromBasket,
    decreaseQuantity,
    increaseQuantity,
  };
};
