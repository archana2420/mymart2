import { loadStripe } from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import React from 'react'
import PaymentForm from './PaymentForm'


const PUBLIC_KEY = 'pk_test_51MNFJ8SAZ1LObbNYBhNqXP2ywH69v44N75jxrW5cDCzpLuHO5Wfo7msEPLiX4UGhHXFSkzHvETOklpMzvLx10WWm0097nWxrwB'

const stripeTestPromise = loadStripe(PUBLIC_KEY)

const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
       
        <PaymentForm></PaymentForm>

       
    </Elements>
  )
}

export default StripeContainer