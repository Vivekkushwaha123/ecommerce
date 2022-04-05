import React from 'react'
import { Grid } from '@material-ui/core'
import Product from './Product/Product'
import useStyles from './styles'

// const products = [
//     { id: 1, name: 'shoes', description: 'Running shoes.' , price: '$5' , image : 'https://m.media-amazon.com/images/I/41CRI4LeYML.jpg'},
//     { id: 2, name: 'macbook', description: 'Apple macbook.' , price: '$10' , image: 'https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1606585886/Croma%20Assets/Computers%20Peripherals/Laptop/Images/9009478926366.png/mxw_1440,f_auto'}
// ];

const Products = ({products , onAddToCart}) => {
    const classes = useStyles();
    console.log(products);
    return (
        <main className= {classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify='center' spacing={4}>
                {products.map((product) => (
                    <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Products
