import React, { useState } from 'react';

export interface CardData {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
}

interface PaymentFormProps {
  total: number;
  onSuccess: (card: CardData) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ total, onSuccess }) => {
  const [card, setCard] = useState<CardData>({
    name: '',
    number: '',
    expiry: '',
    cvc: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(card);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Sample Card Payment</h3>
      <input
        name="name"
        placeholder="Name on Card"
        className="input"
        value={card.name}
        onChange={handleChange}
        required
      />
      <input
        name="number"
        placeholder="Card Number"
        className="input"
        value={card.number}
        onChange={handleChange}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          name="expiry"
          placeholder="MM/YY"
          className="input"
          value={card.expiry}
          onChange={handleChange}
          required
        />
        <input
          name="cvc"
          placeholder="CVC"
          className="input"
          value={card.cvc}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        Pay රු {total.toLocaleString()}
      </button>
    </form>
  );
};

export default PaymentForm;