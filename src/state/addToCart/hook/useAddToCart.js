// import { useState } from 'react';
// import { useStateValue } from '../../index';
// import { addProductToCart, removeProductFromCart } from '../actions';
// import { totalCartItems } from '../queries';
 
// const useAddToCart = () => {
//   const [{ cartItems }, dispatch] = useStateValue();
//   const [isLoading, setIsLoading] = useState(false);

//   const request = async () => {
//     setIsLoading(true);

//     const response = await totalCartItems();
//     if (response) {
//       dispatch(addProductToCart(response));
//     } else {
//       const err = [];
//       dispatch(addProductToCart(err));
//     }
//     setIsLoading(false);
//   };
//   return [cartItems, cartItems, isLoading];
// };

// export default useAddToCart;
