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
import {
	DndContext,
	MouseSensor,
	PointerSensor,
	TouchSensor,
	closestCorners,
	useDraggable,
	useDroppable,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	SortableContext,
	arrayMove,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { KanbanHeader } from "./components/KanbanHeader";

const initialColumns: KanbanColumnsProps[] = [
	{ id: 1, title: "Em contato" },
	{ id: 2, title: "Aguardando" },
	{ id: 3, title: "Concluído" },
	{ id: 4, title: "Cancelado" },
];

interface CardProps {
	id: number;
	columnId?: number | string;
	title: string;
}

interface KanbanColumnsProps {
	id: number;
	title: string;
	cards?: CardProps[];
}

// Passar para outro arquivo
export function NotContentCard() {
	return (
		<Card className="text-center m-2 border-dashed gap-0 text-sm">
			<CardHeader>
				<CardDescription className="italic text-gray-500 text-xs">
					Nenhum card nesta coluna
				</CardDescription>
			</CardHeader>
			<CardFooter className="justify-center">
				<Button
					// TODO Add to context
					// onClick={() => handleAddCard()}
					className="hover:bg-gray-100 border-none shadow-none"
				>
					<PlusIcon size={16} />
					<span>Adicionar Card</span>
				</Button>
			</CardFooter>
		</Card>
	);
}

interface KanbanCardProps {
	id: string;
	// posição do card no kanban
	index: number;
	parentId: string;
	title: string;
}
export function KanbanCard(card: KanbanCardProps) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: card.id,
		data: {
			index: card.index,
			parentId: card.parentId
		},
	});

	  const style = {
		transform: CSS.Translate.toString(transform),
	  };

	  return (
		<Card
			key={card.id}
			className="m-2"
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
		>
			<CardHeader>
				<CardTitle>{card.title}</CardTitle>
			</CardHeader>
		</Card>
	  );
}

export function KanbanColumns(column: KanbanColumnsProps) {
	const [cards, setCard] = useState<KanbanCardProps[]>([]);

	const { setNodeRef } = useDroppable({
	  id: column.id,
	});

	const cardsIds = useMemo(() => {
		return cards.map((card) => card.id);
	}, [cards]);

	const handleAddCard = (columnId: string | number) => {
		console.log("Adding card to column:", columnId);

		// setOpenDialog(true);

		setCard((prevCards) => [
			...prevCards,
			{
				id: (prevCards.length + 1).toString(),
				index: prevCards.length,
				parent: columnId.toString(),
				columnId: columnId,
				title: `Card ${prevCards.length + 1}`,
			},
		]);
	};


	return (
		<div
			className="shadow rounded-t-md flex flex-col"
			key={column.id}
			ref={setNodeRef}
		>
			<div className="flex justify-between items-center p-3 py-4 bg-white font-semibold rounded-t-md z-10">
				<div>
					<span>{column.title}</span>
					<span className="ml-2 px-2.5 py-0.5 border rounded-full text-xs">
						0
					</span>
				</div>

				<div className="text-xl">
					<Button
						onClick={() => handleAddCard(column.id)}
						variant={"ghost"}
					>
						<PlusIcon size={20} />
					</Button>
				</div>
			</div>

			<div className="h-full border">
				<SortableContext items={cardsIds}>
					{cards && cards.length > 0 ? (
						cards
							.filter((card) => card.columnId === column.id)
							.map((card) => (
								// 	  {items.map(({ title: cardTitle }, key) => (
								// 		<KanbanCard title={cardTitle} key={key} index={key} parent={title} />
								// 	  ))}
								<KanbanCard key={card.id} {...card} />
							))
					) : (
						<NotContentCard />
					)}
				</SortableContext>
			</div>
		</div>
	);
  }

export function ColumContainer(card: CardProps) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: card.id,
		data: {
			type: "card",
		},
	});

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	if (isDragging) {
		return (
			<Card
				key={card.id}
				className="m-2"
				ref={setNodeRef}
				style={style}
				{...attributes}
				{...listeners}
			>
				<CardHeader>
					<CardTitle>{card.title}</CardTitle>
				</CardHeader>
				<CardDescription className="text-gray-500 text-xs italic">
					Arraste para reorganizar
				</CardDescription>
			</Card>
		);
	}

	return (
		<div>Card</div>
	);
}

export default function Funnels() {
	const [columns, setColumns] = useState<KanbanColumnsProps[]>(initialColumns);
	const [openDialog, setOpenDialog] = useState(false);
	const [registerType, setRegisterType] = useState("individual");

	const mouseSensor = useSensor(MouseSensor); // Initialize mouse sensor
	const touchSensor = useSensor(TouchSensor); // Initialize touch sensor
	const sensors = useSensors(mouseSensor, touchSensor);

	const handleDragEnd = (event: any) => {
		const { active, over } = event;
		if (active.id !== over.id) {
			setCard((items) => {
				const oldIndex = items.findIndex((item) => item.id === active.id);
				const newIndex = items.findIndex((item) => item.id === over.id);
				return arrayMove(items, oldIndex, newIndex);
			});
		}
	};

	function handleSubmit() {
		setCard((prevCards) => [
			...prevCards,
			{
				id: (prevCards.length + 1).toString(),
				index: prevCards.length,
				parent: "",
				columnId: "",
				title: `Card ${prevCards.length + 1}`,
			},
		]);
	}

	// Kanban BoardContext
	const [lanes, setLanes] = useState<LaneItems>({
		ToDo: [],
		"In Progress": [],
		Done: [],
		Unassigned: [],
	  });
	
	  const addNewCard = (title: string) => {
		setLanes((prev) => ({
		  ...prev,
		  Unassigned: [...(prev.Unassigned || []), { title }],
		}));
	  };
	
	  const moveCard = (
		fromLane: string,
		toLane: string,
		cardIndex: number,
		card: Cards
	  ) => {
		setLanes((prev) => {
		  const fromItems = [...(prev[fromLane] || [])];
		  const toItems = [...(prev[toLane] || [])];
	
		  fromItems.splice(cardIndex, 1); // remove from original
		  toItems.push(card); // add to new lane
	
		  return {
			...prev,
			[fromLane]: fromItems,
			[toLane]: toItems,
		  };
		});
	  };

	return (
		<div className="flex flex-col h-screen p-8">
			<KanbanHeader />

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
										<Select
											defaultValue="individual"
											onValueChange={setRegisterType}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Pessoa ..." />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="individual">
													Pessoa Física
												</SelectItem>
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
										{registerType === "individual" ? (
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
										<Input
											id="username-1"
											type="email"
											name="email"
											placeholder="Email"
										/>
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
										<Input
											id="username-1"
											type="number"
											name="cep"
											placeholder="00000-000"
										/>
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
											Pedir suporte <br />
											<br />
											-analista pode falar com o clinte por diversos canais, por
											exemplo WhatsApp, Intagram <br />
											<br />
											-Um chate com o cliente
										</TabsContent>
										<TabsContent value="files">
											Arquivos, como contratos e etcs
										</TabsContent>
										<TabsContent value="agenda">
											Agenda do analista e possibilidade de agendendar um evento
											com este cliente, enviar um meet para o email, mais uma
											mensagem no whats app
										</TabsContent>
										<TabsContent value="history">
											Histórico de solicitaçoes cliente.
											<br />
											<br />
											Chamado no suporte, agendamentos, pedidos, solicitaçoes,
											etc.
										</TabsContent>
										<TabsContent value="resume">
											Resumo do cliente, com tudo que já foi feito, resumo das
											informacoes, etapas, pode ser gerado por uma IA.
										</TabsContent>
									</Tabs>
								</div>

								<div className="flex flex-col gap-4 mt-6 max-w-fit">
									<div className="font-semibold">Status do Funil</div>
									<div>
										Analista pode mudar status do cliente nesta coluna, enviado
										diretamente para um coluna especifica.s
									</div>
								</div>
							</div>

							<DialogFooter>
								<Button type="button" onClick={handleSubmit}>
									Criar Card
								</Button>
								<DialogClose asChild>
									<Button variant="outline">Cancelar</Button>
								</DialogClose>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>

				<DndContext
					sensors={sensors}
					collisionDetection={closestCorners}
					onDragEnd={(e) => {
						const toParentId = e.over?.id;
						const parentId = e.active.data.current?.parentId ?? "";
						const index = e.active.data.current?.index ?? 0;
						const fromParent = e.active.data.current?.parent;

						if (!toParent || fromParent === toParent) return;

						moveCard(fromParent, toParent, index, parentId);
					  }}
				>
					{/* Div Kanban Container */}
					<div className="grid grid-cols-4 gap-4 h-full">
						{columns && columns.length > 0 ? (
							columns.map((column) => (
								<KanbanColumns key={column.id} {...column} />
							))
						) : (
							<div>Nada</div>
						)}
					</div>
				</DndContext>
			</main>
		</div>
	);
}
