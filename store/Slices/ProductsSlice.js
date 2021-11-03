import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
  products: [],
  currentProduct: [],
  total: 0,
}

export const counterSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: {
    searchProducts: (state, action) => {
      return { ...state, search: action.payload };
    },
    addToProducts: (state, action) => {
      let isThereItem = state.products.some(item => item.image === action.payload.image);
      if (!isThereItem) {
        return { ...state, products: state.products.concat(action.payload) };
      }
      return state;
    },
    removeFromProducts: (state, action) => {
      let removeItemFromProducts = state.products.filter(item => item.image !== action.payload.image && item.id !== action.payload.id);
      return { ...state, products: removeItemFromProducts };      
    },
    currentProduct: (state, action) => {
      return { ...state, currentProduct: action.payload };
    },
    currentProductNull: (state) => {
      return { ...state, currentProduct: [] };
    },
    getTotal: (state, action) => {
      return { ...state, total: action.payload }
    },
    increaseQuantity: (state, action) => {
      let items = [];
      JSON.parse(JSON.stringify(state)).products.map(el => {
        if (el.id === action.payload.id && el.image === action.payload.image && el.price === action.payload.price) {
          el.quantity = el.quantity + 1;
        }
        items.push(el);
      });
      return {...state, products: items};
    },
    decreaseQuantity: (state, action) => {
      let items = [];
      JSON.parse(JSON.stringify(state)).products.map(el => {
        if (el.id === action.payload.id && el.image === action.payload.image && el.price === action.payload.price) {
          el.quantity = el.quantity - 1;
        }
        items.push(el);
      });
      return {...state, products: items};
    },
  },
})

export const { searchProducts, addToProducts, removeFromProducts, currentProduct, currentProductNull, getTotal, increaseQuantity, decreaseQuantity } = counterSlice.actions;

export default counterSlice.reducer;