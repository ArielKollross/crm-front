'use client'

import { FC } from 'react'
import { KanbanBoard, UncontrolledBoard } from '@caldwell619/react-kanban'


// KANBAN IMPLEMENTATION EXAMPLE:
// https://github.com/tarotarotaros/TaskAppView/blob/6acb6f2daad00196fa97c53bc5136ec9b60636ba/task-appview/src/features/kanban/components/Kanban.tsx
const UncontrolledBoardDemo: FC = () => {
    const board: KanbanBoard<{ id: number; title: string; description: string }> = {
        columns: [
            {
                id: 1,
                title: 'Backlog',
                cards: [
                    {
                        id: 11,
                        title: 'Add card',
                        description: 'Add capability to add a card in a column'
                    },
                ]
            },
            {
                id: 2,
                title: 'Backlog 2',
                cards: [
                    {
                        id: 12,
                        title: 'Add card',
                        description: 'Add capability to add a card in a column'
                    },
                ]
            },
        ]
    }

    return (
        <UncontrolledBoard
            initialBoard={board}
            onCardRemove={({ board, card, column }) => {
                console.log({ board, card, column })
            }}
            onCardDragEnd={(subjectCustomCard, source, destination) => {
                console.log({
                    subjectCustomCard,
                    source,
                    destination
                })
            }}
        />
    )
}

export default function Home() {
    return (
        <div>
            <h1>Uncontrolled Board</h1>
            <UncontrolledBoardDemo />
        </div>
    )
}
