import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import useStyles from './styles';
import Cartitem from './CartItem/Cartitem';
import { Link } from 'react-router-dom';

const Cart = ({ cart , onUpdateCartQty, onRemoveFromCart, onEmptyCart}) => {
    // console.log(cart);
    const classes = useStyles();
    // const isEmpty = !cart.line_items;

    const EmptyCart = () => (
        <Typography variant="subtitle1">You have no items in your shopping cart,
          <Link className={classes.link} to="/">start adding some</Link>!
        </Typography>
      );;

const FilledCart = () => (
    <>
        <Grid container spacing={3}>
            {cart.line_items.map((item) => (
                <Grid item xs={12} sm={4} key={item.id}>
                    <div>
                        <Cartitem item={item} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart}/>
                    </div>
                </Grid>
            ))}
        </Grid>

        <div className={classes.cardDetails}>
            <Typography variant='h4'>
                subtotal:{cart.subtotal.formatted_width_symbol}
            </Typography>

            <div>
                <Button className={classes.emptyButton} size="large" type="button" variant="contained" color='secondary ' onClick={onEmptyCart}>   Empty card </Button>
                <Button component={Link} to='/checkout' className={classes.checkoutButton} size="large" type="button" variant="contained" color='primary'>    Checkout</Button>
            </div>

        </div>
    </>
);

if (!cart.line_items) {
    return 'Loading...'

}
return (
    <Container>
        <div className={classes.toolbar} />
        <Typography className={classes.title} varaint='h3'>Your Shopping Cart</Typography>
        {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
)
}

export default Cart
