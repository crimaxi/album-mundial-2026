import { useEffect, useMemo, useState } from 'react'
import StickerCard from './components/StickerCard'
import { stickers } from './data/stickers.js'
import './App.css'

const STATUS_ORDER = ['falta', 'tengo', 'repetida'] as const
const FILTER_OPTIONS = ['Todas', 'Tengo', 'Repetidas', 'Faltan'] as const

type FilterOption = (typeof FILTER_OPTIONS)[number]

function App() {
  const [statuses, setStatuses] = useState<Record<number, string>>(() =>
    Object.fromEntries(stickers.map((sticker) => [sticker.id, 'falta']))
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<FilterOption>('Todas')

  useEffect(() => {
    console.log('Figuritas:', stickers)
  }, [])

  const handleStatusChange = (id: number) => {
    setStatuses((prev) => {
      const current = prev[id] || 'falta'
      const currentIndex = STATUS_ORDER.indexOf(current as (typeof STATUS_ORDER)[number])
      const nextIndex = (currentIndex + 1) % STATUS_ORDER.length

      return {
        ...prev,
        [id]: STATUS_ORDER[nextIndex],
      }
    })
  }

  const collectedCount = useMemo(
    () => Object.values(statuses).filter((status) => status === 'tengo').length,
    [statuses]
  )

  const visibleStickers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return stickers.filter((sticker) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        sticker.name.toLowerCase().includes(normalizedSearch) ||
        sticker.id.toString().includes(normalizedSearch)

      const stickerStatus = statuses[sticker.id] || 'falta'
      const matchesFilter =
        statusFilter === 'Todas' ||
        (statusFilter === 'Tengo' && stickerStatus === 'tengo') ||
        (statusFilter === 'Repetidas' && stickerStatus === 'repetida') ||
        (statusFilter === 'Faltan' && stickerStatus === 'falta')

      return matchesSearch && matchesFilter
    })
  }, [searchTerm, statusFilter, statuses])

  return (
    <main style={{ padding: '24px' }}>
      <h1>Álbum Mundial 2026</h1>
      <p>
        {collectedCount} de {stickers.length} figuritas marcadas como tengo
      </p>

      <div style={{ margin: '16px 0' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Buscar por nombre o número"
          style={{
            width: '100%',
            maxWidth: '420px',
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setStatusFilter(option)}
            style={{
              padding: '8px 12px',
              borderRadius: '999px',
              border: statusFilter === option ? '1px solid #2563eb' : '1px solid #cbd5e1',
              backgroundColor: statusFilter === option ? '#dbeafe' : '#fff',
              cursor: 'pointer',
            }}
          >
            {option}
          </button>
        ))}
      </div>

      <p style={{ marginBottom: '12px' }}>
        Mostrando {visibleStickers.length} figuritas
      </p>

      <section style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {visibleStickers.map((sticker) => (
          <StickerCard
            key={sticker.id}
            number={sticker.id}
            name={sticker.name}
            group={sticker.group || sticker.section || 'Sin grupo'}
            status={statuses[sticker.id] || 'falta'}
            onClick={() => handleStatusChange(sticker.id)}
          />
        ))}
      </section>
    </main>
  )
}

export default App
