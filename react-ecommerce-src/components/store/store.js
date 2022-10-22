import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
 
const initialCartState = { cartlist : [], totalQuantity : 0, totalAmount : 0 };
const initialAuthState = { isAuthenticated : false, isGoogleLogin : false } ;
const initialUserState = { userId : 0, role : null, username : null, password : null, address : null } ;
const initialProductState = { productlist : [] };

const cartSlice = createSlice({
    name : 'cart',
    initialState : initialCartState,
    reducers : {
        loadcartitems(state, action) {
            state.cartlist = action.payload ;
            state.totalAmount = 0;
            state.totalQuantity = 0;
            for( let i=0; i<state.cartlist.length; i++ ) {
                state.totalQuantity = state.totalQuantity+state.cartlist[i].quantity;
                state.totalAmount = state.totalAmount+(state.cartlist[i].quantity*state.cartlist[i].price);
            }
        },

        additemtocart( state, action ) {
            const existingItem = state.cartlist.find( (item) => item.productId === action.payload.productId );
            if( !existingItem ) {
                state.cartlist.push({
                    id : action.payload.id,
                    userId : action.payload.userId,
                    productId : action.payload.productId,
                    quantity : action.payload.quantity,
                    price : action.payload.price
                });
            }
            else {
                existingItem.quantity++;
            }
            state.totalQuantity = state.totalQuantity+1 ;
            state.totalAmount = state.totalAmount+action.payload.price;        
        },
        removeitemfromcart( state, action ) {
            const id = action.payload.productId;
            const existingItem = state.cartlist.find(item => item.productId === id ) ;
            if( action.payload.status === 0 || existingItem.quantity === 1 ) {
                state.cartlist = state.cartlist.filter( item => item.productId !== id );
            }
            else {
                existingItem.quantity-- ;
            }
            
            if(action.payload.status === 0) {
                state.totalQuantity = state.totalQuantity-existingItem.quantity;
                state.totalAmount = state.totalAmount-(existingItem.quantity*existingItem.price);
            }
            else {
                state.totalQuantity = state.totalQuantity-1 ;
                state.totalAmount = state.totalAmount-existingItem.price;
            }
        },
        emptyCartList( state, action ){
            state.cartlist = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        }

    }
}) ;
 
const authSlice = createSlice({
    name : 'auth',
    initialState : initialAuthState,
    reducers : {
        login(state, action) {
            state.isAuthenticated = true;
            state.isGoogleLogin = action.payload;
        },
        logout(state, action) {
            state.isAuthenticated = false;
            state.isGoogleLogin = action.payload;
        }
    }
});
 
const userSlice = createSlice({
    name : 'user',
    initialState : initialUserState,
    reducers : {
        setuserdetails( state, action ) {
            state.userId = action.payload.userid;
            state.role = action.payload.role;      
            state.username = action.payload.username;  
            state.password = action.payload.password;
            state.address = action.payload.address;
        },
        setAddress( state, action){
            state.address = action.payload;
        }
    }
});

const productSlice = createSlice({
    name : 'product',
    initialState : initialProductState,
    reducers : {
        setProductlist( state, action ) {
            state.productlist = action.payload ;
            console.log(action.payload);
        }
    }
});
 
const store = configureStore({
    reducer : { cart: cartSlice.reducer , auth: authSlice.reducer, user: userSlice.reducer, product: productSlice.reducer }
}) ;
 
export const cartActions = cartSlice.actions;
export const authActions = authSlice.actions;
export const userActions = userSlice.actions;
export const productActions = productSlice.actions;
 
export default store;