import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { useSelector } from 'react-redux'
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import { confirmSubscription } from 'api/payment'
import './style.css'

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#0ea5e9',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883'
      },
      '::placeholder': {
        color: '#0284c7'
      }
    },
    invalid: {
      iconColor: '#ef4444',
      color: '#ef4444'
    }
  }
}

const CardField = ({ onChange }) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
)

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? 'Processing...' : children}
  </button>
)

const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#ef4444"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
)

const CheckoutForm = ({ pack, clientSecret, subscriptionId }) => {
  const { isAuth, user } = useSelector((state) => state.user)

  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [paymentState, setPaymentSate] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    if (error) {
      elements.getElement('card').focus()
      return
    }

    if (cardComplete) {
      setProcessing(true)
    }

    const cardElement = elements.getElement(CardElement)

    let { error2, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: `${user.firstName} ${user.lastName}`
        }
      }
    })

    setProcessing(false)

    if (error2) {
      setError(error2)
    } else {
      const data = { subscriptionId: subscriptionId, paymentIntent: paymentIntent }
      confirmSubscription(pack._id, data)
        .then(() => {
          setPaymentSate(true)
        })
        .catch(() => {
          setPaymentSate(false)
        })
    }
  }

  return paymentState === true ? (
    <div className="Result">
      <div className="ResultTitle" role="alert">
        Payment successful
      </div>
      <div className="ResultMessage">
        Thanks for trying Stripe Elements. No money was charged, but we generated a
        PaymentMethod: {subscriptionId}
      </div>
    </div>
  ) : paymentState === false ? (
    <div className="Result">
      <div className="ResultTitlefailed" role="alert">
        Payment failed
      </div>
    </div>
  ) : (
    <form className="Form" onSubmit={handleSubmit}>
      <fieldset className="FormGroup">
        <CardField
          onChange={(e) => {
            setError(e.error)
            setCardComplete(e.complete)
          }}
        />
      </fieldset>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton processing={processing} error={error} disabled={!stripe}>
        Subscribe ${pack.price}
      </SubmitButton>
    </form>
  )
}

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Roboto'
    }
  ]
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_live_hfwZ7LzPO7iU4xsdwAhoxMdD')

const AppWrapper = (props) => {
  const { subscriptionData } = props
  console.log(props)
  return (
    <div className="AppWrapper">
      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <CheckoutForm
          pack={props.pack}
          clientSecret={subscriptionData.clientSecret}
          subscriptionId={subscriptionData.subscriptionId}
        />
      </Elements>
    </div>
  )
}

export default AppWrapper
