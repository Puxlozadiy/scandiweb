import { Fragment, useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client';
import Header from './components/Header/Header';
import ProductList from './pages/ProductList/ProductList';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage';

const App = () => {
  const GET_PRODUCTS = gql`
  {
    category{
      products{
        id
        name
        gallery
        category
        brand
        description
        prices{
          currency{
            label
            symbol
          }
          amount
        }
        attributes{
          id
          name
          type
          items{
            displayValue
            value
            id
          }
        }
      }
    }
  }
  `;
  const GET_CATEGORIES = gql`
  {
    categories{
     name
   }
 }
 `;

  const DisplayProducts = () => {
    const { loading, error, data } = useQuery(GET_PRODUCTS);

    if (loading) {
        console.log('loading')
        return
    };
    if (error){
        console.log(error)
        return
    };
    
    return data
  }
  const DisplayCategories = () => {
    const { loading, error, data } = useQuery(GET_CATEGORIES);

    if (loading) {
        console.log('loading')
        return
    };
    if (error){
        console.log(error)
        return
    };
    
    return data
  }

  if(localStorage.getItem('current-currency') === null){
    localStorage.setItem('current-currency', '$ USD')
  }

  const responseProducts = DisplayProducts()
  const responseCategories = DisplayCategories()
  const [products, setProducts] = useState(responseProducts)
  const [categories, setCategories] = useState(responseCategories)
  useEffect(() => {
    setProducts(responseProducts)
  }, [responseProducts])
  useEffect(() => {
    setCategories(responseCategories)
  }, [responseCategories])
  return (
    <Fragment>
      <Header categories={categories}></Header>
      <Route path="/" exact>
        <Redirect to={categories !== undefined ? categories.categories[0].name : ""}/>
      </Route>
      <Route path="/cart" exact>
        <CartPage products={products}></CartPage>
      </Route>
      {categories !== undefined ? categories.categories.map(value => <Route path={`/${value.name}`} key={value.name}><ProductList category={value.name} products={products}></ProductList></Route>) : ""}
      {products !== undefined && products.category.products.map((value, index) => <Route path={`/${value.id}`} key={value.id}><ProductPage product={value}></ProductPage></Route>)}
    </Fragment>
  );
}

export default App;
