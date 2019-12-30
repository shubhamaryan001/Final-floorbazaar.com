import { processPayment } from "./ApiCore";
import { createOrder } from "./ApiCore";
import { emptyCart } from "./CartHelper";
import { isAuthenticated } from "../Auth/Index";

export const razorPayOptionsDirt = (
  amount,
  user,
  products,
  anyNote,
  SecondAmount
) => {
  const { name, email, mobile } = user;
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  return {
    key: "rzp_test_xHFa7oLm0s4xHO",
    amount: amount ? amount * 100 : 50000, // 50000 refers to 50000 paise or INR 500.
    currency: "INR",
    name: "E-comm",
    description: "An e-commerce for developers",
    image:
      "https://res.cloudinary.com/djnv06fje/image/upload/v1574864028/1_bsry6v.png",
    // order_id: 'order_9A33XWu170gUtm',
    handler: function(response) {
      let transactionId = response.razorpay_payment_id;
      processPayment(
        user._id,
        user.token,

        {
          razorpay_payment_id: response.razorpay_payment_id,
          amount: amount
        },
        console.log(anyNote),
        console.log(products),
        console.log(transactionId)
      ).then(create => {
        const createOrderData = {
          products: products,
          transaction_id: transactionId,
          amount: amount,
          payment_mode: "Direct Payment Gateway",
          note: anyNote,
          firstpayment: true,
          firstpaymentamount: amount,
          secondpaymentamount: SecondAmount
        };

        console.log(transactionId);
        createOrder(userId, token, createOrderData)
          .then(orderResponse => {
            emptyCart(() => {});
          })

          .catch(error => {
            console.log(error);
          });
      });
    },
    prefill: {
      name: name || "name",
      email: email || "example@example.com",
      contact: mobile || ""
    },
    notes: {
      address: "Address"
    },
    theme: {
      color: "#ffce00"
    }
  };
};
