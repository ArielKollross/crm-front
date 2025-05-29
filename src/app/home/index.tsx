"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { ChevronDown, PlusIcon, SquarePenIcon } from "lucide-react";
import { useState } from "react";

interface CardProps {
	id: number;
	title: string;
}

export default function Funnels() {
	const [cards, setCard] = useState<CardProps[]>([]);

	return (
		<div className="flex flex-col h-screen p-8">
			<div className="flex justify-between py-4">
				<Button>
					Funil
					<ChevronDown size={16} />
				</Button>

				<div className="flex gap-4">
					<Button>
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
								<PlusIcon size={20} />
							</div>
						</div>

						<div className="h-full border ">
							{cards && cards.length > 0 ? (
								cards.map((card) => (
									<div
										key={card.id}
										className="bg-white rounded p-3 shadow text-sm"
									>
										{card.title}
									</div>
								))
							) : (
								<Card className="text-center m-2 border-dashed gap-0 text-sm">
									<CardHeader>
										<CardDescription className="italic text-gray-500 text-xs">
											Nenhum card nesta coluna
										</CardDescription>
									</CardHeader>
									<CardFooter className="justify-center">
										<Button className="hover:bg-gray-100 border-none shadow-none">
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
