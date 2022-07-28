import {gql} from '@apollo/client';

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

export {GET_PRODUCTS, GET_CATEGORIES};