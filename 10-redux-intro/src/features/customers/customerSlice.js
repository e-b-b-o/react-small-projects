const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payLoad.fullName,
        nationalId: action.payLoad.nationalId,
        createdAt: action.payLoad.createdAt,
      };
    case "account/updateCustomer":
      return {
        ...state,
        fullName: action.payLoad.fullName,
      };
    default:
      return state;
  }
}

export function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payLoad: { fullName, nationalId, createdAt: new Date().toISOString },
  };
}

export function updateName(fullName) {
  return { type: "account/updateName", payLoad: fullName };
}
