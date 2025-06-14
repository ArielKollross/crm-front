import { Button } from "@/components/ui/button";
import { ChevronDown, PlusIcon, SquarePenIcon } from "lucide-react";

export function KanbanHeader() {
	const handleAddCard = () => {
		// Logic to add a new card
		console.log("Add new card clicked");
	};
	return (
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
	);
}
