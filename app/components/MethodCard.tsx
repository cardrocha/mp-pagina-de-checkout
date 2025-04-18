import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CreditCard, LockIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { parseToBrl } from "../utils";
import type { FormData, Installment } from "../types/types";

type CardProps = {
  isActive?: boolean | undefined;
};

const fixedPrice = 299.0;

export function MethodCard({ isActive }: CardProps) {
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [selectedInstallment, setSelectedInstallment] = useState(1);

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      cardNumber: "",
      cardName: "",
      cardExpiration: "",
      cardCvv: "",
      installments: String(selectedInstallment),
    },
  })

  const handleSubmitForm = (data: FormData) => {
    console.log(data);
  }

  useEffect(() => {
    const calculatedInstallments: Installment[] = [];

    for (let i = 1; i <= 6; i++) {
      const amount = fixedPrice / i;

      calculatedInstallments.push({
        quantity: i,
        amount,
        formattedAmount: parseToBrl(amount),
      });
    }

    setInstallments(calculatedInstallments);
  }, []);

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Label className="text-sm font-semibold" htmlFor="card-number">Número do Cartão</Label>
        <div className="relative">
          <CreditCard className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <Input
            className="pl-8 pr-2 py-1 border border-gray-300 text-sm rounded-md w-full"
            type="text"
            id="card-number"
            placeholder="0000 0000 0000 0000"
            {...register("cardNumber", { required: "Obrigatório, digite número do cartão! ", minLength: { value: 19, message: "Número inválido, sequencia de 16 dígitos!" } })}
          />
        </div>
        <p className="text-red-500 font-semibold">{errors.cardNumber?.message}</p>
      </div>
      <div className="flex flex-col gap-1">
        <Label className="text-sm font-semibold" htmlFor="card-name">Nome no cartão</Label>
        <Input
          className="pl-2 pr-2 py-1 border border-gray-300 text-sm rounded-md w-full"
          type="text"
          id="card-name"
          placeholder="Nome como está no cartão"
          {...register("cardName", { required: "Obrigatório, digite seu nome! ", minLength: { value: 5, message: "Nome inválido, digite 5 caracteres!" } })}
        />
      </div>
      <p className="text-red-500 font-semibold">{errors.cardName?.message}</p>
      <div className="flex gap-6 items-center justify-between">
        <div className="flex flex-col gap-1 w-full">
          <Label className="text-sm font-semibold" htmlFor="card-expiration">Validade</Label>
          <Input
            className="pl-2 pr-2 py-1 border border-gray-300 text-sm rounded-md w-full"
            type="text"
            id="card-expiration"
            placeholder="MM/AA"
            {...register("cardExpiration", { required: "Obrigatório, digite o mês e ano! ", minLength: { value: 5, message: "Data inválida, 5 dígitos!" } })}
          />
          <p className="text-red-500 font-semibold">{errors.cardExpiration?.message}</p>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Label className="text-sm font-semibold" htmlFor="card-cvv">CVV</Label>
          <Input
            className="pl-2 pr-2 py-1 border border-gray-300 text-sm rounded-md w-full"
            type="text"
            id="card-cvv"
            placeholder="123"
            {...register("cardCvv", { required: "Obrigatório, código de segurança! ", minLength: { value: 3, message: "Código inválido, 3 dígitos!" } })}
          />
          <p className="text-red-500 font-semibold whitespace-nowrap">{errors.cardCvv?.message}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1 max-w-[280px]">
        <Label className="text-sm font-semibold" htmlFor="installments">
          Parcelas
        </Label>
        <Controller
          name="installments"
          control={control}
          defaultValue={String(selectedInstallment)}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                setSelectedInstallment(Number(value));
              }}
            >
              <SelectTrigger id="installments">
                <SelectValue placeholder="Selecione o número de parcelas" />
              </SelectTrigger>
              <SelectContent>
                {installments.map((installment) => (
                  <SelectItem key={installment.quantity} value={String(installment.quantity)}>
                    {installment.quantity}x de {installment.formattedAmount}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="items-top flex space-x-2">
        <Checkbox id="terms1" required />
        <div className="grid gap-4 leading-none w-full">
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Salvar cartão para compras futuras
          </label>
          <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <LockIcon size={16} />
            Seus dados estão protegidos com critpografia SSL
          </p>
        </div>
      </div>
      <Button className="mt-6">
        Finalizar pagamento ${installments.find(i => i.quantity === selectedInstallment)?.formattedAmount}
      </Button>
    </form>
  );
}
