const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payLoad,
        isLoading: false,
      };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payLoad };
    case "account/requestloan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payLoad.amount,
        balance: state.balance + action.payLoad.amount,
        loanPurpose: action.payLoad.purpose,
      };
    case "account/payloan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "account/convertingCurrency":
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payLoad: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`,
    );
    const data = await res.json();
    const converted = data.rates.USD;
    dispatch({ type: "account/deposit", payLoad: converted });
  };
}
export function withdraw(amount) {
  return { type: "account/withdraw", payLoad: amount };
}
export function requestloan(amount, purpose) {
  return { type: "account/requestloan", payLoad: { amount, purpose } };
}
export function payloan() {
  return { type: "account/payloan" };
}
