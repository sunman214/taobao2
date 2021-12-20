import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import NotFoundPage from '../utils/notFoundPage/NotFoundPage'
import Login from './auth/login'
import Register from './auth/register'
import Cart from './cart/Cart'
import DetailProduct from './DetailProduct/DetailProduct'
import Products from './product/products'
import Receipt from './receipt/receipt'
import { GlobalState } from '../../GlobalState'
import Categories from './category/Categories'
import History from './history/history'
import CreateProducts from './createProducts/createProducts'
import InPagePush from '../InPagePush/inPagePush'

const MainPages = () => {
    const state = useContext(GlobalState)
    const [isLogged, setIsLogged] = state.userAPI.isLogged
    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin

    return (
        <Switch>
            <Route path="/" exact component={Products}/>
            <Route path="/detail/:id" exact component={DetailProduct}/>
            <Route path="/login" exact component={isLogged ? NotFoundPage : Login}/>
            <Route path="/register" exact component={isLogged ? NotFoundPage : Register}/>
            <Route path="/category" exact component={isAdmin ? Categories : NotFoundPage}/>
            <Route path="/cart" exact component={Cart}/>
            <Route path="/receipt" exact component={Receipt}/>
            <Route path="/ipp" exact component={InPagePush}/>
            <Route path="/history" exact component={isAdmin ? History : NotFoundPage}/>
            <Route path="/creatProducts" exact component={isAdmin ? CreateProducts : NotFoundPage}/>
            <Route path="/editProducts/:id" exact component={isAdmin ? CreateProducts : NotFoundPage}/>


        

            <Route path="*" exact component={NotFoundPage}/>
        </Switch>
    )
}

export default MainPages
