export type Installment = {
  quantity: number;
  amount: number;
  formattedAmount: string;
};

export type FormData = {
  cardNumber: string;
  cardName: string;
  cardExpiration: string;
  cardCvv: string;
  installments: string;
};
