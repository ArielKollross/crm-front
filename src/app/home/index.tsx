'use client'

import { useState, type FC } from 'react'
import { KanbanBoard, moveCard, OnDragEndNotification, Card, Board } from '@caldwell619/react-kanban'

import './styles.css'


// KANBAN IMPLEMENTATION EXAMPLE:
// https://github.com/tarotarotaros/TaskAppView/blob/6acb6f2daad00196fa97c53bc5136ec9b60636ba/task-appview/src/features/kanban/components/Kanban.tsx
const board = {
    columns: [
        {
            id: 1,
            title: "Backlog",
            backgroundColor: "#fff",
            cards: [
                {
                    id: 1,
                    title: "Card title 1",
                    description: "Card content"
                },
                {
                    id: 2,
                    title: "Card title 2",
                    description: "Card content"
                },
                {
                    id: 3,
                    title: "Card title 3",
                    description: "Card content"
                }
            ]
        },
        {
            id: 2,
            title: "Doing",
            cards: [
                {
                    id: 9,
                    title: "Card title 9",
                    description: "Card content"
                }
            ]
        },
        {
            id: 3,
            title: "Q&A",
            cards: [
                {
                    id: 10,
                    title: "Card title 10",
                    description: "Card content"
                },
                {
                    id: 11,
                    title: "Card title 11",
                    description: "Card content"
                }
            ]
        },
        {
            id: 4,
            title: "Production",
            cards: [
                {
                    id: 12,
                    title: "Card title 12",
                    description: "Card content"
                },
                {
                    id: 13,
                    title: "Card title 13",
                    description: "Card content"
                }
            ]
        }
    ]
};

const ControlledBoard: FC = () => {
    // You need to control the state yourself.
    const [controlledBoard, setBoard] = useState<KanbanBoard<Card>>({ ...board })

    const handleCardMove: OnDragEndNotification<Card> = (_card, source, destination) => {
        setBoard(currentBoard => {
            return moveCard(currentBoard, source, destination)
        })
    }

    const handleCardRemove = ({ card, column }: { card: Card; column: typeof controlledBoard.columns[number] }) => {
        setBoard(currentBoard => {
            const updatedColumns = currentBoard.columns.map(col => {
                if (col.id !== column.id) return col

                return {
                    ...col,
                    cards: col.cards.filter(c => c.id !== card.id)
                }
            })

            return { columns: updatedColumns }
        })
    }

    const handleAddCard = (columnId: number, title: string, description: string) => {
        const newCard: Card = {
            id: Date.now(), // ou use UUID
            title,
            description
        }

        setBoard(currentBoard => {
            const updatedColumns = currentBoard.columns.map(column => {
                if (column.id !== columnId) return column

                return {
                    ...column,
                    cards: [...column.cards, newCard]
                }
            })

            return { columns: updatedColumns }
        })
    }

    const [newCardTitle, setNewCardTitle] = useState('');
    const [newCardDesc, setNewCardDesc] = useState('');
    const [selectedColumnId, setSelectedColumnId] = useState<number>(1);

    const handleFormSubmit = () => {
        if (!newCardTitle.trim()) return;
        handleAddCard(selectedColumnId, newCardTitle, newCardDesc);
        setNewCardTitle('');
        setNewCardDesc('');
    };



    return (
        <>
            <div className="mb-4 space-y-2">
                <input
                    className="border p-2 rounded w-full"
                    placeholder="Card title"
                    value={newCardTitle}
                    onChange={(e) => setNewCardTitle(e.target.value)}
                />
                <input
                    className="border p-2 rounded w-full"
                    placeholder="Card description"
                    value={newCardDesc}
                    onChange={(e) => setNewCardDesc(e.target.value)}
                />
                <select
                    className="border p-2 rounded w-full"
                    value={selectedColumnId}
                    onChange={(e) => setSelectedColumnId(Number(e.target.value))}
                >
                    {controlledBoard.columns.map((col) => (
                        <option key={col.id} value={col.id}>
                            {col.title}
                        </option>
                    ))}
                </select>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={handleFormSubmit}
                >
                    Adicionar Card
                </button>
            </div>

            <Board
                onCardDragEnd={handleCardMove}
                disableColumnDrag
                onCardRemove={handleCardRemove}
            >
                {controlledBoard}
            </Board>
        </>
    )
}

export default function Home() {
    return (
        <div className='p-4'>
            <h1>Uncontrolled Board</h1>

            <ControlledBoard />
        </div>
    )
}
