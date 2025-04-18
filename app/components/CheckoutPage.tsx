"use client";

import { useState } from "react";
import Button from "./button";
import { CreditCard, CircleDollarSign, QrCode } from "lucide-react";
import { MethodCard } from "./MethodCard";
import { MethodTicket } from "./MethodTicket";
import { MethodPix } from "./MethodPix";

export function CheckoutPage() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  return (
    <div className="flex items-start min-h-dvh justify-center gap-4.5 p-14 ronded">
      <div className="flex flex-col gap-6 bg-white p-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Finalizar Compra</h1>
          <p className="text-sm text-gray-500">
            Escolha seu método de pagamento preferido
          </p>
        </div>
        <div className="flex items-center gap-1 bg-gray-200 py-0.5 px-px">
          <Button
            isActive={selectedMethod === "cartao"}
            onClick={() => setSelectedMethod("cartao")}
          >
            <CreditCard
              size={16}
              className={
                selectedMethod === "cartao"
                  ? "text-black"
                  : "text-gray-500 group-hover:text-black transition-colors"
              }
            />
            Cartão de crédito
          </Button>
          <Button
            isActive={selectedMethod === "boleto"}
            onClick={() => setSelectedMethod("boleto")}
          >
            <CircleDollarSign
              size={12}
              className={
                selectedMethod === "boleto"
                  ? "text-black"
                  : "text-gray-500 group-hover:text-black transition-colors"
              }
            />
            Boleto
          </Button>
          <Button
            isActive={selectedMethod === "pix"}
            onClick={() => setSelectedMethod("pix")}
          >
            <QrCode
              size={12}
              className={
                selectedMethod === "pix"
                  ? "text-black"
                  : "text-gray-500 group-hover:text-black transition-colors"
              }
            />
            Pix
          </Button>
        </div>
        <div>
          {selectedMethod === "cartao" && <MethodCard />}
          {selectedMethod === "boleto" && <MethodTicket />}
          {selectedMethod === "pix" && <MethodPix />}
        </div>
      </div>
      <div className="flex flex-col gap-1 bg-white p-6 w-[400px]">
        <h2 className="text-xl font-bold">Resumo do Pedido</h2>
        <p className="text-sm text-gray-500 font-semibold whitespace-nowrap">
          Método escolhido:{" "}
          {selectedMethod === "cartao" && (
            <span className="text-sm text-black font-semibold">
              Cartão de crédito
            </span>
          )}
          {selectedMethod === "boleto" && (
            <span className="text-sm text-black font-semibold">
              Boleto Bancário
            </span>
          )}
          {selectedMethod === "pix" && (
            <span className="text-sm text-black font-semibold">Pix</span>
          )}
        </p>
        <p className="text-sm text-gray-500 font-semibold">Detalhes da sua compra</p>
      </div>
    </div>
  );
}
