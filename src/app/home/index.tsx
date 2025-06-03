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
	DialogContent,
	DialogFooter,
	DialogClose,
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
import { ChevronDown, PlusIcon, SquarePenIcon } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CardProps {
	id: number;
	title: string;
}

export default function Funnels() {
	const [cards, setCard] = useState<CardProps[]>([]);
	const [openDialog, setOpenDialog] = useState(false);

	const handleAddCard = () => {
		setOpenDialog(true);
	};

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
					<DialogContent className="w-min-[900px] h-[85vh] flex flex-col">
						<form className="flex flex-col flex-1 overflow-hidden">
							<DialogHeader className="pb-3">
								<DialogTitle>Criar Novo Card</DialogTitle>
							</DialogHeader>

							<div className="flex-1 flex gap-4 overflow-y-auto">
								<div className="grid gap-4">
									<div className="grid gap-3">
										<Label htmlFor="name-1">Tipo</Label>
										<Select>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Pessoa ..." />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="light">Pessoa Física</SelectItem>
												<SelectItem value="dark">Pessoa Jurídica</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className="grid gap-3">
										<Label htmlFor="name-1">Name</Label>
										<Input
											id="name-1"
											name="name"
											placeholder="Nome completo"
										/>
									</div>

									<div className="grid gap-3">
										<Label htmlFor="username-1">CPF</Label>
										<Input
											id="username-1"
											name="cpf"
											placeholder="000.000.000-00"
										/>
									</div>

									<div className="grid gap-3">
										<Label htmlFor="username-1">Email</Label>
										<Input id="username-1" name="email" placeholder="Email" />
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
										<Input id="username-1" name="cep" placeholder="00000-000" />
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
									<Tabs defaultValue="support" className="w-[400px]">
										<TabsList className="bg-gray-200">
											<TabsTrigger value="support">Suporte</TabsTrigger>
											<TabsTrigger value="files">Arquivos</TabsTrigger>
											<TabsTrigger value="agenda">Agenda</TabsTrigger>
											<TabsTrigger value="history">Histórico</TabsTrigger>
										</TabsList>
										<TabsContent value="support">
											Make changes to your account here.
										</TabsContent>
										<TabsContent value="files">
											Change your password here.
										</TabsContent>
										<TabsContent value="agenda">
											Change your password here.
										</TabsContent>
										<TabsContent value="history">
											Change your password here.
										</TabsContent>
									</Tabs>
								</div>
							</div>

							<DialogFooter>
								<Button type="submit">Criar Card</Button>
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
