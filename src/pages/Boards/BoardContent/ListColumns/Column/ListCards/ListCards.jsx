/* eslint-disable react/prop-types */
import Box from '@mui/material/Box'
import Card from './Card/Card'
import { verticalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'

function ListCards({ cards }) {
  return (
    <SortableContext items={cards?.map(c => c._id)} strategy={verticalListSortingStrategy}>
      <Box sx={{
        p: '0 5px 5px 5px',
        m: '0 5px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        maxHeight: (theme) => `calc(${theme.levimana.boardContentHeight} - ${theme.spacing(5)} - ${theme.levimana.columnFooterHeight} - ${theme.levimana.columnHeaderHeight})`,
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
        '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bfc2cf' }
      }}>
        {cards?.map(card => <Card key={card._id} card={card} />)}
      </Box>
    </SortableContext>

  )
}

export default ListCards
