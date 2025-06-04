"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, PlusIcon, SquarePenIcon } from "lucide-react";
import { useState } from "react";

interface CardProps {
	id: number;
	title: string;
}

export default function Funnels() {
	const [cards, setCard] = useState<CardProps[]>([]);
	const [openDialog, setOpenDialog] = useState(false);
	const [registerType, setRegisterType] = useState("individual");

	const handleAddCard = () => {
		setOpenDialog(true);

		setCard((prevCards) => [
			...prevCards,
			{
				id: prevCards.length + 1,
				title: `Card ${prevCards.length + 1}`,
			},
		]);
	};

	function handleSubmit() {
		setCard((prevCards) => [
			...prevCards,
			{
				id: prevCards.length + 1,
				title: `Card ${prevCards.length + 1}`,
			},
		]);
	}

	return (
		<div className="flex flex-col h-screen p-8">
			<div className="flex justify-between py-4">
				<Button>
					Funil
					<ChevronDown size={16} />
				</Button>

				<div className="flex gap-4">
					<Button onClick={handleAddCard}>
						<PlusIcon size={16} />
						Novo card
					</Button>
					<Button>
						<SquarePenIcon size={16} />
						Editar funil
					</Button>
				</div>
			</div>

			<main className="flex-1 overflow-hidden mb-10">
				<Dialog onOpenChange={setOpenDialog} open={openDialog}>
					<DialogContent className="md:max-w-fit md:h-[85vh] flex flex-col">
						<form className="flex flex-col flex-1 overflow-hidden">
							<DialogHeader className="pb-3">
								<DialogTitle>Criar Novo Card</DialogTitle>
							</DialogHeader>

							<div className="flex-1 flex gap-4 overflow-y-auto">
								<div className="grid gap-4">
									<div className="grid gap-3">
										<Label htmlFor="name-1">Tipo</Label>
										<Select defaultValue="individual" onValueChange={setRegisterType}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Pessoa ..." />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="individual">Pessoa Física</SelectItem>
												<SelectItem value="company">Pessoa Jurídica</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className="grid gap-3">
										{registerType === "individual" ? (
											<>
												<Label htmlFor="name-1">Name</Label>
												<Input
													id="name-1"
													name="name"
													placeholder="Nome completo"
												/>
											</>
										) : (
											<>
												<Label htmlFor="name-1">Razão Social</Label>
												<Input
													id="name-1"
													name="name"
													placeholder="Razão Social"
												/>
											</>
										)}
									</div>

									<div className="grid gap-3">
										{ registerType === "individual" ? (
											<>
												<Label htmlFor="username-1">CPF</Label>
												<Input
													id="username-1"
													name="cpf"
													placeholder="000.000.000-00"
												/>
											</>
										) : (
											<>
												<Label htmlFor="username-1">CNPJ</Label>
												<Input
													id="username-1"
													name="cnpj"
													placeholder="00.000.000/0000-00"
												/>
											</>
										)}

									</div>

									<div className="grid gap-3">
										<Label htmlFor="username-1">Email</Label>
										<Input id="username-1" type="email" name="email" placeholder="Email" />
									</div>

									<div className="grid gap-3">
										<Label htmlFor="username-1">Telefone</Label>
										<Input
											id="username-1"
											name="telefone"
											placeholder="(00) 00000-0000"
										/>
									</div>

									<div className="grid gap-3">
										<Label htmlFor="username-1">WhatsApp</Label>
										<Input
											id="username-1"
											name="whatsapp"
											placeholder="(00) 00000-0000"
										/>
									</div>

									<div className="grid gap-3">
										<Label htmlFor="username-1">CEP</Label>
										<Input id="username-1" type="number" name="cep" placeholder="00000-000" />
									</div>

									<div className="grid gap-3">
										<Label htmlFor="username-1">Endereço</Label>
										<Input
											id="username-1"
											name="endereco"
											placeholder="Endereço"
										/>
									</div>

									<div className="grid gap-3">
										<Label htmlFor="username-1">Valor</Label>
										<Input
											id="username-1"
											name="value"
											placeholder="R$ 100,00"
										/>
									</div>
								</div>

								<div className="flex flex-col gap-4 mt-6">
									{/* Esta é a area que o analista vai trabalhar em cima do cliente/lead */}
									<Tabs defaultValue="support" className="w-[400px]">
										<TabsList className="bg-gray-200 px-4 py-1">
											<TabsTrigger value="support">Suporte</TabsTrigger>
											<TabsTrigger value="files">Arquivos</TabsTrigger>
											<TabsTrigger value="agenda">Agenda</TabsTrigger>
											<TabsTrigger value="history">Histórico</TabsTrigger>
											<TabsTrigger value="resume">Resumo</TabsTrigger>
										</TabsList>
										<TabsContent value="support">
											Pedir suporte <br/><br/>
											-analista pode falar com o clinte por diversos canais, por exemplo WhatsApp, Intagram <br/><br/>
											-Um chate com o cliente
										</TabsContent>
										<TabsContent value="files">
											Arquivos, como contratos e etcs
										</TabsContent>
										<TabsContent value="agenda">
											Agenda do analista e possibilidade de agendendar um evento com este cliente,
											enviar um meet para o email, mais uma mensagem no whats app
										</TabsContent>
										<TabsContent value="history">
											Histórico de solicitaçoes cliente.<br/><br/>
											Chamado no suporte, agendamentos, pedidos, solicitaçoes, etc.
										</TabsContent>
										<TabsContent value="resume">
											Resumo do cliente, com tudo que já foi feito, resumo das informacoes, etapas, pode ser gerado por uma IA.
										</TabsContent>
									</Tabs>
								</div>

								<div className="flex flex-col gap-4 mt-6 max-w-fit">
									<div className="font-semibold">Status do Funil</div>
									<div>
										Analista pode mudar status do cliente nesta coluna, enviado diretamente para um coluna especifica.s
									</div>
								</div>
							</div>

							<DialogFooter>
								<Button type="button" onClick={handleSubmit}>Criar Card</Button>
								<DialogClose asChild>
									<Button variant="outline">Cancelar</Button>
								</DialogClose>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>

				<div className="grid grid-cols-4 gap-4 h-full">
					<div className="shadow rounded-t-md flex flex-col">
						<div className="flex justify-between items-center p-3 py-4 bg-white font-semibold rounded-t-md z-10">
							<div>
								<span>Em Andamento</span>
								<span className="ml-2 px-2.5 py-0.5 border rounded-full text-xs">
									0
								</span>
							</div>

							<div className="text-xl">
								<Button onClick={handleAddCard} variant={"ghost"}>
									<PlusIcon size={20} />
								</Button>
							</div>
						</div>

						<div className="h-full border">
							{cards && cards.length > 0 ? (
								cards.map((card) => (
									<Card key={card.id} className="m-2">
										<CardHeader>
											<CardTitle>{card.title}</CardTitle>
										</CardHeader>
									</Card>
								))
							) : (
								<Card className="text-center m-2 border-dashed gap-0 text-sm">
									<CardHeader>
										<CardDescription className="italic text-gray-500 text-xs">
											Nenhum card nesta coluna
										</CardDescription>
									</CardHeader>
									<CardFooter className="justify-center">
										<Button
											onClick={handleAddCard}
											className="hover:bg-gray-100 border-none shadow-none"
										>
											<PlusIcon size={16} />
											<span>Adicionar Card</span>
										</Button>
									</CardFooter>
								</Card>
							)}
						</div>
					</div>

					<div className="border rounded shadow flex flex-col">
						<div>
							<div className="flex justify-between items-center p-3 bg-white font-semibold border-b">
								<div>
									<span>Em Andamento</span>
									<span className="ml-2 px-2.5 py-0.5 border rounded-full text-xs">
										{cards?.length || 0}
									</span>
								</div>

								<div className="text-xl">+</div>
							</div>
						</div>
					</div>

					<div className="border rounded shadow flex flex-col">
						<div>
							<div className="flex justify-between items-center p-3 bg-white font-semibold border-b">
								<div>
									<span>Em Andamento</span>
									<span className="ml-2 px-2.5 py-0.5 border rounded-full text-xs">
										0
									</span>
								</div>

								<div className="text-xl">+</div>
							</div>
						</div>
					</div>

					<div className="border rounded shadow flex flex-col">
						<div>
							<div className="flex justify-between items-center p-3 bg-white font-semibold border-b">
								<div>
									<span>Em Andamento</span>
									<span className="ml-2 px-2.5 py-0.5 border rounded-full text-xs">
										0
									</span>
								</div>

								<div className="text-xl">+</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
