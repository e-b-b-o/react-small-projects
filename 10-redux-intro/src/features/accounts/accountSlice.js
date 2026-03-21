const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payLoad };
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
    default:
      return state;
  }
}

export function deposit(amount) {
  return { type: "account/deposit", payLoad: amount };
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
