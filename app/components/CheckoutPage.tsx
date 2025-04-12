'use client'

import { useState } from 'react';
import Button from "./button";
import { CreditCard, CircleDollarSign, QrCode } from 'lucide-react';

export function CheckoutPage() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  return (
    <div className="flex items-center min-h-dvh justify-center gap-4.5">
      <div className="bg-white p-6">
        <h1 className="text-2xl font-bold">Finalizar Compra</h1>
        <p className="text-xs text-gray-500">Escolha seu método de pagamento preferido</p>
        <div className="flex items-center gap-1 bg-gray-200 py-0.5 px-px">
          <Button
            isActive={selectedMethod === 'cartao'}
            onClick={() => setSelectedMethod('cartao')}
          >
            <CreditCard
              size={16}
              className={
                selectedMethod === 'cartao'
                  ? 'text-black'
                  : 'text-gray-500 group-hover:text-black transition-colors'
              }
            />
            Cartão de crédito
          </Button>
          <Button
            isActive={selectedMethod === 'boleto'}
            onClick={() => setSelectedMethod('boleto')}
          >
            <CircleDollarSign
              size={12}
              className={
                selectedMethod === 'boleto'
                  ? 'text-black'
                  : 'text-gray-500 group-hover:text-black transition-colors'
              }
            />
            Boleto
          </Button>
          <Button
            isActive={selectedMethod === 'pix'}
            onClick={() => setSelectedMethod('pix')}
          >
            <QrCode
              size={12}
              className={
                selectedMethod === 'pix'
                  ? 'text-black'
                  : 'text-gray-500 group-hover:text-black transition-colors'
              }
            />
            Pix
          </Button>
        </div>
      </div>
      <div className="bg-white p-6">
        <h2>Resumo do Pedido</h2>
        <p>Método escolhido: <strong>{selectedMethod ?? "nenhum"}</strong></p>
      </div>
    </div>
  );
}
